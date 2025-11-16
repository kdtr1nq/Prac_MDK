import { http } from "./http";

// корзина
export const getCart   = () => http.get("/api/orders/cart", { auth:true });
export const addItem   = (dishId, qty=1) => http.post("/api/orders/cart/items", { dishId, qty }, { auth:true });
export const setQty    = (itemId, qty) => http.patch(`/api/orders/cart/items/${itemId}`, { qty }, { auth:true });
export const delItem   = (itemId) => http.del(`/api/orders/cart/items/${itemId}`, { auth:true });
export const clearCart = () => http.del("/api/orders/cart", { auth:true });

// заказ
export const checkout  = (payload) => http.post("/api/orders/checkout", payload, { auth:true });
export const myOrders  = () => http.get("/api/orders", { auth:true });
export const orderById = (id) => http.get(`/api/orders/${id}`, { auth:true });
export const activeOrder = () => http.get("/api/orders/active", { auth:true });
