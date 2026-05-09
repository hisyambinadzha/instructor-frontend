import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import InstructorListPage from "./pages/InstructorListPage";
import InstructorDetailPage from "./pages/InstructorDetailPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />} >
        <Route index element={<HomePage />} />
        <Route path="/instructors" element={<InstructorListPage />} />
        <Route path="/instructors/:id" element={<InstructorDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
