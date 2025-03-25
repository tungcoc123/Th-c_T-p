import { Navigate } from "react-router-dom";
import { ReactNode, useEffect } from "react"; // Import ReactNode để định nghĩa kiểu cho children
import Login from "../pages/Login";

interface PrivateRouteProps {
  children: ReactNode; 
  isAuthenticated: boolean; 
  isAdmin: boolean; 
}



const PrivateRoute = ({ children, isAuthenticated }: PrivateRouteProps) => {
  const userRole = localStorage.getItem("role");
  const isAdmin = userRole === "admin";

  if (!isAuthenticated) {
    <Login/>
    // Nếu chưa đăng nhập, mở modal login
    document.getElementById("loginButton")?.click();
    return null;
  }

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
