import { Op } from "sequelize";
import { Edificio } from "../models/Edificio.model.js";
import { Empleado } from "../models/Empleado.model.js";
import { EquipoInformatico } from "../models/EquipoInformatico.model.js";
import { Oficina } from "../models/oficina.model.js";

export const oficinaScope = {
  defaultScope: {
    // attributes: ['id', 'nombre', 'descripcion', 'telefono', 'email'],
  },
}

export const defineOficinaScope = () => {
  Oficina.addScope('soloPadres', {
    // attributes: ['id', 'nombre', 'descripcion', 'telefono', 'email', 'createdAt', 'updatedAt', 'deletedAt'],
    where: {
      '$Dependencias.id$': { [Op.ne]: null }, // Solo oficinas que tienen dependencias
    },
    include: [
      {
        model: Oficina,
        as: 'Dependencias',
        attributes: ['id', 'nombre', 'descripcion', 'telefono', 'email', 'createdAt', 'updatedAt', 'deletedAt'],
      },
    ],

  });

  Oficina.addScope('soloHijas', {
    attributes: ['id', 'nombre', 'descripcion', 'telefono', 'email', 'createdAt', 'updatedAt', 'deletedAt'],
    where: {
      oficinaPadreId: { [Op.ne]: null }, // Solo oficinas que tienen un padre
    },
    include: [
      {
        model: Oficina,
        as: 'OficinaPadre',
        attributes: ['id', 'nombre', 'descripcion', 'telefono', 'email', 'createdAt', 'updatedAt', 'deletedAt'],
      },
    ],
  });

  Oficina.addScope('full', {
    attributes: ['id', 'nombre', 'descripcion', 'telefono', 'email', 'createdAt', 'updatedAt', 'deletedAt'],
    include: [
      {
        model: Empleado,
        as: 'Empleados',
      },
      {
        model: EquipoInformatico,
        as: 'EquipoInformaticos',
      },
      {
        model: Edificio,
        as: 'Edificio',
        attributes: ['id', 'nombre', 'direccion']
      },
      {
        model: Oficina,
        as: 'OficinaPadre',
        attributes: ['id', 'nombre'],
      },
      {
        model: Oficina,
        as: 'Dependencias',
        attributes: ['id', 'nombre'],
      },
    ]
  })
}