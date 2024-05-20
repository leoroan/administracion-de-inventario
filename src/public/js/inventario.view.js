console.log("greetings from inventario main");

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

//tema formulario
document.getElementById("marca").addEventListener("change", function () {
  var selectMarca = document.getElementById("marca");
  var nuevaMarca = document.getElementById("nuevaMarca");
  if (selectMarca.value === "otra") {
    nuevaMarca.style.display = "block";
    document.getElementById("nuevaMarcaInput").setAttribute("required", "true");
  } else {
    nuevaMarca.style.display = "none";
    document.getElementById("nuevaMarcaInput").removeAttribute("required");
  }
  cargarModelos(selectMarca.value);
});

document.getElementById("modelo").addEventListener("change", function () {
  var selectModelo = document.getElementById("modelo");
  var nuevoModelo = document.getElementById("nuevoModelo");
  if (selectModelo.value === "otro") {
    nuevoModelo.style.display = "block";
    document.getElementById("nuevoModeloInput").setAttribute("required", "true");
  } else {
    nuevoModelo.style.display = "none";
    document.getElementById("nuevoModeloInput").removeAttribute("required");
  }
});

document.getElementById("tipoEquipo").addEventListener("change", function () {
  var selectTipoEquipo = document.getElementById("tipoEquipo");
  var nuevoTipo = document.getElementById("nuevoTipo");
  if (selectTipoEquipo.value === "otro") {
    nuevoTipo.style.display = "block";
    document.getElementById("nuevoTipoInput").setAttribute("required", "true");
  } else {
    nuevoTipo.style.display = "none";
    document.getElementById("nuevoTipoInput").removeAttribute("required");
  }
});

//tema modelos
function cargarModelos(marca) {
  fetch(`/api/modelos/modelosXmarcas/${marca}`)
    .then(response => response.json())
    .then(data => {
      const selectModelo = document.getElementById('modelo');
      selectModelo.innerHTML = ''; // Limpiamos las opciones existentes

      // Agregamos la opción "Otro"
      const opcionOtro = document.createElement('option');
      opcionOtro.value = 'otro';
      opcionOtro.textContent = 'Otro';
      selectModelo.appendChild(opcionOtro);

      const opcionDefault = document.createElement('option');
      opcionDefault.value = '';
      opcionDefault.textContent = 'Seleccione una opción';
      opcionDefault.selected = true; // Marcar como seleccionada
      opcionDefault.disabled = true; // Deshabilitar la opción
      selectModelo.appendChild(opcionDefault);

      // Agregamos las opciones obtenidas desde la API
      data.forEach(modelo => {
        const opcion = document.createElement('option');
        opcion.value = modelo.nombre; // Asumimos que la API devuelve un objeto con una propiedad "valor"
        opcion.textContent = modelo.nombre; // Asumimos que la API devuelve un objeto con una propiedad "nombre"
        selectModelo.appendChild(opcion);
      });
    })
    .catch(error => {
      console.error('Error al cargar los modelos:', error);
      // Aquí puedes mostrar un mensaje de error al usuario si lo deseas
    });
}

//tema agregando nuevos valores
async function crearMarca(marca) {
  console.log(marca);
  // fetch(`/api/marca/${marca}`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json"
  //   },
  //   body: JSON.stringify({ nombre: marca })
  // })
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log(data);
  //   })
  //   .catch(error => {
  //     console.error('Error al agregar la marca:', error);
  //     // Aquí puedes mostrar un mensaje de error al usuario si lo deseas
  //   });
}

//tema ENVIO formulario
document.addEventListener("DOMContentLoaded", function () {
  // cargarModelos(); //modelos
  const form = document.getElementById("equipoForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var selectTipo = document.getElementById("tipoEquipo");
    var nuevoTipo = document.getElementById("nuevoTipoInput");
    if (selectTipo.value === "otro" && nuevoTipo.value) {
      nuevoTipo.setAttribute("name", "tipoEquipo")
      selectTipo.value = nuevoTipo.value;
    }

    var selectMarca = document.getElementById("marca");
    var nuevaMarca = document.getElementById("nuevaMarcaInput");
    if (selectMarca.value === "otra" && nuevaMarca.value) {
      nuevaMarca.setAttribute("name", "marca")
      selectMarca.value = nuevaMarca.value;
    }

    var selectModelo = document.getElementById("modelo");
    var nuevoModelo = document.getElementById("nuevoModeloInput");
    if (selectModelo.value === "otro" && nuevoModelo.value) {
      nuevoModelo.setAttribute("name", "modelo")
      selectModelo.value = nuevoModelo.value;
    }

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
          fetch("/api/equipos/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
          })
            .then(response => {
              if (!response.ok) {
                throw new Error("Error al querer crear");
              }
              return response.json();
            })
            .then(data => {
              Swal.fire({
                title: 'Creado exitosamente',
                icon: 'success'
              }).then(() => {
                window.location.reload();
              });
            })
            .catch(error => {
              Swal.fire({
                title: 'Error',
                text: 'Error al querer crear',
                icon: 'error'
              });
            });
        } else {
          form.reset();
          Swal.fire('Crear nuevo cancelado', '', 'info');
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

  const selectTipoEquipo = document.getElementById("tipoEquipo");
  const selectMarca = document.getElementById("marca");
  const selectModelo = document.getElementById("modelo");

  function validarSelect(select) {
    if (select.checkValidity()) {
      select.classList.remove("is-invalid");
      select.classList.add("is-valid");
    } else {
      select.classList.remove("is-valid");
      select.classList.add("is-invalid");
    }
  }

  selectTipoEquipo.addEventListener("change", function () {
    validarSelect(selectTipoEquipo);
  });

  selectMarca.addEventListener("change", function () {
    validarSelect(selectMarca);
  });

  selectModelo.addEventListener("change", function () {
    validarSelect(selectModelo);
  });
});