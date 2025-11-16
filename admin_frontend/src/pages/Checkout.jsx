import { useState } from "react";
import { checkout } from "../api/orders";
import { useNavigate } from "react-router-dom";

export default function Checkout(){
  const [paymentMethod, setPaymentMethod] = useState("CARD");
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  async function submit(e){
    e.preventDefault();
    setErr("");
    try {
      const order = await checkout({ paymentMethod, address, comment });
      nav("/orders");
      alert("Заказ оформлен! ID: " + order.id);
    } catch (e) { setErr(e.message); }
  }

  return (
    <div className="card" style={{maxWidth:640, margin:"0 auto"}}>
      <h2>Оформление заказа</h2>
      <form onSubmit={submit} className="grid">
        <label>Способ оплаты</label>
        <select className="select" value={paymentMethod} onChange={e=>setPaymentMethod(e.target.value)}>
          <option value="CARD">Банковская карта</option>
          <option value="CASH">Наличные</option>
        </select>

        <label>Адрес доставки</label>
        <input className="input" placeholder="Город, улица, дом..." value={address} onChange={e=>setAddress(e.target.value)} />

        <label>Комментарий</label>
        <input className="input" placeholder="Комментарий к заказу" value={comment} onChange={e=>setComment(e.target.value)} />

        {err && <div className="small" style={{color:"salmon"}}>{err}</div>}
        <div className="row">
          <button className="btn">Назад</button>
          <button className="btn primary" style={{marginLeft:"auto"}}>Оформить</button>
        </div>
      </form>
    </div>
  );
}
