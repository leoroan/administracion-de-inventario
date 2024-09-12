export default class UserRepository {
  constructor(dao) {
    this.dao = dao
  }
  createUser = async (obj) => {
    return await this.dao.createUser(obj);
  }
  getUserById = async (id) => {
    return await this.dao.getUserById(id);
  }
  getUserByUsername = async (username) => {
    return await this.dao.getUserByUsername(username);
  }
  getUserByEmail = async (email) => {
    return await this.dao.getUserByEmail(email);
  }
  getUserByEmailORusername = async (some) => {
    return await this.dao.getUserByEmailORusername(some);
  }
  getAllUsers = async () => {
    return await this.dao.getAllUsers();
  }
  updateUser = async (id, updatedData) => {
    return await this.dao.updateUser(id, updatedData);
  }
  deleteUser = async (id) => {
    return await this.dao.deleteUser(id);
  }
  getOrdenesDelUsuarioPorEstado = async (id, estado) => {
    return await this.dao.getOrdenesDelUsuarioPorEstado(id, estado);
  }
  getActasDelUsuarioPorEstado = async (id, tipoActa, estado) => {
    return await this.dao.getActasDelUsuarioPorEstado(id, tipoActa, estado);
  }
  obtenerTodasLasActasDelUsuarioOrdenadasPorFecha = async (id) => {
    return await this.dao.obtenerTodasLasActasDelUsuarioOrdenadasPorFecha(id);
  }
  getAllFromUser = async (id) => {
    return await this.dao.getAllFromUser(id);
  }
  getAllFromAll = async () => {
    return await this.dao.getAllFromAll();
  }
}