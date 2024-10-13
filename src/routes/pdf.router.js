import { generarAsignacionEquipo } from "../controllers/pdf.controller.js";
import CustomRouter from "../routes/custom/custom.router.js";
import passport from "passport";

export default class pdfExtendRouter extends CustomRouter {
  /**
   * api:/api/docs
   */
  init() {  

    this.get('/pdf/remito-entrega', [6], passport.authenticate('jwt'), async (req, res) => {
      generarAsignacionEquipo(req, res);
    });

  }
}