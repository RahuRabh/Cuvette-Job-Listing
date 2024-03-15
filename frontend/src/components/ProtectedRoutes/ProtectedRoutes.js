import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute(props) {
  const { Component } = props;
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token"));

  return <>{isLoggedIn ? <Component /> : <Navigate to="/login" />}</>;
}
