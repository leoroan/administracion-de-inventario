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
        title: '¿Está seguro de agregar esta persona a esta oficina?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, agregar',
        cancelButtonText: 'Cancelar'
      });

      if (result.isConfirmed) {
        try {
          const response = await fetch(`/api/empleados/agregarOficina/${personaId}/${oficinaId}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            }
          })
            // if (!response.ok) {
            //   throw new Error("Error al querer agregar al empleado");
            // }

            // await Swal.fire({
            //   title: 'Agregado correctamente!',
            //   icon: 'success'
            // });
            // window.location.reload();
            .then(response => {
              if (response.ok) {
                Swal.fire(
                  'Agregado!',
                  'La persona se agregó correctamente!',
                  'success'
                ).then(() => {
                  window.location.reload();
                });
              } else {
                return response.json().then(error => {
                  throw new Error(error.error);
                })
              }
            })

        } catch (error) {
          Swal.fire({
            title: 'Error',
            text: error,
            icon: 'error'
          });
        }
      } else {
        Swal.fire('Agregar empleado a oficina cancelado', '', 'info');
        // window.location.reload();
      }
    });
  } catch (error) {
    Swal.fire({
      title: 'Error',
      text: 'Error al cargar los empleados',
      icon: 'error'
    });
  }
});

removerEmpleado = (oficinaId, empleadoId) => {
  confirmAndFetch({
    confirmationTitle: '¿Estás seguro?',
    confirmationText: 'El empleado pasará a estar sin designar en oficina',
    confirmButtonText: 'Sí, retirarlo!',
    cancelButtonText: 'Cancelar',
    url: `/api/empleados/removerOficina/${empleadoId}/${oficinaId}`,
    method: 'POST',
    successTitle: 'Retirado!',
    successText: 'El empleado ha sido desvinculado correctamente',
    errorTitle: '¡Error!',
    errorText: 'No se pudo retirar de la oficina.',
    onSuccess: () => {
      window.location.reload();
    }
  });
}

removerEquipo = (oficinaId, equipoId) => {
  confirmAndFetch({
    confirmationTitle: '¿Estás seguro?',
    confirmationText: 'El equipo pasará a estar disponible',
    confirmButtonText: 'Sí, retirarlo!',
    cancelButtonText: 'Cancelar',
    url: `/api/oficinas/remove/${oficinaId}/${equipoId}/`,
    method: 'POST',
    successTitle: 'Retirado!',
    successText: 'El equipo ha sido removido correctamente',
    errorTitle: '¡Error!',
    errorText: 'No se pudo retirar de la oficina.',
    onSuccess: () => {
      window.location.reload();
    }
  });
}

function confirmAndFetch(config) {
  Swal.fire({
    title: config.confirmationTitle,
    text: config.confirmationText,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: config.confirmButtonText,
    cancelButtonText: config.cancelButtonText
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(config.url, {
        method: config.method
      })
        .then(response => {
          if (response.ok) {
            Swal.fire({
              title: config.successTitle,
              text: config.successText,
              icon: 'success'
            }).then(() => {
              if (config.onSuccess) {
                config.onSuccess();
              }
            });
          } else {
            return response.json().then(error => {
              throw new Error(error.error);
            })
            // Swal.fire({
            //   title: config.errorTitle,
            //   text: config.errorText,
            //   icon: 'error'
            // });
          }
        })
        .catch(error => {
          Swal.fire({
            title: config.errorTitle,
            text: error,
            icon: 'error'
          });
        });
    } else {
      Swal.fire('Borrado cancelado', '', 'info');
    }
  });
}