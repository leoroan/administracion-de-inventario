console.log("greetings from empelados main");

const busqueda = document.getElementById('busqueda');
const filas = document.querySelectorAll('tbody tr');

busqueda.addEventListener('input', () => {
  const valor = busqueda.value.toLowerCase();

  filas.forEach(fila => {
    const celdas = Array.from(fila.children);
    const encontrado = celdas.some(celda => celda.textContent.toLowerCase().includes(valor));

    fila.style.display = encontrado ? '' : 'none';
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("empleadoForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (form.checkValidity()) {
      const formData = new FormData(form);
      const jsonData = {};
      formData.forEach((value, key) => {
        jsonData[key] = value;
      });

      const formattedData = Object.entries(jsonData).map(([key, value]) => `${key}: ${value}`).join('<br>');

      Swal.fire({
        title: '¿Está seguro de enviar el formulario?',
        html: `Los siguientes datos serán enviados:<br><br>${formattedData}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, enviar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          fetch("/api/empleados/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
          })
            .then(response => {
              if (response.ok) {
                return response.json();

              }
              return response.json().then(error => {
                // console.log(error.error.message);
                throw new Error(error.error.message);
              })
            })

            .then(data => {
              Swal.fire({
                title: 'Empleado creado exitosamente',
                icon: 'success'
              }).then(() => {
                window.location.reload();
              });
            })
            .catch(error => {
              // console.log(error);
              Swal.fire({
                title: 'Error',
                text: error,//'Error al crear el empleado',
                icon: 'error'
              });
            });
        } else {
          form.reset();
          Swal.fire('Envío cancelado', '', 'info');
        }
      });
    }

    form.classList.add("was-validated");
  });

  const inputs = document.querySelectorAll(".form-control");

  inputs.forEach(input => {
    input.addEventListener("input", function () {
      if (input.checkValidity()) {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
      } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
      }
    });
  });

  const select = document.getElementById("rol");

  select.addEventListener("change", function () {
    if (select.checkValidity()) {
      select.classList.remove("is-invalid");
      select.classList.add("is-valid");
    } else {
      select.classList.remove("is-valid");
      select.classList.add("is-invalid");
    }
  });
});


//delete empleado (baja)
function deleteUser(empleadoId) {
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción no se puede deshacer',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`/api/empleados/${empleadoId}`, {
        method: 'DELETE'
      })
        .then(response => {
          if (response.ok) {
            Swal.fire(
              '¡Eliminado!',
              'El empleado ha sido dado de baja correctamente!',
              'success'
            ).then(() => {
              window.location.reload();
            });
          } else {
            Swal.fire(
              '¡Error!',
              'No se pudo eliminar el empleado, probablemente tiene equipos asignados, primero hay q retirarselos!!',
              'error'
            );
          }
        })
        .catch(error => {
          Swal.fire(
            '¡Error!',
            'Ocurrió un error al intentar eliminar la persona.',
            'error'
          );
          console.error('Error al eliminar la persona:', error);
        });
    }
  });
}