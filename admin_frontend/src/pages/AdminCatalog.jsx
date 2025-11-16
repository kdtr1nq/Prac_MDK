import { useEffect, useState } from "react";
import { listDishes, createDish, updateDish, deleteDish } from "../api/catalog";

export default function AdminCatalog(){
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name:"", price:"", category:"" });
  const [editId, setEditId] = useState(null);
  const [err, setErr] = useState("");

  async function load(){ try { setItems(await listDishes()); } catch(e){ setErr(e.message); } }
  useEffect(()=>{ load(); }, []);

  async function submit(e){
    e.preventDefault();
    try{
      const payload = { ...form, price: Number(form.price) };
      if (editId) await updateDish(editId, payload); else await createDish(payload);
      setForm({ name:"", price:"", category:"" }); setEditId(null); load();
    }catch(e){ setErr(e.message); }
  }
  function startEdit(d){ setEditId(d.id); setForm({ name:d.name, price:d.price, category:d.category||"" }); }
  async function del(id){ if(confirm("Удалить?")){ await deleteDish(id); load(); } }

  return (
    <div className="grid">
      <div className="row spread">
        <h2>Админ: Каталог</h2>
        <span className="tag">Позиций: {items.length}</span>
      </div>

      {err && <div className="small" style={{color:"salmon"}}>{err}</div>}

      <div className="card">
        <form onSubmit={submit} className="row" style={{flexWrap:"wrap"}}>
          <input className="input" style={{flex:"1 1 240px"}} required placeholder="Название"
                 value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
          <input className="input" style={{width:140}} required type="number" step="0.01" placeholder="Цена"
                 value={form.price} onChange={e=>setForm({...form, price:e.target.value})}/>
          <input className="input" style={{flex:"1 1 200px"}} placeholder="Категория"
                 value={form.category} onChange={e=>setForm({...form, category:e.target.value})}/>
          <button className="btn primary">{editId? "Сохранить" : "Добавить"}</button>
        </form>
      </div>

      <table className="table">
        <thead><tr><th>ID</th><th>Название</th><th>Цена</th><th>Категория</th><th/></tr></thead>
        <tbody>
          {items.map(d=>(
            <tr key={d.id}>
              <td>{d.id}</td><td>{d.name}</td><td>{d.price}</td><td>{d.category||"—"}</td>
              <td style={{textAlign:"right"}}>
                <div className="row">
                  <button className="btn" onClick={()=>startEdit(d)}>Изм.</button>
                  <button className="btn danger" onClick={()=>del(d.id)}>Удал.</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
