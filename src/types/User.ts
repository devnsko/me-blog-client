import AppUserRole from "./AppUserRole";

type User = {
  id?: number;
  username: string;
  email?: string;
  appUserRoles?: AppUserRole[];
};

export default User;