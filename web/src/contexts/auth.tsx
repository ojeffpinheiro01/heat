import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

type AuthProvider = {
  children: ReactNode;
};

type User = {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
};

type AuthResponse = {
  token: string;
  user: User;
};

type AuthContextData = {
  user: User | null;
  signInUrl: string;
  signOut: () => void;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider(props: AuthProvider) {
  const [user, setUser] = useState<User | null>(null);

  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=d88d8d989f2828867204`;

  async function signIn(code: string) {
    const res = await api.post<AuthResponse>("authenticate", { code });
    const { token, user } = res.data;

    localStorage.setItem("@dowhile:token", token);
    api.defaults.headers.common.authorization = `Bearer ${token}`;
    setUser(user);
  }

  async function signOut(){
    setUser(null)
    localStorage.removeItem('@dowhile:token')
  }

  useEffect(() => {
    const url = window.location.href;
    const hasGithubCode = url.includes("?code=");

    if (hasGithubCode) {
      const [urlWithoutGithubCode, code] = url.split("?code=");
      window.history.pushState({}, "", urlWithoutGithubCode);

      signIn(code);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("@dowhile:token");

    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;

      api.get<User>("profile").then((res) => {
        setUser(res.data);
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signInUrl, user, signOut }}>
      {props.children}
    </AuthContext.Provider>
  );
}
