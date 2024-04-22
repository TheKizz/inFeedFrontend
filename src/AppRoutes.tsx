import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/home/HomePage";
import { SurveysPage } from "./pages/surveys/SurveysPage";
import { AuthPage } from "./pages/auth/AuthPage";
import { ProtectedRoute } from "./components/custom/ProtectedRoute";
import { NotFoundPage } from "./components/custom/NotFoundPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/" element={<ProtectedRoute />}>
        <Route index element={<HomePage />} />
        <Route path="surveys" element={<SurveysPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
