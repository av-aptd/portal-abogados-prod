export const MenuLinks = [
  {
    name: "Panel",
    path: "/portal/clientes/panel",
    value: "panel",
    groups: ["Cliente"],
  },
  {
    name: "Mi caso",
    path: "/portal/clientes/caso",
    value: "caso",
    groups: ["Cliente"],
  },
  {
    name: "Pagos",
    path: "/portal/clientes/pagos",
    value: "pagos",
    groups: ["Cliente"],
  },
  {
    name: "Clientes",
    path: "/portal/aptd/clientes",
    value: "clientes",
    groups: ["Admin", "Super Admin"],
  },
  {
    name: "Usuarios",
    path: "/portal/aptd/usuarios",
    value: "usuarios",
    groups: ["Admin", "Super Admin"],
  },

  {
    name: "Leads",
    path: "/portal/aptd/comercial/leads",
    value: "leads",
    groups: ["Comercial", "Super Admin"],
  },
  {
    name: "Validar docs",
    path: "/portal/aptd/retencion/validar-documentacion",
    value: "validar-docs",
    groups: ["Retención", "Super Admin"],
  },
  {
    name: "Acreedores",
    path: "/portal/aptd/retencion/acreedores",
    value: "acreedores",
    groups: ["Retención", "Super Admin"],
  },
  {
    name: "Herramientas",
    path: "/portal/aptd/procesal/herramientas",
    value: "herramientas-procesal",
    groups: ["Procesal", "Super Admin"],
  },
  {
    name: "Notificaciones",
    path: "/portal/aptd/procesal/notificaciones",
    value: "notificaciones-procesal",
    groups: ["Procesal", "Super Admin"],
  },
  {
    name: "Generar docs",
    path: "/portal/aptd/procesal/documentacion",
    value: "documentacion-procesal",
    groups: ["Procesal", "Retención", "Super Admin"],
  },
  {
    name: "Marketing",
    path: "/portal/aptd/marketing",
    value: "marketing",
    groups: ["Marketing", "Super Admin"],
  },
  {
    name: "Contabilidad",
    path: "/portal/aptd/contabilidad/situacion-pagos",
    value: "contabilidad",
    groups: ["Contabilidad", "Super Admin"],
  },

  {
    name: "Admin",
    path: "/portal/aptd/admin",
    value: "admin",
    groups: [""],
  },
  {
    name: "Reportes",
    path: "/portal/aptd/reports",
    value: "reports",
    groups: ["Super Admin", "Admin", "Dirección"],
  },
  {
    name: "Planes",
    path: "/portal/aptd/planes",
    value: "planes",
    groups: [""],
  },
  {
    name: "Notificaciones",
    path: "/portal/aptd/notificaciones",
    value: "notificaciones",
    groups: [""],
  },
  {
    name: "Mailing",
    path: "/portal/aptd/mailing",
    value: "mailing",
    groups: ["Marketing"],
  },
  {
    name: "Transcripciones",
    path: "/portal/aptd/transcripciones",
    value: "transcripciones",
    groups: ["Dirección", "Comercial", "Retención"],
  },
  {
    name: "Admin",
    path: "/portal/aptd/admin/herramientas",
    value: "herramientas-admin",
    groups: ["Dirección", "Admin"],
  },
  {
    name: "Incidencias",
    path: "/portal/aptd/incidencias",
    value: "incidencias",
    groups: [
      "Retención",
      "Comercial",
      "Procesal",
      "Marketing",
      "Contabilidad",
      "Admin",
      "Super Admin",
    ],
  },
  {
    name: "Cambios portal",
    path: "/portal/aptd/mejoras/version/103",
    value: "changelog",
    groups: [
      "Retención",
      "Comercial",
      "Procesal",
      "Marketing",
      "Contabilidad",
      "Admin",
      "Super Admin",
    ],
  },
];

export const TenantURLs = [
  {
    tenantid: 1,
    urls: ["all"],
  },
  {
    tenantid: 2,
    urls: ["leads", "clientes", "panel", "caso", "pagos"],
  },
  {
    tenantid: 3,
    urls: ["leads", "clientes", "panel", "caso", "pagos"],
  },
  {
    tenantid: 4,
    urls: ["leads", "clientes", "panel", "caso", "pagos"],
  },
  {
    tenantid: 5,
    urls: ["leads", "clientes", "panel", "caso", "pagos"],
  },
  {
    tenantid: 6,
    urls: ["leads", "clientes", "panel", "caso", "pagos"],
  },
  {
    tenantid: 7,
    urls: ["leads", "clientes", "panel", "caso", "pagos"],
  },
];

export const TENANT_PERMISSIONS = [
  {
    tenantid: 1,
    permissions: ["all"],
    permissions_excluded: [],
  },
  {
    tenantid: 2,
    permissions: ["all"],
    permissions_excluded: [
      "PORTAL.CLIENTS.IMPERSONATE",
      "PORTAL.CLIENTS.PROCESS.CHANGE_PLAN",
      "PORTAL.CLIENTS.PAYMENTS.ADD",
      "PORTAL.CLIENTS.NOTIFICATIONS.SEND",
    ],
  },
  {
    tenantid: 3,
    permissions: ["all"],
    permissions_excluded: [
      "PORTAL.CLIENTS.IMPERSONATE",
      "PORTAL.CLIENTS.PROCESS.CHANGE_PLAN",
      "PORTAL.CLIENTS.PAYMENTS.ADD",
      "PORTAL.CLIENTS.NOTIFICATIONS.SEND",
    ],
  },
  {
    tenantid: 4,
    permissions: ["all"],
    permissions_excluded: [
      "PORTAL.CLIENTS.IMPERSONATE",
      "PORTAL.CLIENTS.PROCESS.CHANGE_PLAN",
      "PORTAL.CLIENTS.PAYMENTS.ADD",
      "PORTAL.CLIENTS.NOTIFICATIONS.SEND",
    ],
  },
  {
    tenantid: 5,
    permissions: ["all"],
    permissions_excluded: [
      "PORTAL.CLIENTS.IMPERSONATE",
      "PORTAL.CLIENTS.PROCESS.CHANGE_PLAN",
      "PORTAL.CLIENTS.PAYMENTS.ADD",
      "PORTAL.CLIENTS.NOTIFICATIONS.SEND",
    ],
  },
  {
    tenantid: 6,
    permissions: ["all"],
    permissions_excluded: [
      "PORTAL.CLIENTS.PROCESS.CHANGE_PLAN",
      "PORTAL.CLIENTS.PAYMENTS.ADD",
      "PORTAL.CLIENTS.NOTIFICATIONS.SEND",
    ],
  },
  {
    tenantid: 7,
    permissions: ["all"],
    permissions_excluded: [
      "PORTAL.CLIENTS.IMPERSONATE",
      "PORTAL.CLIENTS.PROCESS.CHANGE_PLAN",
      "PORTAL.CLIENTS.PAYMENTS.ADD",
      "PORTAL.CLIENTS.NOTIFICATIONS.SEND",
    ],
  },
];

export function getMenuUrls(tenantid: number) {
  const tenant = TenantURLs.find((t) => t.tenantid === tenantid);

  if (tenant?.urls.includes("all")) {
    return MenuLinks;
  } else {
    return MenuLinks.filter((link) => {
      return tenant?.urls.includes(link.value);
    });
  }
}

export function tenant_has_permission(
  permission_name: string,
  tenantid: number
) {
  const tenant_permission = TENANT_PERMISSIONS.find(
    (t) => t.tenantid === tenantid
  );
  if (
    tenant_permission?.permissions.includes("all") &&
    !tenant_permission?.permissions_excluded.includes(permission_name)
  ) {
    return true;
  }

  if (tenant_permission?.permissions.includes(permission_name)) {
    return true;
  }

  if (tenant_permission?.permissions_excluded.includes(permission_name)) {
    return false;
  }

  return false;
}

export const planCategories = ["LSO", "EXPRESS", "OTRO", "LSO-UF"];
export const planSubscriptionType = ["ONLINE", "BASIC", "PRO", "PREMIUM"];

export const isUserInGroup = ({ groupId, userGroups }: any) => {
  let isIn;
  isIn = userGroups.some((item: any) => item.groupId == groupId);
  return isIn;
};
