import { equipoInformaticoService, empleadoService, lugarService, oficinaService, marcaEquipoService, modeloEquipoService, tipoEquipoService } from "../services/repository/services.js";
import CustomRouter from "./custom/custom.router.js";

export default class viewsRouter extends CustomRouter {
  init() {
    this.get('/', ["PUBLIC"], async (req, res) => {
      res.render("index", {
        fileFavicon: "favicon.ico",
        fileCss: "styles.css",
        fileJs: "scripts.js",
        title: "Inventario MT",
        currentPath: req.path
        // user: req.session.user || req.user,
      });
    });

    this.get('/main/inventory', ["PUBLIC"], async (req, res) => {
      const estado = req.query.estado || 'asignado';
      const equiposInformaticos = await equipoInformaticoService.getAllEquipoInformaticos();
      const marcas = await marcaEquipoService.getAllMarcaEquipos();
      const tipos = await tipoEquipoService.getAllTipoEquipos();
      res.render("inventario", {
        fileFavicon: "favicon.ico",
        fileCss: "styles.css",
        fileJs: "inventario.view.js",
        title: "Inventario MT - equipos",
        equiposInformaticos: equiposInformaticos,
        currentPath: req.path,
        estado: estado,
        marcas: marcas,
        tipos: tipos,
        rol: "admin"
        // user: req.session.user || req.user,
        // user: req.session.user || req.user,
      });
    });

    this.get('/main/inventory/:equipoId', ["PUBLIC"], async (req, res) => {
      const equipo = await equipoInformaticoService.getEquipoInformaticoById(req.params.equipoId);
      const equipoEmpleado = equipo.dataValues.Empleado;
      const equipoMantenimiento = equipo.dataValues.MantenimientoDeEquipos;
      res.render("inventario_detalle", {
        fileFavicon: "favicon.ico",
        fileCss: "styles.css",
        fileJs: "inventory_detail.view.js",
        title: "Inventario MT - equipos",
        currentPath: req.path,
        datosEquipo: equipo.dataValues,
        equipoEmpleado: equipoEmpleado,
        equipoMantenimiento: equipoMantenimiento,
        rol: "admin"
        // user: req.session.user || req.user,
        // user: req.session.user || req.user,
      });
    });

    this.get('/main/employees', ["PUBLIC"], async (req, res) => {
      const empleados = await empleadoService.getAllEmpleados();
      res.render("empleados", {
        fileFavicon: "favicon.ico",
        fileCss: "styles.css",
        fileJs: "empleados.view.js",
        title: "Inventario MT - empleados",
        empleados: empleados,
        currentPath: req.path,
        rol: "admin"
        // user: req.session.user || req.user,
      });
    });
    this.get('/main/employees/:empleadoId', ["PUBLIC"], async (req, res) => {
      const empleado = await empleadoService.getEmpleadoById(req.params.empleadoId);
      const empleadoEquipos = empleado.dataValues.EquipoInformaticos;
      res.render("empleados_detalle", {
        fileFavicon: "favicon.ico",
        fileCss: "styles.css",
        fileJs: "empleado_detail.view.js",
        title: "Inventario MT - empleados",
        datosEmpleados: empleado.dataValues,
        datosEquipos: empleadoEquipos,
        currentPath: req.path,
        rol: "admin"
        // user: req.session.user || req.user,
      });
    });

    this.get('/main/offices', ["PUBLIC"], async (req, res) => {
      const oficinas = await oficinaService.getAllOficinas();
      res.render("oficinas", {
        fileFavicon: "favicon.ico",
        fileCss: "styles.css",
        fileJs: "oficinas.view.js",
        title: "Inventario MT - oficinas",
        oficinas: oficinas,
        currentPath: req.path,
        rol: "admin"
        // user: req.session.user || req.user,
      });
    });

    this.get('/main/offices/:oficinaId', ["PUBLIC"], async (req, res) => {
      const oficina = await oficinaService.getOficinaById(req.params.oficinaId);
      const oficinaEmpleados = oficina.dataValues.Empleados;
      const oficinaEquipos = oficina.dataValues.EquipoInformaticos;
      const oficinaDependecias = oficina.dataValues.Dependencias;
      console.log(oficinaDependecias);
      res.render("oficinas_detalle", {
        fileFavicon: "favicon.ico",
        fileCss: "styles.css",
        fileJs: "oficinas.view.js",
        title: "Inventario MT - oficinas",
        datosOficina: oficina.dataValues,
        oficinaEmpleados: oficinaEmpleados,
        oficinaEquipos: oficinaEquipos,
        oficinaDependecias: oficinaDependecias,
        currentPath: req.path,
        rol: "admin"
        // user: req.session.user || req.user,
      });
    });

    this.get('/main/places', ["PUBLIC"], async (req, res) => {
      const lugares = await lugarService.getAllLugares();
      res.render("lugares", {
        fileFavicon: "favicon.ico",
        fileCss: "styles.css",
        // fileJs: "lugares.view.js",
        title: "Inventario MT - edificios",
        lugares: lugares,
        currentPath: req.path,
        rol: "admin"
        // user: req.session.user || req.user,
      });
    });

    this.get('/main/places/:id', ["PUBLIC"], async (req, res) => {
      const lugarId = req.params.id;
      const lugar = await lugarService.getLugarById(lugarId);
      res.render("lugares2", {
        fileFavicon: "favicon.ico",
        fileCss: "styles.css",
        // fileJs: "empleados.view.js",
        title: "Inventario MT - oficinas",
        oficinas: lugar.dataValues.Oficinas,
        currentPath: req.path,
        rol: "admin"
        // user: req.session.user || req.user,
      });
    });

    this.get('*', ["PUBLIC"], async (req, res) => {
      req.logger.error('error 404 - PAGE NOT FOUND')
      res.status(404).render("error404");
    });
  }
}