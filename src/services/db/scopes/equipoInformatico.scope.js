import { Empleado } from "../models/Empleado.model.js";
import { Edificio } from "../models/Edificio.model.js";
import { Marca } from "../models/marca.model.js";
import { Modelo } from "../models/modelo.model.js";
import { Oficina } from "../models/oficina.model.js";
import { RegistroDeMantenimientoDeEquipo } from "../models/registroDeMantenimientoDeEquipo.model.js";
import { TipoEquipo } from "../models/tipoEquipo.model.js";
import { EquipoInformatico } from "../models/EquipoInformatico.model.js";
import { Trazabilidad } from "../models/trazabilidad.model.js";

export const equipoInformaticoScope = {
  defaultScope: {
    attributes: ['id', 'mt', 'numeroDeSerie', 'numeroDePatrimonio', 'estado', 'createdAt', 'updatedAt', 'deletedAt', 'observacion', 'especificacionesTecnicas'],
    include: [
      {
        model: Modelo,
        as: 'Modelo',
        attributes: ['id', 'nombre'],
        include: [
          {
            model: Marca,
            as: 'Marca',
            attributes: ['id', 'nombre', 'descripcion']
          }
        ],
      },
      {
        model: TipoEquipo,
        as: 'TipoEquipo',
        attributes: ['id', 'nombre', 'descripcion']
      }
    ]
  }
}

export const defineEquipoInformaticoScopes = () => {
  EquipoInformatico.addScope('conEmpleado', {
    // attributes: ['id', 'mt', 'numeroDeSerie', 'numeroDePatrimonio', 'estado'],
    include: [
      {
        model: Empleado,
        as: 'Empleado',
        attributes: ['id', 'nombre', 'apellido', 'email', 'telefono'],
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
      },
    ],
  }),
    EquipoInformatico.addScope('conOficina', {
      // attributes: ['id', 'mt', 'numeroDeSerie', 'numeroDePatrimonio', 'estado'],
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
    }),
    EquipoInformatico.addScope('conRegistrosDeMantenimiento', {
      // attributes: ['id', 'mt', 'numeroDeSerie', 'numeroDePatrimonio', 'estado'],
      include: [
        {
          model: RegistroDeMantenimientoDeEquipo,
          as: 'RegistroDeMantenimientoDeEquipos',
          attributes: ['id', 'tipoMantenimiento', 'tecnicoResponsable', 'createdAt', 'updatedAt']
        }
      ]
    })
  EquipoInformatico.addScope('conTrazabilidad', {
    // attributes: ['id', 'mt', 'numeroDeSerie', 'numeroDePatrimonio', 'estado'],
    include: [
      {
        model: Trazabilidad,
        as: 'Trazabilidads',
        attributes: ['id', 'originario', 'createdAt'],
        limit: 1,
        order: [['createdAt', 'DESC']]
      }
    ]
  })
};