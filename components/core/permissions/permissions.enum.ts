export const PERMISSIONS = [
  { role_name: "Admin", Permissions: ["ANY"] },
  { role_name: "Client", Permissions: ["ANY"] },
  {
    role_name: "ColaboratorRE",
    Permissions: [
      "Leads.list",
      "Leads.create",
      "Leads.edit",

      "Clients.list",
      "Clients.changeEmail",
      "Clients.edit",

      "Processes.documents.approve",
      "Processes.documents.reject",
      "Processes.documents.list",
      "Processes.documents.add",
      "Processes.documents.delete",
      "Processes.payments.list",
      "Processes.payments.payment-link",
      "Processes.participants.list",
      "Processes.prices.list",
    ],
  },
  {
    role_name: "ColaboratorComercial",
    Permissions: [
      "Leads.list",
      "Leads.create",
      "Leads.edit",

      "Clients.list",
      "Clients.changeEmail",
      "Clients.edit",

      "Processes.documents.list",
      "Processes.documents.add",
      "Processes.documents.delete",
      "Processes.payments.list",
      "Processes.payments.payment-link",
      "Processes.participants.list",
      "Processes.prices.list",
    ],
  },
];
