import { equipoInformaticoService, empleadoService, lugarService } from "../services/repository/services.js";
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
      res.render("inventario", {
        fileFavicon: "favicon.ico",
        fileCss: "styles.css",
        fileJs: "inventario.view.js",
        title: "Inventario MT - main",
        equiposInformaticos: equiposInformaticos,
        currentPath: req.path,
        estado: estado
        // user: req.session.user || req.user,
      });
    });

    this.get('/main/employees', ["PUBLIC"], async (req, res) => {
      const empleados = await empleadoService.getAllEmpleados();
      res.render("empleados", {
        fileFavicon: "favicon.ico",
        fileCss: "styles.css",
        fileJs: "empleados.view.js",
        title: "Inventario MT - main",
        empleados: empleados,
        currentPath: req.path
        // user: req.session.user || req.user,
      });
    });

    this.get('/main/places', ["PUBLIC"], async (req, res) => {
      const lugares = await lugarService.getAllLugares();
      res.render("lugares", {
        fileFavicon: "favicon.ico",
        fileCss: "styles.css",
        fileJs: "empleados.view.js",
        title: "Inventario MT - main",
        lugares: lugares,
        currentPath: req.path
        // user: req.session.user || req.user,
      });
    });

    this.get('/main/places/:id', ["PUBLIC"], async (req, res) => {
      const lugarId = req.params.id
      const lugar = await lugarService.getLugarById(lugarId);
      const totalOficinas = lugar.dataValues.Oficinas.length
      console.log(lugar.dataValues.Oficinas)
      res.render("oficinas", {
        fileFavicon: "favicon.ico",
        fileCss: "styles.css",
        fileJs: "empleados.view.js",
        title: "Inventario MT - main",
        oficinas: lugar.dataValues.Oficinas,
        totalOficinas: totalOficinas,
        currentPath: req.path
        // user: req.session.user || req.user,
      });
    });

    this.get('*', ["PUBLIC"], async (req, res) => {
      req.logger.error('error 404 - PAGE NOT FOUND')
      res.status(404).render("error404");
    });
  }
}