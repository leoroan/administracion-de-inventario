/**
 * 
 * import CartDao from "../dao/mongo/cart.dao.js";
 *
 * import CartRepository from "./cart.repository.js";
 *  
 * const cartDao = new CartDao();
 *
 * export const cartService = new CartRepository(cartDao);
 *
 */

import EmpleadoDao from "../db/dao/empleado.dao.js";
import EmpleadoRepository from "./empleado.repository.js";

const empleadoDao = new EmpleadoDao();

export const empleadoService = new EmpleadoRepository(empleadoDao);