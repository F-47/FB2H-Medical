import { accountsAPI } from "./axios";

export type BaseUser = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: "patient" | "doctor";
};

export type Doctor = BaseUser & {
  role: "doctor";
};

export type Patient = BaseUser & {
  role: "patient";
};

export async function register(data: BaseUser) {
  const res = await accountsAPI.post("/register/", data);
  return res.data;
}

export type LoginData = {
  email: string;
  password: string;
};

export type LoginResponse = {
  access: string;
  role: "patient" | "doctor";
};

export async function login(data: LoginData): Promise<LoginResponse> {
  const res = await accountsAPI.post("/token/", data);
  return res.data;
}

export type AuthData = LoginResponse;

export function setAuth(auth: AuthData) {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", JSON.stringify(auth));
  }
}

export function getAuth(): AuthData | null {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem("token");
  if (!data) return null;

  try {
    return JSON.parse(data) as AuthData;
  } catch {
    localStorage.removeItem("token");
    return null;
  }
}

export function getToken(): string | null {
  return getAuth()?.access ?? null;
}

export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    window.location.href = "/auth/login";
  }
}
