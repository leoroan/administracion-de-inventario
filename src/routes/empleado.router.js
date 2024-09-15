import CustomRouter from "../routes/custom/custom.router.js";
import passport from "passport";
import {
  create,
  findAll,
  findById,
  updateUser,
  deleteUser,
  getByEmailORusername
} from "../controllers/empleado.controller.js";

export default class EmpleadoExtendRouter extends CustomRouter {
  /**
   * api:/api/empleados
   */
  init() {     // this.get('/:id', ['ADMIN', 'SUPERVISOR'], passport.authenticate('jwt'), async (req, res) => {

    this.post('/', ['PUBLIC'], async (req, res) => {
      create(req, res);
    });

    this.get('/:id', ['PUBLIC'], async (req, res) => {
      findById(req, res);
    });

    this.get('/', ['PUBLIC'], async (req, res) => {
      findAll(req, res);
    });

    this.get('/emailOrUsername/:some', ['PUBLIC'], async (req, res) => {
      getByEmailORusername(req, res);
    });

    this.put('/:id', ['PUBLIC'], async (req, res) => {
      updateUser(req, res);
    });

    this.delete('/:id', ['PUBLIC'], async (req, res) => {
      deleteUser(req, res);
    });

    //     this.get('/:username', ['INSPECTOR', 'ADMIN', 'SUPERVISOR'], async (req, res) => {
    //       getUserByUsername(req, res);
    //     });

    //     /**
    //      * acepta tipos de estado por req.query.estado ('PENDIENTE', 'COMPLETA', 'FIRMADA')
    //      * el Id del usuario lo recibe del token jwt
    //      */
    //     this.get('/usuario/ordenes', ['INSPECTOR', 'ADMIN', 'SUPERVISOR'], passport.authenticate('jwt', { failureRedirect: '/session/fail' }), async (req, res) => {
    //       getOrdenesDelUsuarioPorEstado(req, res);
    //     });

    //     /**
    //      * Acepta tipos de estado por req.query.estado ('PENDIENTE', 'COMPLETA', 'FIRMADA') y tipos de actas por req.query.tipoActa:
    //      * ActaCalibracion
    //      * ActaConstatacion
    //      * ActaDestruccionObleas
    //      * ActaInspeccion
    //      * ActaRequerimiento
    //      * 
    //      * el Id del usuario lo recibe del token jwt
    //     */
    //     this.get('/usuario/actas', ['INSPECTOR', 'ADMIN', 'SUPERVISOR'], passport.authenticate('jwt', { failureRedirect: '/session/fail' }), async (req, res) => {
    //       getActasDelUsuarioPorEstado(req, res);
    //     });

    //     /**
    //      *  Obtiene las actas del usuario ordenadas por fecha de creacion de forma descendente
    //      *  el Id del usuario lo recibe del token jwt
    //      */
    //     this.get('/usuario/actas-full', ['INSPECTOR', 'ADMIN', 'SUPERVISOR'], passport.authenticate('jwt', { failureRedirect: '/session/fail' }), async (req, res) => {
    //       obtenerTodasLasActasDelUsuarioOrdenadasPorFecha(req, res);
    //     });

    //     /**
    //      * getAll() del usuario actual
    //      * acepta como req.query : page y pageSize para el manjeo de la paginacion
    //      */
    //     this.get('/usuario/todo', ['INSPECTOR', 'ADMIN', 'SUPERVISOR'], passport.authenticate('jwt', { failureRedirect: '/session/fail' }), async (req, res) => {
    //       getAllFromUser(req, res);
    //     });

    //     /**
    //      * getAll de todos los users
    //      * acepta como req.query : page y pageSize para el manjeo de la paginacion
    //      */
    //     this.get('/usuarios/todos', ['ADMIN', 'SUPERVISOR'], passport.authenticate('jwt', { failureRedirect: '/session/fail' }), async (req, res) => {
    //       getAllFromAll(req, res);
    //     });

    //     /**
    //      *  ToDo
    //      */
    //     // this.get('/usuario/actas-full', ['ADMIN', 'SUPERVISOR'], passport.authenticate('jwt', { failureRedirect: '/session/fail' }), async (req, res) => {
    //     //   obtenerTodasLasActasOrdenadasPorFecha(req, res);
    //     // });


  }
}