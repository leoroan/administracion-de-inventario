import { BadRequest } from '../config/error/errors.js';

export function createChecker(opts) {
  const {
    name,
    description = '',
    critical = false,
    category = 'custom',
    tags = [],
    severity = 'medium',
    cacheTTL = 0, // ms
    timeoutMs = 5000,
    check
  } = opts;


  if (!name || typeof check !== 'function') {
    throw new BadRequest('Checker requires name and check() function');
  }

  return {
    name,
    description,
    critical,
    category,
    tags,
    severity,
    cacheTTL,
    timeoutMs,
    check
  };
}