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

      fetch("/api/empleados/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(jsonData)
      })
        .then(response => { console.log(response);
          if (!response.ok) {
            throw new Error("Error al crear empleado");
          }
          return response.json();
        })
        .then(data => {
          // Manejar la respuesta de la API si es necesario
          console.log("Empleado creado:", data);
          // Aquí podrías redirigir a una página de éxito o hacer cualquier otra acción necesaria
        })
        .catch(error => {
          console.error("Error:", error.message);
          // Aquí podrías mostrar un mensaje de error al usuario o realizar otras acciones de manejo de errores
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


