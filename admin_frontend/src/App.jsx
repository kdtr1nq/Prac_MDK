import { Routes, Route, Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Catalog from "./pages/Catalog.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Orders from "./pages/Orders.jsx";
import AdminCatalog from "./pages/AdminCatalog.jsx";
import UserPage from "./pages/UserPage.jsx";
import { Protected, AdminOnly } from "./auth/Protected.jsx";
import { useAuth } from "./auth/AuthContext.jsx";

function Topbar(){
  const { token, profile, signout } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();
  const is = (p)=> loc.pathname.startsWith(p);

  return (
    <div className="nav">
      <div className="brand">
        <span style={{display:"inline-block", width:10, height:10, borderRadius:999, background:"linear-gradient(180deg, var(--brand), var(--brand-2))"}}/>
        Food Delivery <span className="badge">demo</span>
      </div>

      <div className="tabs">
        <Link className={`tab ${is('/') && !is('/admin') ? 'active':''}`} to="/">Каталог</Link>
        <Link className={`tab ${is('/cart')?'active':''}`} to="/cart">Корзина</Link>
        <Link className={`tab ${is('/orders')?'active':''}`} to="/orders">Заказы</Link>
        <Link className={`tab ${is('/me')?'active':''}`} to="/me">Моя страница</Link>
        <Link className={`tab ${is('/admin')?'active':''}`} to="/admin/catalog">Админ</Link>
      </div>

      <div className="userbox">
        {token ? (
          <>
            <span className="email">{profile?.email || "user"}</span>
            <button className="btn ghost" onClick={()=>{signout(); nav("/");}}>Выйти</button>
          </>
        ) : (
          <button className="btn primary" onClick={()=>nav("/login")}>Войти</button>
        )}
      </div>
    </div>
  );
}

export default function App(){
  return (
    <div className="container">
      <Topbar/>
      <div style={{height:14}}/>
      <Routes>
        <Route path="/" element={<Catalog/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/cart" element={<Protected><Cart/></Protected>}/>
        <Route path="/checkout" element={<Protected><Checkout/></Protected>}/>
        <Route path="/orders" element={<Protected><Orders/></Protected>}/>
        <Route path="/me" element={<Protected><UserPage/></Protected>}/>
        <Route path="/admin/catalog" element={<AdminOnly><AdminCatalog/></AdminOnly>}/>
        <Route path="*" element={<Navigate to="/" replace/>}/>
      </Routes>
    </div>
  );
}
