console.log("greetings from offices main");

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
  const form = document.getElementById("oficinaForm");

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
          fetch(`/api/oficinas/`, {
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
                throw new Error(error.error.message);
              })
            })
            .then(data => {
              Swal.fire({
                title: 'Oficina creada',
                text: 'La oficina ha sido creada exitosamente',
                icon: 'success'
              }).then(() => {
                window.location.reload();
              });
            })
            .catch(error => {
              Swal.fire({
                title: 'Error',
                text: error,
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
});