"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import axios from "../utils/axios";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  username: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    axios
      .get("/auth/me") // Ensure cookies are sent
      .then((response) => {
        setUser(response.data); // Backend should return user info in `/auth/me`
      })
      .catch((error) => {
        console.error("Failed to fetch user info", error);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (username: string, password: string) => {
    try {
      await axios.post("/auth/login", { username, password }); // Login sets the cookie

      // Fetch user info after login
      const response = await axios.get("/auth/me", { withCredentials: true });
      setUser(response.data);

      router.push("/dashboard");
    } catch (error) {
      console.error("Login error", error);
      throw error;
    }
  };

  const register = async (username: string, password: string) => {
    try {
      await axios.post("/auth/register", { username, password });
      router.push("/auth/login");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(
        "Registration error:",
        error.response?.data || error.message
      );
      throw new Error(error.response?.data?.message || "Registration failed.");
    }
  };

  const logout = async () => {
    try {
      await axios.post("/auth/logout", {}, { withCredentials: true });
      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
