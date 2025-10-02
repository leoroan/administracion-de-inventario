import healthService from '../services/health.service.js';

class HealthController {
  async getStatus(req, res, next) {
    try {
      const force = req.query.refresh === '1' || req.query.refresh === 'true';
      const report = await healthService.checkAll({ forceRefresh: force });
      res.sendSuccess(report);
    } catch (error) {
      next(error);
    }
  }
}

export default new HealthController();