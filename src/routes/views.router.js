import { equipoInformaticoService, empleadoService } from "../services/repository/services.js";
import CustomRouter from "./custom/custom.router.js";

export default class viewsRouter extends CustomRouter {
  init() {
    this.get('/', ["PUBLIC"], async (req, res) => {
      res.render("index", {
        fileFavicon: "favicon.ico",
        fileCss: "styles.css",
        fileJs: "scripts.js",
        title: "Inventario MT",
        // user: req.session.user || req.user,
      });
    });

    this.get('/main/inventory', ["PUBLIC"], async (req, res) => {
      const equiposInformaticos = await equipoInformaticoService.getAllEquipoInformaticos();
      res.render("inventario", {
        fileFavicon: "favicon.ico",
        fileCss: "styles.css",
        fileJs: "inventario.view.js",
        title: "Inventario MT - main",
        equiposInformaticos: equiposInformaticos,
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
        // user: req.session.user || req.user,
      });
    });

    this.get('*', ["PUBLIC"], async (req, res) => {
      req.logger.error('error 404 - PAGE NOT FOUND')
      res.status(404).render("error404");
    });
  }
}