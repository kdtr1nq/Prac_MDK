import { useEffect, useState } from "react";
import { myOrders } from "../api/orders";

export default function Orders(){
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");

  useEffect(()=>{ myOrders().then(setItems).catch(e=>setErr(e.message)); }, []);
  const total = (o)=> (o.items||[]).reduce((s,i)=>s + i.price*i.qty, 0).toFixed(2);

  return (
    <div className="grid">
      <h2>Мои заказы</h2>
      {err && <div className="small" style={{color:"salmon"}}>{err}</div>}
      {items.length===0 ? <div className="card-ghost">Заказов пока нет</div> : (
        <table className="table">
          <thead><tr><th>ID</th><th>Дата</th><th>Оплата</th><th>Позиций</th><th>Сумма</th></tr></thead>
          <tbody>
            {items.map(o=>(
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.createdAt}</td>
                <td>{o.paymentMethod}</td>
                <td>{o.items?.length||0}</td>
                <td>{total(o)} ₽</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
