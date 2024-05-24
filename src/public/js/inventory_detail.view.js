const myModalEquipoApersona = document.getElementById('agregarEquipoApersonaModal');
const formEquipoApersona = document.getElementById("darEquipoApersona");
const myModalEquipoAoficina = document.getElementById('agregarEquipoAoficinaModal');
const formEquipoAoficina = document.getElementById("darEquipoAoficina");
let equipoId;

myModalEquipoAoficina.addEventListener('shown.bs.modal', async function (event) {
  const button = event.relatedTarget;
  equipoId = button.getAttribute('data-id');

  try {
    const response = await fetch('/api/oficinas/');
    const data = await response.json();
    if (!response.ok) {
      throw new Error('Error al obtener las oficinas');
    }
    const selectElement = document.getElementById('seleccionarOficina');
    let oficinaId;
    selectElement.innerHTML = '<option value="">Seleccionar oficina</option>';

    data.forEach(option => {
      const opt = document.createElement('option');
      opt.value = option.id;
      opt.textContent = `${option.nombre} ID: ${option.id}`;
      selectElement.appendChild(opt);
    });

    selectElement.addEventListener('change', function () {
      oficinaId = this.value; // Obtener el valor del option seleccionado
    });

    formEquipoAoficina.addEventListener("submit", async (event) => {
      event.preventDefault();

      if (!oficinaId) {
        Swal.fire({
          title: 'Error',
          text: 'Debe seleccionar una oficina',
          icon: 'error'
        });
        return;
      }

      const result = await Swal.fire({
        title: '¿Está seguro de agregar este equipo a esta oficina?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, entregar',
        cancelButtonText: 'Cancelar'
      });

      if (result.isConfirmed) {
        try {
          const response = await fetch(`/api/empleados/agregarEquipo/${oficinaId}/${equipoId}`, {
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
        formEquipoApersona.reset();
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

myModalEquipoApersona.addEventListener('shown.bs.modal', async function (event) {
  const button = event.relatedTarget;
  equipoId = button.getAttribute('data-id');

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

    formEquipoApersona.addEventListener("submit", async (event) => {
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
          const response = await fetch(`/api/empleados/agregarEquipo/${personaId}/${equipoId}`, {
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
        formEquipoApersona.reset();
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


function removerEquipo(equipoId, empleadoId) {
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'El equipo pasará a estar en estado "disponible"',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, retirarlo!',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`/api/empleados/removerEquipo/${empleadoId}/${equipoId}`, {
        method: 'POST'
      })
        .then(response => {
          if (response.ok) {
            Swal.fire(
              'Retirado!',
              'El equipo ha sido desvinculado correctamente, este pasa a estar en estado "disponible"',
              'success'
            ).then(() => {
              window.location.reload();
            });
          } else {
            Swal.fire(
              '¡Error!',
              'No se pudo retirar del empleado.',
              'error'
            );
          }
        })
        .catch(error => {
          Swal.fire(
            '¡Error!',
            'Ocurrió un error al intentar retirar el equipo.',
            'error'
          );
          console.error('Error al querer retirar el equipo:', error);
        });
    }
  });
}