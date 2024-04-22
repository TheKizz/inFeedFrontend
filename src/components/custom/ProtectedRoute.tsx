import { useAuthState } from "@/contexts/auth.context";
import { Navigate, useLocation } from "react-router-dom";
import { Layout } from "./Layout";
import { UserModel } from "@/api/user-access/entities/user.entity";

export const ProtectedRoute = () => {
  const user: UserModel | undefined = useAuthState().state.user;
  if (!user) {
    return <Navigate to="/auth" state={{ from: useLocation().pathname }} />;
  }
  return <Layout></Layout>;
};
