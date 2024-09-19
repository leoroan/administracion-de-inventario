import GenericRepository from "./helper/generic.repository.js";

export default class RegistroDeMantenimientoDeEquipoRepository extends GenericRepository {
  constructor(RegistroDeMantenimientoDeEquipo) {
    super(RegistroDeMantenimientoDeEquipo);
  }

  // findByEmailORusername = async (some) => {
  //   return await this.dao.findByEmailORusername(some);
  // }

}