import { PERMISSIONS } from "./permissions.enum";

export class PermissionChecker {
  constructor() {}

  has_permission(role_name: string, permission_name: string) {
    let role = PERMISSIONS.filter((r) => r.role_name == role_name)[0];

    // if (role) {
    //     let permissions = role[role_name];
    //     return permissions.includes(permission_name);
    // } else {
    //     return false;
    // }
  }
}
