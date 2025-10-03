
import { models } from "../../config/db/sequelize.config.js";
import usuarioScope from "./usuario.scope.js";
import oficinaScope from "./oficina.scope.js";
import edificioScope from "./edificio.scope.js";
import equipoInformaticoScope from "./equipoInformatico.scope.js";
import registroMantenimientoScope from "./registroMantenimiento.scope.js";
import marcaScope from "./marca.scope.js";
import modeloScope from "./modelo.scope.js";
import tipoEquipoScope from "./tipoEquipo.scope.js";

export default function initScopes() {
  //scopes de usuario
  models.Usuario.addScope('defaultScope', usuarioScope.defaultScope, { override: true });
  models.Usuario.addScope('loginScope', usuarioScope.loginScope);
  models.Usuario.addScope('withPermisosScope', usuarioScope.withPermisosScope);
  models.Usuario.addScope('withRolScope', usuarioScope.withRolScope);

  //scopes de oficina
  models.Oficina.addScope('defaultScope', oficinaScope.defaultScope, { override: true });
  models.Oficina.addScope('withEmpleadosScope', oficinaScope.withEmpleadosScope);
  models.Oficina.addScope('withSubOficinaScope', oficinaScope.withSubOficinaScope);
  models.Oficina.addScope('withEdificioScope', oficinaScope.withEdificioScope);
  models.Oficina.addScope('withEquipoInformaticoScope', oficinaScope.withEquipoInformaticoScope);

  //scopes de edificio
  models.Edificio.addScope('defaultScope', edificioScope.defaultScope, { override: true });
  models.Edificio.addScope('withOficinas', edificioScope.withOficinasScope);

  //scopes de equipo informatico
  models.Equipoinformatico.addScope('defaultScope', equipoInformaticoScope.defaultScope, { override: true });
  models.Equipoinformatico.addScope('withOficinaScope', equipoInformaticoScope.withOficinaScope);
  models.Equipoinformatico.addScope('withUsuarioScope', equipoInformaticoScope.withUsuarioScope);
  models.Equipoinformatico.addScope('withRegistroMantenimientoScope', equipoInformaticoScope.withRegistroMantenimientoScope);
  models.Equipoinformatico.addScope('withTipoEquipoScope', equipoInformaticoScope.withTipoEquipoScope);

  //scopes de registro de mantenimiento
  models.Registromantenimiento.addScope('defaultScope', registroMantenimientoScope.defaultScope, { override: true });
  models.Registromantenimiento.addScope('withEquipoScope', registroMantenimientoScope.withEquipoScope);

  //scopes de marca
  models.Marca.addScope('defaultScope', marcaScope.defaultScope, { override: true });
  models.Marca.addScope('withModeloScope', marcaScope.withModeloScope);

  //scopes de modelo
  models.Modelo.addScope('defaultScope', modeloScope.defaultScope, { override: true });
  models.Modelo.addScope('withMarcaScope', modeloScope.withMarcaScope);
  models.Modelo.addScope('withTipoequipoScope', modeloScope.withTipoequipoScope);
  models.Modelo.addScope('withEquiposScope', modeloScope.withEquiposScope);

  //scopes de tipo de equipo
  models.Tipoequipo.addScope('defaultScope', tipoEquipoScope.defaultScope, { override: true });
  models.Tipoequipo.addScope('withModeloScope', tipoEquipoScope.withModeloScope);
  models.Tipoequipo.addScope('withEquiposScope', tipoEquipoScope.withEquiposScope);
}