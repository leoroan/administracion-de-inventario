import { devLogger } from '../config/logger/logger.config.js';
import { oficinaService } from '../services/service.js';
import GenericController from './helper/generic.controller.js';

// Crear un nuevo usuario
export default class OficinaController extends GenericController {
  constructor(service) {
    super(service);
  }

  async addOficinaPadre(req, res) {
    const { oficinaPadreId = null, oficinaId = null } = req.query;
    try {
      const oficina = await oficinaService.findById(oficinaId);
      if (!oficina) {
        return res.sendError({ message: 'Oficina no encontrada' });
      }
      await oficina.setOficinaPadre(oficinaPadreId);
      await oficina.save();
      res.sendSuccess(oficina);
    } catch (error) {
      res.sendError({ message: 'Error al querer asignarle oficina al oficina' });
    }
  }

  async removeOficinaPadre(req, res) {
    const oficinaId = req.query.oid;
    try {
      const oficina = await oficinaService.findById(oficinaId);
      if (!oficina) {
        return res.sendError({ message: 'Oficina no encontrada' });
      }
      await oficina.setOficinaPadre(null);
      await oficina.save();
      res.sendSuccess(oficina);
    } catch (error) {
      res.sendError({ message: 'Error al querer remover al oficina de la oficina' });
    }
  }

  async eliminarOficinaPadre(req, res) {
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
        return res.sendError({ message: 'Oficina no encontrada' });
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

      res.sendSuccess({ message: 'Oficina eliminada correctamente y dependencias reasignadas' });
    } catch (error) {
      res.sendError({ message: 'Error al eliminar la oficina', error });
    }
  };


}