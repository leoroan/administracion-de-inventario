export default class EmpleadoRepository {
  constructor(dao) {
    this.dao = dao
  }

  createEmpleado = async (obj) => {
    return await this.dao.createEmpleado(obj);
  }

  getEmpleadoById = async (id) => {
    return await this.dao.getEmpleadoById(id);
  }

  getAllEmpleados = async () => {
    return await this.dao.getAllEmpleados();
  }
  
  updateEmpleado = async (id, updatedData) => {
    return await this.dao.updateEmpleado(id, updatedData);
  }
  
  deleteEmpleado = async (id) => {
    return await this.dao.deleteEmpleado(id);
  }

  findDeletedEmpleadoByDni = async (dni) => {
    return await this.dao.findDeletedEmpleadoByDni(dni);
  }

  getAllDeletedEmpleados = async () => {
    return await this.dao.getAllDeletedEmpleados();
  }

  restoreEmpleadoById = async (id) => {
    return await this.dao.restoreEmpleadoById(id);
  }
}