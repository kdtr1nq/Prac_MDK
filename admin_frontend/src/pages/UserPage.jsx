import { useEffect, useState } from "react";
import { activeOrder, myOrders } from "../api/orders";
import { useNavigate } from "react-router-dom";

export default function UserPage(){
  const [act, setAct] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  function total(o){ return (o.items||[]).reduce((s,i)=>s + i.price*i.qty, 0).toFixed(2); }

  async function load(){
    setLoading(true);
    try {
      const [a, h] = await Promise.allSettled([activeOrder(), myOrders()]);
      if (a.status==="fulfilled") setAct(a.value || null);
      if (h.status==="fulfilled") setHistory(h.value || []);
    } finally { setLoading(false); }
  }
  useEffect(()=>{ load(); }, []);

  return (
    <div className="grid">
      <h2>Моя страница</h2>
      <div style={{display:"flex", gap:12}}>
        <button onClick={()=>nav("/cart")}>Перейти в корзину</button>
        <button onClick={load}>Обновить</button>
      </div>

      {loading && <div>Загрузка…</div>}

      <section className="card">
        <h3 style={{marginTop:0}}>Текущий заказ</h3>
        {!act && <div>Активного заказа нет.</div>}
        {act && (
          <>
            <div style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, marginBottom:8}}>
              <div><b>ID:</b> {act.id}</div>
              <div><b>Статус:</b> {act.status}</div>
              <div><b>Оплата:</b> {act.paymentMethod}</div>
              <div><b>Сумма:</b> {total(act)} ₽</div>
              <div><b>Дата:</b> {act.createdAt}</div>
              <div><b>Адрес:</b> {act.address || "—"}</div>
            </div>
            <table>
              <thead><tr><th>Блюдо</th><th>Цена</th><th>Кол-во</th><th>Итого</th></tr></thead>
              <tbody>
                {act.items?.map((i,idx)=>(
                  <tr key={idx}>
                    <td>{i.name}</td><td>{i.price}</td><td>{i.qty}</td><td>{(i.price*i.qty).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </section>

      <section className="card">
        <h3 style={{marginTop:0}}>История заказов</h3>
        {history.length===0 ? <div>Пока нет заказов.</div> : (
          <table>
            <thead><tr><th>ID</th><th>Дата</th><th>Оплата</th><th>Позиций</th><th>Сумма</th></tr></thead>
            <tbody>
              {history.map(o=>(
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
      </section>
    </div>
  );
}
