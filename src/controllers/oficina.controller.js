import { devLogger } from '../config/logger/logger.config.js';
import { oficinaService } from '../services/service.js';
import GenericController from './helper/generic.controller.js';

// Crear un nuevo usuario
export default class OficinaController extends GenericController {
  constructor(service) {
    super(service);
  }

  async addEdificio(req, res) {
    const { edificioId = null, oficinaId = null } = req.query;
    try {
      const oficina = await oficinaService.findById(oficinaId);
      await oficina.setEdificio(edificioId);
      await oficina.save();
      res.sendSuccess('success');
    } catch (error) {
      res.sendError(`Error al querer asignarle un edificio a la oficina, ${error}`);
    }
  }

  async removeEdificio(req, res) {
    const oficinaId = req.query.oid;
    try {
      const oficina = await oficinaService.findById(oficinaId);
      await oficina.setEdificio(null);
      await oficina.save();
      res.sendSuccess('success');
    } catch (error) {
      res.sendError(`Error al querer remover el edificio de la oficina, ${error}`);
    }
  }

  async addOficinaPadre(req, res) {
    const { oficinaPadreId = null, oficinaId = null } = req.query;
    try {
      const oficina = await oficinaService.findById(oficinaId);
      await oficina.setOficinaPadre(oficinaPadreId);
      await oficina.save();
      res.sendSuccess('success');
    } catch (error) {
      res.sendError(`Error al querer asignarle oficina a la oficina, ${error}`);
    }
  }

  async removeOficinaPadre(req, res) {
    const oficinaId = req.query.oid;
    try {
      const oficina = await oficinaService.findById(oficinaId);
      await oficina.setOficinaPadre(null);
      await oficina.save();
      res.sendSuccess('success');
    } catch (error) {
      res.sendError(`Error al querer remover la oficina "padre" de la oficina, ${error}`);
    }
  }

  async eliminarOficinaPadre(req, res) { // proyecto de borrado con arrastre de "hijos" o dependencias del modelo
    try {
      const { oficinaId } = req.params;

      // 1. Buscar la oficina a eliminar
      const oficina = await oficinaService.findById(oficinaId, {
        include: [
          { model: 'Oficina', as: 'Dependencias' },
          { model: 'Oficina', as: 'OficinaPadre' }
        ],
      });

      if (!oficina) {
        return res.sendError('Oficina no encontrada');
      }

      // 2. Si tiene dependencias, reasignarlas
      if (oficina.Dependencias.length > 0) {
        if (oficina.OficinaPadre) {
          // Si tiene oficina padre, reasignar dependencias a la oficina padre
          await Promise.all(oficina.Dependencias.map(async (dependencia) => {
            dependencia.oficinaPadreId = oficina.OficinaPadre.id;
            await dependencia.save();
          }));
        } else {
          // Si no tiene oficina padre, dejar las dependencias sin oficina padre (set null)
          await oficina.setDependencias([]); // Disociar todas las dependencias
        }
      }

      // 3. Eliminar la oficina
      await oficina.destroy();

      res.sendSuccess('success');
    } catch (error) {
      res.sendError('Error al eliminar la oficina');
    }
  };


}