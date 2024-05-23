const myModalEmpleadoAoficina = document.getElementById('agregarEmpleadoAoficinaModal');
const formDarEmpleado = document.getElementById("darEmpleado");
let oficinaId;

myModalEmpleadoAoficina.addEventListener('shown.bs.modal', async function (event) {
  const button = event.relatedTarget;
  oficinaId = button.getAttribute('data-id');

  try {
    const response = await fetch('/api/empleados/');
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Error al obtener los empleados');
    }

    const datosOrdenados = data.sort((a, b) => {
      const nombreA = a.apellido.toLowerCase();
      const nombreB = b.apellido.toLowerCase();
      if (nombreA < nombreB) return -1;
      if (nombreA > nombreB) return 1;
      return 0;
    });

    const selectElementPersona = document.getElementById('seleccionarPersona');
    let personaId;

    // Limpiar el select antes de llenarlo nuevamente
    selectElementPersona.innerHTML = '<option value="">Seleccionar persona</option>';

    datosOrdenados.forEach(option => {
      const opt = document.createElement('option');
      opt.value = option.id;
      opt.textContent = `${option.nombre} ${option.apellido}, ID: ${option.id}`;
      selectElementPersona.appendChild(opt);
    });

    selectElementPersona.addEventListener('change', function () {
      personaId = this.value; // Obtener el valor del option seleccionado
    });

    formDarEmpleado.addEventListener("submit", async (event) => {
      event.preventDefault();

      if (!personaId) {
        Swal.fire({
          title: 'Error',
          text: 'Debe seleccionar una persona',
          icon: 'error'
        });
        return;
      }

      const result = await Swal.fire({
        title: '¿Está seguro de agregar este equipo a esta persona?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, entregar',
        cancelButtonText: 'Cancelar'
      });

      if (result.isConfirmed) {
        try {
          const response = await fetch(`/api/empleados/agregarOficina/${personaId}/${oficinaId}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            }
          });

          if (!response.ok) {
            throw new Error("Error al querer agregar al empleado");
          }

          await Swal.fire({
            title: 'Agregado correctamente!',
            icon: 'success'
          });

          window.location.reload();
        } catch (error) {
          Swal.fire({
            title: 'Error',
            text: 'Error al querer agregar al empleado',
            icon: 'error'
          });
        }
      } else {
        // formDarEmpleado.reset();
        Swal.fire('Agregar empleado a oficina cancelado', '', 'info');
        // window.location.reload();
      }
    });
  } catch (error) {
    console.error('Error al obtener las opciones:', error);
    Swal.fire({
      title: 'Error',
      text: 'Error al cargar los empleados',
      icon: 'error'
    });
  }
});


