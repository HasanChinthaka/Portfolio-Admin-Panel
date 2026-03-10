import type { AuthProvider } from "@refinedev/core";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    try {
      const { data } = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("auth_user", JSON.stringify(data.user));
      return { success: true, redirectTo: "/" };
    } catch (error: any) {
      return {
        success: false,
        error: {
          name: "LoginError",
          message:
            error.response?.data?.message ||
            "Invalid credentials or insufficient role",
        },
      };
    }
  },

  logout: async () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    return { success: true, redirectTo: "/login" };
  },

  check: async () => {
    const token = localStorage.getItem("auth_token");
    if (token) return { authenticated: true };
    return { authenticated: false, redirectTo: "/login" };
  },

  getIdentity: async () => {
    const user = localStorage.getItem("auth_user");
    if (user) return JSON.parse(user);
    return null;
  },

  onError: async (error) => {
    if (error?.statusCode === 401) {
      return { logout: true, redirectTo: "/login" };
    }
    return { error };
  },
};
