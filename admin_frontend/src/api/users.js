import { http } from "./http";

export function register({ email, password, fullName }) {
  return http.post("/api/users/register", { email, password, fullName });
}

export async function login({ email, password }) {
  const data = await http.post("/api/users/login", { email, password });
  localStorage.setItem("token", data.token);
  return data;
}

export function me(){ return http.get("/api/users/me", { auth:true }); }
