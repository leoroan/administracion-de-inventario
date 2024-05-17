import Handlebars from "handlebars";

// Ayudante para formatear la fecha
Handlebars.registerHelper('formatDate', function (dateString) {
  var date = new Date(dateString);
  return date.toLocaleDateString();
});

Handlebars.registerHelper('checkIfDataIsNull', function (data) {
  return data === null ? 'sin datos' : data;
});

Handlebars.registerHelper('filter', function(array, criteria) {
  return array.filter(function(item) {
    // Aquí puedes definir tus criterios de filtrado
    return item.propiedad === criteria;
  });
});

export default Handlebars;