export const rolesPermisos = {
  ADMIN: ["*"], // acceso total

  DIRECTOR: [
    { resource: "usuario", actions: ["read", "update"] },
    { resource: "log", actions: ["read"] },
  ],

  ADMINISTRATIVO: [
    { resource: "usuario", actions: ["read"] },
    { resource: "session", actions: ["create.register"] },
  ],
};
