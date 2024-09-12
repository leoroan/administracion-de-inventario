// import { devLogger } from '../config/logger/logger.config.js';
// import { userService } from "../services/service.js";
// import { createHash } from '../utils/bcrypt.js';

// // Crear un nuevo usuario
// export async function createAdmin() {
//   try {
//     const adminUser = await userService.getUserByUsername("administrador");   
//     if (!adminUser) {
//       await userService.createUser({
//         username: 'administrador',
//         password: createHash('administrador101402'), 
//         rol: 'ADMIN',
//         email: 'admin@transporte.gba.gob.ar'
//       });
//       devLogger.info('init-usr-created.');
//     } else {
//       devLogger.info('usr-allready.');
//     }
//   } catch (error) {
//     devLogger.error(error);
//   }
// }

// export async function createUser(req, res) {
//   try {
//     const user = await userService.createUser(req.body);
//     // const { username, password } = req.body;    
//     // const user = await userService.createUser({ username, password });
//     res.status(201).json(user);
//   } catch (error) {
//     devLogger.error(error)
//     res.status(400).json({ error: error.message });
//   }
// }

// // Obtener un usuario por ID
// export async function getUserById(req, res) {
//   try {
//     const user = await userService.getUserById(req.params.id);
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

// // Obtener un usuario por nombre de usuario
// export async function getUserByUsername(req, res) {
//   try {
//     const user = await userService.getUserByUsername(req.params.username);
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
//     const user = await userService.getUserByEmail(req.params.email);
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
//     const user = await userService.getUserByEmailORusername(req.params.some);
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

// // Obtener todos los usuarios
// export async function getAllUsers(req, res) {
//   try {
//     const users = await userService.getAllUsers();
//     res.sendSuccess(users);
//   } catch (error) {
//     devLogger.error(error)
//     res.sendInternalServerError({ error: error.message });
//   }
// }

// // Actualizar un usuario
// export async function updateUser(req, res) {
//   try {
//     const updatedUser = await userService.updateUser(req.params.id, req.body);
//     res.json(updatedUser);
//   } catch (error) {
//     devLogger.error(error)
//     res.status(400).json({ error: error.message });
//   }
// }

// // Eliminar un usuario
// export async function deleteUser(req, res) {
//   try {
//     const message = await userService.deleteUser(req.params.id);
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
//     const orders = await userService.getOrdenesDelUsuarioPorEstado(userId, estado);
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
//     const orders = await userService.getActasDelUsuarioPorEstado(userId, tipoActa, estado);
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
//     const orders = await userService.obtenerTodasLasActasDelUsuarioOrdenadasPorFecha(userId);
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
//     const orders = await userService.getAllFromUser(userId);
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
//     const orders = await userService.getAllFromAll();
//     res.json(orders);
//   } catch (error) {
//     devLogger.error(error)
//     res.status(400).json({ error: error.message });
//   }
// }

