import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/users";
import { useAuth } from "../auth/AuthContext.jsx";

export default function Login(){
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("123");
  const [fullName, setFullName] = useState("Admin");
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [err, setErr] = useState("");
  const nav = useNavigate();
  const { signin } = useAuth();

  async function submit(e){
    e.preventDefault();
    setErr("");
    try {
      if (mode === "register") {
        await register({ email, password, fullName });
      }
      await signin(email, password);
      nav("/");
    } catch (e) {
      setErr("Ошибка: " + e.message);
    }
  }

  return (
    <div className="card" style={{maxWidth:380, margin:"40px auto"}}>
      <h3>{mode==="login" ? "Вход" : "Регистрация"}</h3>
      <form onSubmit={submit} className="grid">
        {mode==="register" && (
          <input placeholder="Имя" value={fullName} onChange={e=>setFullName(e.target.value)} required/>
        )}
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required/>
        <input placeholder="Пароль" type="password" value={password} onChange={e=>setPassword(e.target.value)} required/>
        {err && <div style={{color:"crimson"}}>{err}</div>}
        <button>{mode==="login" ? "Войти" : "Зарегистрироваться"}</button>
      </form>
      <div style={{marginTop:10}}>
        {mode==="login" ? (
          <button onClick={()=>setMode("register")}>Нет аккаунта? Регистрация</button>
        ) : (
          <button onClick={()=>setMode("login")}>У меня уже есть аккаунт</button>
        )}
      </div>
    </div>
  );
}
