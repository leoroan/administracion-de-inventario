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