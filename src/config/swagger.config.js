import swaggerJsdoc from "swagger-jsdoc";
import { user } from "../services/db/models/schemas/user.schema.js";

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'ActasWeb: Documentacion de las APIs',
      version: '1.0.0',
      description: 'Documentacion de las APIs implementadas en el sistema de Actas Web para la VTV',
    },
    components: {
      schemas: {
        user,
        // Aca puedo agregar más modelos 
      },
    },
  },
  apis: [`./src/routes/*.js`]
};
const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;