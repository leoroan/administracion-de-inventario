import { SequelizeError } from "../../../utils/errors.js";
import GenericDAO from "./helper/generic.dao.js";
import { Op } from 'sequelize';

export default class EmpleadoDAO extends GenericDAO {
  constructor(Empleado) {
    super(Empleado);
  }

  async findByEmail(email) {
    try {
      const record = await this.model.findOne({ where: { email } });
      if (!record) throw new Error(`Employee not found`);
      return record;
    } catch (error) {
      throw SequelizeError.handleSequelizeError(error, `Error fetching Empleado by email`);
    }
  }

  async findByEmailORusername(some) {
    try {
      const record = await this.model.findOne({ where: { [Op.or]: [{ email: some }, { username: some }] } });      
      if (!record) throw new Error(`Employee not found`);
      return record;
    } catch (error) {
      throw SequelizeError.handleSequelizeError(error, `Error fetching Empleado by email or username`);
    }
  }
}


// import { User } from '../models/user.model.js';
// import { Op } from 'sequelize';

// export default class UserDao {
//   // Crear un nuevo usuario
//   async createUser(obj) {
//     let transaction;
//     try {
//       transaction = await User.sequelize.transaction();
//       const user = await User.create(obj, { transaction });
//       await transaction.commit();
//       return user;
//     } catch (error) {
//       if (transaction) await transaction.rollback();
//       throw new Error(`Error creating user: ${error.message}`);
//     }
//   }

//   // Obtener un usuario por ID
//   async getUserById(id) {
//     try {
//       const user = await User.findByPk(id);
//       return user;
//     } catch (error) {
//       throw new Error(`Error fetching user by ID: ${error.message}`);
//     }
//   }

//   // Obtener un usuario y sus ordenes segun su estado
//   async getOrdenesDelUsuarioPorEstado(id, estado) {
//     try {
//       const user = await User.findByPk(id, {
//         include: { model: OrdenServicio, where: { estado: estado } }
//       });
//       if (user) {
//         return user.OrdenServicios;
//       } else {
//         return null;
//       }
//     } catch (error) {
//       throw new Error(`Error fetching user by ID: ${error.message}`);
//     }
//   }

//   // Obtener de un usuario, sus actas segun su en estado
//   async getActasDelUsuarioPorEstado(id, tipoActa, estado) {
//     try {
//       let actaModel;
//       switch (tipoActa) {
//         case 'ActaCalibracion':
//           actaModel = ActaCalibracion;
//           break;
//         case 'ActaConstatacion':
//           actaModel = ActaConstatacion;
//           break;
//         case 'ActaDestruccionObleas':
//           actaModel = ActaDestruccionObleas;
//           break;
//         case 'ActaInspeccion':
//           actaModel = ActaInspeccion;
//           break;
//         case 'ActaRequerimiento':
//           actaModel = ActaRequerimiento;
//       }
//       const user = await User.findByPk(id, { include: { model: actaModel, where: { estado: estado }, include: { model: OrdenServicio } } });
//       if (user) {
//         return user[tipoActa + "s"];
//       } else {
//         return [];
//       }
//     } catch (error) {
//       throw new Error(`Error fetching actas for user: ${error.message}`);
//     }
//   }

//   // obtener las actas del usuario ordenadas por fecha
//   async obtenerTodasLasActasDelUsuarioOrdenadasPorFecha(id) {
//     try {
//       const user = await User.findByPk(id, {
//         include: [
//           { model: ActaCalibracion, include: { model: OrdenServicio } },
//           { model: ActaConstatacion },
//           { model: ActaDestruccionObleas, include: { model: OrdenServicio } },
//           { model: ActaInspeccion, include: { model: OrdenServicio } },
//           { model: ActaRequerimiento, include: { model: OrdenServicio } }
//         ],
//         order: [
//           [ActaCalibracion, 'fecha', 'DESC'],
//           [ActaConstatacion, 'fecha', 'DESC'],
//           [ActaDestruccionObleas, 'fecha', 'DESC'],
//           [ActaInspeccion, 'fecha', 'DESC'],
//           [ActaRequerimiento, 'fecha', 'DESC']
//         ]
//       });

//       if (user) {
//         let todasLasActas = [];
//         if (user.ActaCalibracions) todasLasActas = todasLasActas.concat(user.ActaCalibracions);
//         if (user.ActaConstatacions) todasLasActas = todasLasActas.concat(user.ActaConstatacions);
//         if (user.ActaDestruccionObleas) todasLasActas = todasLasActas.concat(user.ActaDestruccionObleas);
//         if (user.ActaInspeccions) todasLasActas = todasLasActas.concat(user.ActaInspeccions);
//         if (user.ActaRequerimientos) todasLasActas = todasLasActas.concat(user.ActaRequerimientos);

//         todasLasActas.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
//         return todasLasActas;
//       } else {
//         throw new Error('Error fetching user.');
//       }
//     } catch (error) {
//       throw new Error(`Error fetching user and documents: ${error.message}`);
//     }
//   }

//   // Obtener un usuario por nombre de usuario
//   async getUserByUsername(username) {
//     try {
//       const user = await User.findOne({ where: { username } });
//       return user;
//     } catch (error) {
//       throw new Error(`Error fetching user by username: ${error.message}`);
//     }
//   }

//   // Obtener un usuario por correo electrónico
//   async getUserByEmail(email) {
//     try {
//       const user = await User.findOne({ where: { email } });
//       return user;
//     } catch (error) {
//       throw new Error(`Error fetching user by email: ${error.message}`);
//     }
//   }

//   async getUserByEmailORusername(algo) {
//     try {
//       const user = await User.findOne({ where: { [Op.or]: [{ email: algo }, { username: algo }] } });
//       return user;
//     } catch (error) {
//       throw new Error(`Error fetching user by email or username: ${error.message}`);
//     }
//   }

//   // Obtener todos los usuarios
//   async getAllUsers() {
//     try {
//       const users = await User.findAll();
//       return users;
//     } catch (error) {
//       throw new Error(`Error fetching all users: ${error.message}`);
//     }
//   }

//   // Actualizar un usuario
//   async updateUser(id, updateData) {
//     let transaction;
//     try {
//       transaction = await User.sequelize.transaction();
//       const user = await User.findByPk(id, { transaction });
//       if (!user) {
//         throw new Error(`User with ID: ${id} not found`);
//       }
//       await user.update(updateData, { transaction });
//       await transaction.commit();
//       return user;
//     } catch (error) {
//       if (transaction) await transaction.rollback();
//       throw new Error(`Error updating user: ${error.message}`);
//     }
//   }

//   // Eliminar un usuario
//   async deleteUser(id) {
//     let transaction;
//     try {
//       transaction = await User.sequelize.transaction();
//       const user = await User.findByPk(id, { transaction });
//       if (!user) {
//         throw new Error(`User with ID: ${id} not found`);
//       }
//       const deleted = await User.destroy({ where: { id }, transaction });
//       if (deleted) {
//         await transaction.commit();
//         return `User with ID: ${id} deleted`;
//       }
//     } catch (error) {
//       if (transaction) await transaction.rollback();
//       throw new Error(`Error deleting user: ${error.message}`);
//     }
//   }

//   // Obtener todo del usuario
//   async getAllFromUser(id, page, pageSize) {
//     try {
//       if (page && pageSize) {
//         const user = await User.findByPk(id, {
//           attributes: ['id', 'username'],
//           include: [
//             {
//               model: ActaCalibracion, include: { model: OrdenServicio, attributes: ['nombreUsuario', 'nombrePlanta', 'zonaPlanta', 'oferente', 'tipoActa'] },
//               offset: (page - 1) * pageSize,
//               limit: pageSize,
//             },
//             {
//               model: ActaConstatacion, include: { model: ActaInspeccion, attributes: ['id', 'OrdenServicioId'], include: { model: OrdenServicio, attributes: ['nombreUsuario', 'nombrePlanta', 'zonaPlanta', 'oferente', 'tipoActa'] }, },
//               offset: (page - 1) * pageSize,
//               limit: pageSize,
//             },
//             {
//               model: ActaDestruccionObleas, include: { model: OrdenServicio, attributes: ['nombreUsuario', 'nombrePlanta', 'zonaPlanta', 'oferente', 'tipoActa'] },
//               offset: (page - 1) * pageSize,
//               limit: pageSize,
//             },
//             {
//               model: ActaInspeccion, attributes: ['id', 'UserId', 'OrdenServicioId', 'fecha', 'estado'], include: { model: OrdenServicio, attributes: ['nombreUsuario', 'nombrePlanta', 'zonaPlanta', 'oferente', 'tipoActa'] },
//               offset: (page - 1) * pageSize,
//               limit: pageSize,
//             },
//             {
//               model: ActaRequerimiento, include: { model: OrdenServicio, attributes: ['nombreUsuario', 'nombrePlanta', 'zonaPlanta', 'oferente', 'tipoActa'] },
//               offset: (page - 1) * pageSize,
//               limit: pageSize,
//             },
//           ]
//         });
//         return user;
//       }

//       const user = await User.findByPk(id, {
//         attributes: ['id', 'username'],
//         include: [
//           { model: ActaCalibracion, include: { model: OrdenServicio, attributes: ['nombreUsuario', 'nombrePlanta', 'zonaPlanta', 'oferente', 'tipoActa'] } },
//           { model: ActaConstatacion, include: { model: ActaInspeccion, attributes: ['id', 'OrdenServicioId'], include: { model: OrdenServicio, attributes: ['nombreUsuario', 'nombrePlanta', 'zonaPlanta', 'oferente', 'tipoActa'] }, } },
//           { model: ActaDestruccionObleas, include: { model: OrdenServicio, attributes: ['nombreUsuario', 'nombrePlanta', 'zonaPlanta', 'oferente', 'tipoActa'] } },
//           {
//             model: ActaInspeccion, attributes: ['id', 'UserId', 'OrdenServicioId', 'fecha', 'estado'], include:
//               { model: OrdenServicio, attributes: ['nombreUsuario', 'nombrePlanta', 'zonaPlanta', 'oferente', 'tipoActa'] }
//           },
//           { model: ActaRequerimiento, include: { model: OrdenServicio, attributes: ['nombreUsuario', 'nombrePlanta', 'zonaPlanta', 'oferente', 'tipoActa'] } },
//         ]
//       });
//       return user;
//     } catch (error) {
//       throw new Error(`Error fetching user: ${error.message}`);
//     }
//   }

//   // Obtener todo del usuario
//   async getAllFromAll(page, pageSize) {
//     try {
//       if (page && pageSize) {
//         const { rows: resultados, count: totalElementos } = await User.findAndCountAll({
//           offset: (page - 1) * pageSize,
//           limit: pageSize,
//           attributes: ['id', 'username'],
//           include: [
//             { model: ActaCalibracion, include: { model: OrdenServicio, attributes: ['nombreUsuario', 'nombrePlanta', 'zonaPlanta', 'oferente', 'tipoActa'] } },
//             { model: ActaConstatacion, include: { model: ActaInspeccion, attributes: ['id'], include: { model: OrdenServicio, attributes: ['nombreUsuario', 'nombrePlanta', 'zonaPlanta', 'oferente', 'tipoActa'] }, } },
//             { model: ActaDestruccionObleas, include: { model: OrdenServicio, attributes: ['nombreUsuario', 'nombrePlanta', 'zonaPlanta', 'oferente', 'tipoActa'] } },
//             {
//               model: ActaInspeccion, attributes: ['id', 'UserId', 'OrdenServicioId', 'fecha', 'estado'], include:
//                 { model: OrdenServicio, attributes: ['nombreUsuario', 'nombrePlanta', 'zonaPlanta', 'oferente', 'tipoActa'] }
//             },
//             { model: ActaRequerimiento, include: { model: OrdenServicio, attributes: ['nombreUsuario', 'nombrePlanta', 'zonaPlanta', 'oferente', 'tipoActa'] } },
//           ]
//         });
//         return { rows: resultados, count: totalElementos };
//       }
//       const users = await User.findAll({
//         attributes: ['id', 'username'],
//         include: [
//           { model: ActaCalibracion, include: { model: OrdenServicio, attributes: ['nombreUsuario', 'nombrePlanta', 'zonaPlanta', 'oferente', 'tipoActa'] } },
//           { model: ActaConstatacion, include: { model: ActaInspeccion, attributes: ['id'], include: { model: OrdenServicio, attributes: ['nombreUsuario', 'nombrePlanta', 'zonaPlanta', 'oferente', 'tipoActa'] }, } },
//           { model: ActaDestruccionObleas, include: { model: OrdenServicio, attributes: ['nombreUsuario', 'nombrePlanta', 'zonaPlanta', 'oferente', 'tipoActa'] } },
//           {
//             model: ActaInspeccion, attributes: ['id', 'UserId', 'OrdenServicioId', 'fecha', 'estado'], include:
//               { model: OrdenServicio, attributes: ['nombreUsuario', 'nombrePlanta', 'zonaPlanta', 'oferente', 'tipoActa'] }
//           },
//           { model: ActaRequerimiento, include: { model: OrdenServicio, attributes: ['nombreUsuario', 'nombrePlanta', 'zonaPlanta', 'oferente', 'tipoActa'] } },
//         ]
//       });
//       return users;
//     } catch (error) {
//       throw new Error(`Error fetching user: ${error.message}`);
//     }
//   }

// }