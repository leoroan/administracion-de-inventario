import { Marca } from "../models/marca.model.js";
import { Modelo } from "../models/modelo.model.js";
import { TipoEquipo } from "../models/tipoEquipo.model.js";

export const tipoEquipoScope = {
  defaultScope: {
    attributes: ['id', 'nombre', 'descripcion'],
  },
}

export const defineTipoEquipoScope = () => {
  TipoEquipo.addScope('full', {
    attributes: ['id', 'nombre', 'descripcion'],
    include: [
      {
        model: Marca,
        as: 'Marcas',
        through: { attributes: [] }, 
        attributes: ['id', 'nombre', 'descripcion'],
        // include: [
        //   {
        //     model: Modelo,
        //     as: 'Modelos',
        //     attributes: ['id', 'nombre', 'descripcion']
        //   }
        // ]
      }
    ]
  });
};

