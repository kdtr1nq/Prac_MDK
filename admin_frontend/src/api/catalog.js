import { http } from "./http";

export const listDishes = () => http.get("/api/catalog/dishes");
export const getDish    = (id) => http.get(`/api/catalog/dishes/${id}`);

export const createDish = (dish) => http.post("/api/catalog/dishes", dish, { auth:true });
export const updateDish = (id, dish) => http.put(`/api/catalog/dishes/${id}`, dish, { auth:true });
export const deleteDish = (id) => http.del(`/api/catalog/dishes/${id}`, { auth:true });
