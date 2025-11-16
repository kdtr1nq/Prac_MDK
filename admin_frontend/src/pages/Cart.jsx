import { useEffect, useState } from "react";
import { getCart, setQty, delItem, clearCart } from "../api/orders";
import { useNavigate } from "react-router-dom";

export default function Cart(){
  const [cart, setCart] = useState({ items:[] });
  const [err, setErr] = useState("");
  const nav = useNavigate();

  function sum(c){ return (c.items||[]).reduce((s,i)=>s + i.price*i.qty, 0).toFixed(2); }

  async function load(){
    try { setCart(await getCart() || {items:[]}); }
    catch(e){ setErr(e.message); }
  }
  useEffect(()=>{ load(); }, []);

  async function changeQty(itemId, qty){ await setQty(itemId, qty); load(); }
  async function remove(itemId){ await delItem(itemId); load(); }
  async function clear(){ await clearCart(); load(); }

  return (
    <div className="grid">
      <div className="row spread">
        <h2>Корзина</h2>
        <div className="row">
          <button className="btn" onClick={clear} disabled={(cart.items||[]).length===0}>Очистить</button>
          <button className="btn primary" onClick={()=>nav("/checkout")} disabled={(cart.items||[]).length===0}>Оформить</button>
        </div>
      </div>
      {err && <div className="small" style={{color:"salmon"}}>{err}</div>}
      {(cart.items||[]).length===0 ? (
        <div className="card-ghost">Корзина пуста</div>
      ) : (
        <table className="table">
          <thead><tr><th>Блюдо</th><th>Цена</th><th>Кол-во</th><th>Итого</th><th/></tr></thead>
          <tbody>
            {cart.items.map(it=>(
              <tr key={it.id}>
                <td>{it.name}</td>
                <td>{it.price}</td>
                <td>
                  <input className="input" style={{width:90}} type="number" min="1" value={it.qty}
                         onChange={e=>changeQty(it.id, Number(e.target.value))}/>
                </td>
                <td>{(it.price*it.qty).toFixed(2)}</td>
                <td style={{textAlign:"right"}}><button className="btn danger" onClick={()=>remove(it.id)}>Удалить</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="kpi">
        <div className="chip"><div className="small">Сумма заказа</div><div className="price">{sum(cart)} ₽</div></div>
      </div>
    </div>
  );
}
