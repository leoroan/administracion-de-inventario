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
      res.render("inventario", {
        fileFavicon: "favicon.ico",
        fileCss: "styles.css",
        fileJs: "inventario.view.js",
        title: "Inventario MT - main",
        // user: req.session.user || req.user,
      });
    });

    this.get('*', ["PUBLIC"], async (req, res) => {
      req.logger.error('error 404 - PAGE NOT FOUND')
      res.status(404).render("error404");
    });
  }
}