import Handlebars from "handlebars";

// Ayudante para formatear la fecha
Handlebars.registerHelper('formatDate', function (dateString) {
  var date = new Date(dateString);
  return date.toLocaleDateString();
});

Handlebars.registerHelper('checkIfDataIsNull', function (data) {
  return data === null ? 'sin datos' : data;
});

// Ayudante para verificar si dos valores son iguales
Handlebars.registerHelper('eq', function (a, b) {
  return a === b;
});

Handlebars.registerHelper('count', function(array) {
  return array.length;
});

export default Handlebars;