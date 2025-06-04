
export const rolesPredeterminados = [
  {
    nombre: 'ADMIN',
    nivel: 1,
    descripcion: "Acceso completo al sistema",
    permisos: [
      "administrar_sistema",
      "crear_usuarios",
      "editar_usuarios",
      "eliminar_usuarios",
      "ver_usuarios",
      "crear_equipos",
      "editar_equipos",
      "eliminar_equipos",
      "ver_equipos",
      "generar_reportes",
    ],
  },
  {
    nombre: 'ENCARGADO DE SISTEMAS INF.',
    nivel: 2,
    descripcion: "Gestión avanzada de sistemas y soporte",
    permisos: [
      "crear_usuarios",
      "editar_usuarios",
      "ver_usuarios",
      "crear_equipos",
      "editar_equipos",
      "eliminar_equipos",
      "ver_equipos",
      "generar_reportes",
    ],
  },
  {
    nombre: 'EMPLEADO DE SOPORTE INF.',
    nivel: 3,
    descripcion: "Soporte técnico y gestión básica de equipos",
    permisos: [
      "crear_equipos",
      "editar_equipos",
      "ver_equipos",
      "generar_reportes",
    ],
  },
  {
    nombre: 'MINISTRO',
    nivel: 4,
    descripcion: "Acceso a reportes y visualización general",
    permisos: [
      "ver_usuarios",
      "ver_equipos",
      "generar_reportes",
    ],
  },
  {
    nombre: 'SECRETARIO',
    nivel: 4,
    descripcion: "Acceso a reportes y visualización general",
    permisos: [
      "ver_usuarios",
      "ver_equipos",
      "generar_reportes",
    ],
  },
  {
    nombre: 'SUBSECRETARIO',
    nivel: 4,
    descripcion: "Acceso a reportes y visualización general",
    permisos: [
      "ver_usuarios",
      "ver_equipos",
      "generar_reportes",
    ],
  },
  {
    nombre: 'DIRECTOR',
    nivel: 5,
    descripcion: "Visualización de equipos y reportes",
    permisos: [
      "ver_equipos",
      "generar_reportes",
    ],
  },
  {
    nombre: 'DIRECTOR DE LINEA',
    nivel: 5,
    descripcion: "Visualización de equipos y reportes",
    permisos: [
      "ver_equipos",
      "generar_reportes",
    ],
  },
  {
    nombre: 'EMPLEADO',
    nivel: 6,
    descripcion: "Acceso limitado a visualización de equipos",
    permisos: [
      "ver_equipos",
    ],
  }
];