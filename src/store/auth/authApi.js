import paths from "../../core/paths";

class authApi {
  authPath = paths.auth.base;
  adminPath = paths.auth.admin;

  isAdmin = async () => {
    const response = await fetch(
      import.meta.env.VITE_APP_API + "/" + this.authPath + "/" + this.adminPath
    );

    return response;
  };
}

export default authApi;
