import { useEffect, useState } from "react";
import { listDishes } from "../api/catalog";
import { addItem } from "../api/orders";
import { useAuth } from "../auth/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Catalog(){
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");
  const { token } = useAuth();
  const nav = useNavigate();

  useEffect(()=>{ listDishes().then(setItems).catch(e=>setErr(e.message)); }, []);

  async function addToCart(dishId){
    if(!token){ nav("/login"); return; }
    try { await addItem(dishId, 1); }
    catch (e) { alert("Ошибка: " + e.message); }
  }

  return (
    <div className="grid">
      <div className="row spread">
        <h2>Каталог</h2>
        <div className="row">
          <span className="tag">Всего: {items.length}</span>
        </div>
      </div>

      {err && <div className="small" style={{color:"salmon"}}>{err}</div>}

      <div className="cards">
        {items.map(d => (
          <div key={d.id} className="card">
            <div className="row spread">
              <div style={{fontWeight:700}}>{d.name}</div>
              <span className="price">{d.price} ₽</span>
            </div>
            <div className="small" style={{marginTop:4}}>{d.category || "—"}</div>
            <div className="row" style={{marginTop:12}}>
              <button className="btn primary" onClick={()=>addToCart(d.id)}>В корзину</button>
              <button className="btn">Подробнее</button>
            </div>
          </div>
        ))}
        {!items.length && (
          <div className="card-ghost">Нет блюд. Зайдите как админ и добавьте первое блюдо.</div>
        )}
      </div>
    </div>
  );
}
