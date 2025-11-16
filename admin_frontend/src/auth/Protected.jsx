import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";

export function Protected({ children }) {
  const { token, loading } = useAuth();
  if (loading) return <div>Загрузка…</div>;
  if (!token) return <Navigate to="/login" replace/>;
  return children;
}

export function AdminOnly({ children }) {
  const { token, profile, loading } = useAuth();
  if (loading) return <div>Загрузка…</div>;
  if (!token) return <Navigate to="/login" replace/>;
  if (!profile || profile.role !== "ADMIN") return <Navigate to="/" replace/>;
  return children;
}
