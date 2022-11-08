import { Directus } from "@directus/sdk";

export const directus = new Directus("https://q4vuzuzc.directus.app", {
    auth: {
        mode: "json"
    }
});

export const authService = {
    async login(email: string, password: string) {
      return await directus.auth.login({ email, password });
    },
    async logout() {
      return await directus.auth.logout();
    },
    async currentUser() {
      return await directus.users.me.read({
          fields: ['email', 'first_name']
      });
    },
    async register(firstName: string, email: string, password: string): Promise<boolean> {
      const createUserResult = await directus.users.createOne({
        first_name: firstName,
        email,
        password,
        role: "5ce5d2c5-d248-45f9-b05c-d0a014cf5dd5"
      });
    
      return !!createUserResult?.email;
    
    }
  };