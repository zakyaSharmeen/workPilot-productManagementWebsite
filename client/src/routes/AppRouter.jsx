// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import useAuth from "../hooks/useAuth";
// import DashboardLayout from "../components/layout/DashboardLayout";
// import LoginPage from "../pages/auth/LoginPage";
// import RegisterPage from "../pages/auth/RegisterPage";
// import VerifyOtpPage from "../pages/auth/VerifyOtpPage";
// import LandingPage from "../pages/LandingPage";
// import DashboardPage from "../pages/DashboardPage";
// import ProjectsPage from "../pages/ProjectsPage";
// import ProjectDetailPage from "../pages/ProjectDetailPage";
// import TasksPage from "../pages/TasksPage";
// import ProfilePage from "../pages/ProfilePage";

// function ProtectedRoute({ children }) {
//   const { isAuthenticated } = useAuth();
//   return isAuthenticated ? children : <Navigate to="/login" replace />;
// }

// function GuestRoute({ children }) {
//   const { isAuthenticated } = useAuth();
//   return isAuthenticated ? <Navigate to="/app/dashboard" replace /> : children;
// }

// export default function AppRouter() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <GuestRoute>
//               <LandingPage />
//             </GuestRoute>
//           }
//         />
//         <Route
//           path="/login"
//           element={
//             <GuestRoute>
//               <LoginPage />
//             </GuestRoute>
//           }
//         />
//         <Route
//           path="/register"
//           element={
//             <GuestRoute>
//               <RegisterPage />
//             </GuestRoute>
//           }
//         />
//         <Route
//           path="/verify-otp"
//           element={
//             <GuestRoute>
//               <VerifyOtpPage />
//             </GuestRoute>
//           }
//         />
//         <Route
//           path="/app"
//           element={
//             <ProtectedRoute>
//               <DashboardLayout />
//             </ProtectedRoute>
//           }>
//           <Route index element={<Navigate to="/app/dashboard" replace />} />
//           <Route path="dashboard" element={<DashboardPage />} />
//           <Route path="projects" element={<ProjectsPage />} />
//           <Route path="projects/:id" element={<ProjectDetailPage />} />
//           <Route path="tasks" element={<TasksPage />} />
//           <Route path="profile" element={<ProfilePage />} />
//         </Route>
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import DashboardLayout from "../components/layout/DashboardLayout";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import LandingPage from "../pages/LandingPage";
import DashboardPage from "../pages/DashboardPage";
import ProjectsPage from "../pages/ProjectsPage";
import ProjectDetailPage from "../pages/ProjectDetailPage";
import TasksPage from "../pages/TasksPage";
import ProfilePage from "../pages/ProfilePage";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function GuestRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/app/dashboard" replace /> : children;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <GuestRoute>
              <LandingPage />
            </GuestRoute>
          }
        />
        <Route
          path="/login"
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          }
        />
        <Route
          path="/register"
          element={
            <GuestRoute>
              <RegisterPage />
            </GuestRoute>
          }
        />
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:id" element={<ProjectDetailPage />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
