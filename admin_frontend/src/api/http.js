const BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080";

export function getToken(){ return localStorage.getItem("token") || ""; }

async function request(path, { method="GET", body, auth=false } = {}) {
  const headers = { "Content-Type":"application/json" };
  if (auth) {
    const t = getToken();
    if (t) headers.Authorization = `Bearer ${t}`;
  }
  const res = await fetch(`${BASE}${path}`, {
    method, headers, body: body ? JSON.stringify(body) : undefined
  });
  if (!res.ok) {
    let msg = `${res.status} ${res.statusText}`;
    try { msg += " — " + (await res.text()); } catch {}
    throw new Error(msg);
  }
  if (res.status === 204) return null;
  try { return await res.json(); } catch { return null; }
}

export const http = {
  get: (p, o)=>request(p, { ...o, method:"GET" }),
  post: (p, b, o)=>request(p, { ...o, method:"POST", body:b }),
  put: (p, b, o)=>request(p, { ...o, method:"PUT", body:b }),
  patch: (p, b, o)=>request(p, { ...o, method:"PATCH", body:b }),
  del: (p, o)=>request(p, { ...o, method:"DELETE" })
};
