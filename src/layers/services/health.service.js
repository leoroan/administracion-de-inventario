// src/health/health.service.js
import { loadCheckers } from '../../health/loader.js';

function ensureStatus(s) {
  const ok = ['ok', 'degraded', 'error'];
  return ok.includes(s) ? s : 'error';
}

function mergeGlobalStatus(current, next, isCritical) {
  if (current === 'error') return 'error';
  if (next === 'error' && isCritical) return 'error';
  if (next === 'error') return 'degraded';
  if (next === 'degraded') return 'degraded';
  return 'ok';
}

export class HealthService {
  constructor(opts = {}) {
    this.cache = new Map(); // name -> { ts, result }
    this.checkers = [];
    this.opts = opts;
  }

  async init() {
    if (this.checkers.length === 0) {
      this.checkers = await loadCheckers();
    }
  }

  _withTimeout(promise, ms) {
    return Promise.race([
      promise,
      new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), ms))
    ]);
  }

  _normalizeResult(raw, elapsedMs) {
    const status = ensureStatus(raw.status);
    return {
      status,
      message: raw.message ?? (status === 'ok' ? 'ok' : 'error'),
      details: raw.details ?? null,
      checks: raw.checks ?? null,
      timestamp: raw.timestamp ?? new Date().toISOString(),
      responseTimeMs: raw.responseTimeMs ?? elapsedMs ?? null,
      version: raw.version ?? null
    };
  }

  async runChecker(checker, { forceRefresh = false } = {}) {
    const now = Date.now();
    const cached = this.cache.get(checker.name);
    if (!forceRefresh && cached && checker.cacheTTL && (now - cached.ts) < checker.cacheTTL) {
      return cached.result;
    }

    const t0 = Date.now();
    try {
      const raw = await this._withTimeout(checker.check(), checker.timeoutMs ?? 5000);
      const res = this._normalizeResult(raw, Date.now() - t0);
      if (checker.cacheTTL) this.cache.set(checker.name, { ts: now, result: res });
      return res;
    } catch (err) {
      const res = this._normalizeResult({ status: 'error', message: err.message }, Date.now() - t0);
      return res;
    }
  }

  async checkAll({ forceRefresh = false } = {}) {
    await this.init();

    const promises = this.checkers.map(c => this.runChecker(c, { forceRefresh }).then(r => ({ name: c.name, checker: c, result: r })));
    const settled = await Promise.all(promises);

    const checks = {};
    let globalStatus = 'ok';

    for (const { name, checker, result } of settled) {
      checks[name] = result;
      globalStatus = mergeGlobalStatus(globalStatus, result.status, !!checker.critical);
    }

    return { status: globalStatus, checks };
  }
}

export default new HealthService();