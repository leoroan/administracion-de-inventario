import { Edificio } from "../models/Edificio.model.js";
import { Empleado } from "../models/Empleado.model.js";
import { EquipoInformatico } from "../models/EquipoInformatico.model.js";
import { Oficina } from "../models/oficina.model.js";
import { Rol } from "../models/rol.model.js";

export const empleadoScope = {
  defaultScope: {
    attributes: ['id', 'username', 'telefono', 'email', 'nombre', 'apellido', 'dni', 'createdAt', 'updatedAt', 'deletedAt'],
    include: [
      {
        model: Rol,
        as: 'Rol',
        attributes: ['id', 'nombre'],
      },
    ]
  },
}

export const defineEmpleadoScope = () => {
  Empleado.addScope('conEquipo', {
    // attributes: ['id', 'username', 'telefono', 'email', 'nombre', 'apellido', 'dni'],
    include: [
      {
        model: EquipoInformatico,
        as: 'EquipoInformaticos',
        attributes: ['id', 'mt', 'numeroDeSerie', 'numeroDePatrimonio'],

      }
    ]
  }),
    Empleado.addScope('basic', {
      attributes: ['id', 'username', 'password', 'telefono', 'email', 'nombre', 'apellido', 'dni'], //es para login!
      include: [
        {
          model: Rol,
          as: 'Rol',
          attributes: ['id', 'nombre'],
        },
      ]
    }),
    Empleado.addScope('conOficina', {
      // attributes: ['id', 'username', 'telefono', 'email', 'nombre', 'apellido', 'dni'],
      include: [
        {
          model: Oficina,
          as: 'Oficina',
          attributes: ['id', 'nombre'],
          include: [
            {
              model: Edificio,
              as: 'Edificio',
              attributes: ['id', 'nombre', 'direccion']
            }
          ]
        }
      ]
    })
};

