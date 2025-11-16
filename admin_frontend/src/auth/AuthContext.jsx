import { createContext, useContext, useEffect, useState } from "react";
import { login as apiLogin, me } from "../api/users";

const Ctx = createContext(null);
export const useAuth = () => useContext(Ctx);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(!!token);

  useEffect(()=> {
    if (!token) { setProfile(null); setLoading(false); return; }
    me().then(setProfile).catch(()=>{ localStorage.removeItem("token"); setToken(""); setProfile(null); })
      .finally(()=>setLoading(false));
  }, [token]);

  async function signin(email, password){
    const { token } = await apiLogin({ email, password });
    setToken(token);
  }
  function signout(){
    localStorage.removeItem("token");
    setToken(""); setProfile(null);
  }

  return <Ctx.Provider value={{ token, profile, loading, signin, signout }}>{children}</Ctx.Provider>;
}
