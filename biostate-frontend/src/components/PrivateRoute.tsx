// src/components/PrivateRoute.tsx
import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute: React.FC = () => {
  const { user } = useContext(AuthContext);
  console.log("user", user);
  return user ? (
    <div className="pt-14">
      <Outlet />{" "}
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoute;