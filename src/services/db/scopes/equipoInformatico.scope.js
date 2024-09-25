import { Edificio } from "../models/Edificio.model.js";
import { Empleado } from "../models/Empleado.model.js";
import { Marca } from "../models/marca.model.js";
import { Modelo } from "../models/modelo.model.js";
import { Oficina } from "../models/oficina.model.js";
import { RegistroDeMantenimientoDeEquipo } from "../models/registroDeMantenimientoDeEquipo.model.js";
import { TipoEquipo } from "../models/tipoEquipo.model.js";

export const equipoInformaticoScope = {
  defaultScope: {
    attributes: ['id', 'mt', 'numeroDeSerie', 'numeroDePatrimonio', 'estado'],
    include: [
      {
        model: Modelo,
        as: 'Modelo',
        attributes: ['nombre'],
        include: [
          {
            model: Marca,
            as: 'Marca',
            attributes: ['nombre', 'descripcion']
          }
        ],
      },
      {
        model: TipoEquipo,
        as: 'TipoEquipo',
        attributes: ['nombre', 'descripcion']
      },
      {
        model: RegistroDeMantenimientoDeEquipo,
        as: 'RegistroDeMantenimientoDeEquipos',
        attributes: ['id', 'tipoMantenimiento', 'tecnicoResponsable', 'createdAt']
      },
    ]
  },
  scopes: {
    fullConEmpleado: {
      include: [
        {
          model: Empleado,
          as: 'Empleado',
          attributes: ['nombre', 'apellido', 'email'],
          include: [
            {
              model: Oficina,
              as: 'Oficina',
              attributes: ['nombre', 'descripcion', 'email', 'telefono'],
              include: [
                {
                  model: Edificio,
                  as: 'Edificio',
                  attributes: ['nombre', 'direccion', 'coordenadas']
                }
              ]
            }
          ]
        },
        {
          model: Modelo,
          as: 'Modelo',
          attributes: ['nombre'],
          include: [
            {
              model: Marca,
              as: 'Marca',
              attributes: ['nombre', 'descripcion']
            }
          ],
        },
        {
          model: TipoEquipo,
          as: 'TipoEquipo',
          attributes: ['nombre', 'descripcion']
        },
        {
          model: RegistroDeMantenimientoDeEquipo,
          as: 'RegistroDeMantenimientoDeEquipos',
          attributes: ['id', 'tipoMantenimiento', 'tecnicoResponsable', 'createdAt']
        },
      ]
    },
    fullConOficina: {
      include: [
        {
          model: Oficina,
          as: 'Oficina',
          attributes: ['nombre', 'descripcion', 'email', 'telefono'],
          include: [
            {
              model: Edificio,
              as: 'Edificio',
              attributes: ['nombre', 'direccion', 'coordenadas']
            }
          ]
        },
        {
          model: Modelo,
          as: 'Modelo',
          attributes: ['nombre'],
          include: [
            {
              model: Marca,
              as: 'Marca',
              attributes: ['nombre', 'descripcion']
            }
          ],
        },
        {
          model: TipoEquipo,
          as: 'TipoEquipo',
          attributes: ['nombre', 'descripcion']
        },
        {
          model: RegistroDeMantenimientoDeEquipo,
          as: 'RegistroDeMantenimientoDeEquipos',
          attributes: ['id', 'tipoMantenimiento', 'tecnicoResponsable', 'createdAt']
        },
      ]
    }
  }
}
