class EmpleadoDTO {
  constructor(id, nombre, apellido, telefono, dni, rol, email, equiposInformaticos) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.telefono = telefono;
    this.dni = dni;
    this.rol = rol;
    this.email = email;
    this.equiposInformaticos = equiposInformaticos;
  }
}

export { EmpleadoDTO };