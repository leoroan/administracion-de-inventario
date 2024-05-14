import CustomRouter from "./custom/custom.router.js";
import {} from "../controllers/equipoInformatico.controller.js";


export default class equiposInformaticosExtendRouter extends CustomRouter {
  init() {

    // Get all 
    this.get('/equipos', ["PUBLIC"], async (req, res) => {
      // getAllProductsController(req, res)
      try {
        // Obtenemos la lista de usuarios de la base de datos
        // const usuarios = await Usuario.findAll();
        throw new Error("Error al obtener la lista de usuarios");
    
        // Enviamos una respuesta de éxito con los datos de los usuarios
        res.sendSuccess(usuarios);
      } catch (error) {
        // Analizar el tipo de error y llamar al método de respuesta adecuado
        if (error.statusCode === 401) {
          // Error de autenticación
          res.sendUnauthorizedError(error);
        } else if (error.statusCode === 403) {
          // Error de autorización
          res.sendForbiddenError(error);
        } else if (error.statusCode >= 400 && error.statusCode < 500) {
          // Error del cliente (rango 400)
          res.sendClientError(error);
        } else {
          // Error interno del servidor (rango 500)
          res.sendInternalServerError(error);
        }
      }
    });

    // // Obtener por ID
    // this.get('/:id', ["PUBLIC"], async (req, res) => {
    //   // getProductByIdController(req, res)
    // });

    // // Crear un nuevo producto
    // this.post('/', ["ADMIN", "PREMIUM"], async (req, res) => {
    //   // createProductController(req, res)
    // });

    // // Actualizar por ID
    // this.put('/:id', ["ADMIN", "PREMIUM"], verificarPropietarioMiddleware, async (req, res) => {
    //   // updateProductController(req, res)
    // });

    // // Eliminar  por ID
    // this.delete('/:id', ["ADMIN", "PREMIUM"], verificarPropietarioMiddleware, async (req, res) => {
    //   // deleteProductController(req, res)
    // });

  }
}