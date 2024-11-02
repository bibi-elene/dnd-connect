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
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("/auth/me")
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Invalid token", error);
          localStorage.removeItem("token");
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post("/auth/login", { username, password });
      localStorage.setItem("token", response.data.access_token);
      // Decode token to get user info
      const payload = JSON.parse(
        atob(response.data.access_token.split(".")[1])
      );
      setUser({
        id: payload.sub,
        username: payload.username,
        role: payload.role,
      });
      router.push("/dashboard");
    } catch (error) {
      throw error;
    }
  };

  const register = async (username: string, password: string) => {
    try {
      await axios.post("/auth/register", {
        username,
        password,
        role: "user",
      });
      router.push("/auth/login");
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
