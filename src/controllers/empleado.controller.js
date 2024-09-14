import { devLogger } from '../config/logger/logger.config.js';
import { empleadoService } from '../services/service.js';
import { createHash } from '../utils/bcrypt.js';

// Crear un nuevo usuario
export async function createAdministrator() {
  try {
    const adminUser = await empleadoService.findByEmailORusername("administrador");
    if (!adminUser) {
      await empleadoService.createGeneric({
        username: process.env.ADMIN_USER,
        password: createHash(process.env.ADMIN_PASS),
        rol: 'ADMIN',
        email: process.env.ADMIN_EMAIL,
        nombre: 'Administrador',
        apellido: 'General',
        dni: '00000000'
      });
      devLogger.info('[Administrator]: Has been created.');
    } else {
      devLogger.info('[Administrator]: Already exists.');
    }
  } catch (error) {
    devLogger.debug(`Error in createAdministrator: ${error.message}, Stack: ${error.stack}`);
  }
}

export async function create(req, res) {
  try {
    const empleado = await empleadoService.create(req.body);
    return res.sendSuccess(`Employee created, id:${empleado.id}`)
  } catch (error) {
    devLogger.debug(error)
    return res.sendError(error);
  }
}

export async function getById(req, res) {
  try {
    const empleado = await empleadoService.findById(req.params.id);
    if (empleado) {
      return res.sendSuccess(empleado);
    } else {
      return res.sendError({ error: 'Empleado not found' });
    }
  } catch (error) {
    devLogger.debug(error);
    return res.sendError(error);
  }
}


// // Obtener un usuario por nombre de usuario
// export async function getUserByUsername(req, res) {
//   try {
//     const user = await empleadoService.getUserByUsername(req.params.username);
//     if (user) {
//       res.json(user);
//     } else {
//       res.status(404).json({ error: 'User not found' });
//     }
//   } catch (error) {
//     devLogger.error(error)
//     res.status(400).json({ error: error.message });
//   }
// }

// // Obtener un usuario por correo electrónico
// export async function getUserByEmail(req, res) {
//   try {
//     const user = await empleadoService.getUserByEmail(req.params.email);
//     if (user) {
//       res.json(user);
//     } else {
//       res.status(404).json({ error: 'User not found' });
//     }
//   } catch (error) {
//     devLogger.error(error)
//     res.status(400).json({ error: error.message });
//   }
// }

// export async function getUserByEmailORusername(req, res) {
//   try {
//     const user = await empleadoService.getUserByEmailORusername(req.params.some);
//     if (user) {
//       res.json(user);
//     } else {
//       res.status(404).json({ error: 'User not found' });
//     }
//   } catch (error) {
//     devLogger.error(error)
//     res.status(400).json({ error: error.message });
//   }
// }

// Obtener todos los usuarios
export async function getAll(req, res) {
  try {
    const empleados = await empleadoService.findAll();
    return res.sendSuccess(empleados);
  } catch (error) {
    devLogger.error(error)
    return res.sendError(error);
  }
}

// // Actualizar un usuario
// export async function updateUser(req, res) {
//   try {
//     const updatedUser = await empleadoService.updateUser(req.params.id, req.body);
//     res.json(updatedUser);
//   } catch (error) {
//     devLogger.error(error)
//     res.status(400).json({ error: error.message });
//   }
// }

// // Eliminar un usuario
// export async function deleteUser(req, res) {
//   try {
//     const message = await empleadoService.deleteUser(req.params.id);
//     res.json({ message });
//   } catch (error) {
//     devLogger.error(error)
//     res.status(400).json({ error: error.message });
//   }
// }

// // Obtener ordenes en estado pendiente u otro, del usuario
// export async function getOrdenesDelUsuarioPorEstado(req, res) {
//   const userId = req.user.id;
//   let estado = req.query.estado ? req.query.estado : "PENDIENTE";
//   try {
//     const orders = await empleadoService.getOrdenesDelUsuarioPorEstado(userId, estado);
//     res.json(orders);
//   } catch (error) {
//     devLogger.error(error)
//     res.status(400).json({ error: error.message });
//   }
// }

// // Obtener Actas en estado pendiente u otro, del usuario
// export async function getActasDelUsuarioPorEstado(req, res) {
//   const userId = req.user.id;
//   let estado = req.query.estado ? req.query.estado : "PENDIENTE";
//   let tipoActa = req.query.tipoActa ? req.query.tipoActa : "ActaInspeccion";
//   try {
//     const orders = await empleadoService.getActasDelUsuarioPorEstado(userId, tipoActa, estado);
//     res.json(orders);
//   } catch (error) {
//     devLogger.error(error)
//     res.status(400).json({ error: error.message });
//   }
// }

// // Obtener Actas en estado pendiente u otro, del usuario
// export async function obtenerTodasLasActasDelUsuarioOrdenadasPorFecha(req, res) {
//   const userId = req.user.id;
//   try {
//     const orders = await empleadoService.obtenerTodasLasActasDelUsuarioOrdenadasPorFecha(userId);
//     res.json(orders);
//   } catch (error) {
//     devLogger.error(error)
//     res.status(400).json({ error: error.message });
//   }
// }

// // obtener todo del usuario
// export async function getAllFromUser(req, res) {
//   const userId = req.user.id;
//   try {
//     if (req.query.page && req.query.pageSize) {
//       const page = parseInt(req.query.page);
//       const pageSize = parseInt(req.query.pageSize);
//       const result = await getAllFromUser(userId, page, pageSize);
//       return res.json(result);
//     }
//     const orders = await empleadoService.getAllFromUser(userId);
//     res.json(orders);
//   } catch (error) {
//     devLogger.error(error)
//     res.status(400).json({ error: error.message });
//   }
// }
// // obtener todo de todos los usuarios
// export async function getAllFromAll(req, res) {
//   try {
//     if (req.query.page && req.query.pageSize) {
//       const page = parseInt(req.query.page);
//       const pageSize = parseInt(req.query.pageSize);
//       const result = await getAllFromAll(page, pageSize);
//       return res.json(result);
//     }
//     const orders = await empleadoService.getAllFromAll();
//     res.json(orders);
//   } catch (error) {
//     devLogger.error(error)
//     res.status(400).json({ error: error.message });
//   }
// }

