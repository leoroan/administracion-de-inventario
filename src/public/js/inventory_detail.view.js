const myModal = document.getElementById('agregarEquipoApersonaModal');
const form = document.getElementById("darEquipo");
let equipId;

myModal.addEventListener('shown.bs.modal', async function (event) {
  const button = event.relatedTarget;
  equipId = button.getAttribute('data-id');

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

    const selectElement = document.getElementById('seleccionarPersona');
    let personaId;

    // Limpiar el select antes de llenarlo nuevamente
    selectElement.innerHTML = '<option value="">Seleccionar persona</option>';

    datosOrdenados.forEach(option => {
      const opt = document.createElement('option');
      opt.value = option.id;
      opt.textContent = `${option.nombre} ${option.apellido}, ID: ${option.id}`;
      selectElement.appendChild(opt);
    });

    selectElement.addEventListener('change', function () {
      personaId = this.value; // Obtener el valor del option seleccionado
    });

    form.addEventListener("submit", async (event) => {
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
          const response = await fetch(`/api/empleados/agregarEquipo/${personaId}/${equipId}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            }
          });

          if (!response.ok) {
            throw new Error("Error al querer entregar el equipo");
          }

          await Swal.fire({
            title: 'Entregado correctamente!',
            icon: 'success'
          });

          window.location.reload();
        } catch (error) {
          Swal.fire({
            title: 'Error',
            text: 'Error al querer entregar equipo',
            icon: 'error'
          });
        }
      } else {
        form.reset();
        Swal.fire('Entrega de equipo cancelada', '', 'info');
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