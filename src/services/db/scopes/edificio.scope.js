import { Edificio } from "../models/Edificio.model.js";
import { Oficina } from "../models/oficina.model.js";

export const edificioScope = {
  defaultScope: {
    // attributes: ['id', 'nombre', 'descripcion', 'telefono', 'createdAt', 'updatedAt', 'deletedAt'],
  },
}

export const defineEdificioScope = () => {
  Edificio.addScope('full', {
    attributes: ['id', 'nombre', 'direccion', 'descripcion', 'telefono', 'coordenadas'],
    include: [
      {
        model: Oficina,
        as: 'Oficinas',
        attributes: ['id', 'nombre', 'descripcion', 'telefono', 'email'],
      }
    ]
  })
}