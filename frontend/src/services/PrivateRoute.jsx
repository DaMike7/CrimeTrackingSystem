import { Navigate, useNavigate } from "react-router-dom";
import AuthService from "./AuthService";
import { useEffect } from "react";
import SkeletonUi from "../components/SkeletonUi";

const PrivateRoute = ({ children }) => {
    const { authUser, checkAuth, isCheckingAuth } = AuthService();
  
    useEffect(() => {
      checkAuth();
    }, [checkAuth]);
  
    if (isCheckingAuth) {
      return <SkeletonUi />;
    }
  
    return authUser ? children : <Navigate to="/user/login" />;
  };

  const UnauthenticatedRoute = ({ children }) => {
    const { authUser, checkAuth, isCheckingAuth } = AuthService();
  
    useEffect(() => {
      checkAuth();
    }, [checkAuth]);
  
    if (isCheckingAuth) {
      return (
        <SkeletonUi/>
      );
    }
  
    return authUser ? <Navigate to="/feed/home" /> : children;
  };

  const AdminProtectedRoute = ({ children }) => {
    const { authUser, checkAuth, isCheckingAuth } = AuthService();
  
    useEffect(() => {
      checkAuth();
    }, [checkAuth]);
  
    if (isCheckingAuth) {
      return (
        <SkeletonUi/>
      );
    }
  
    return authUser.userType !== 'superuser' ? <Navigate to="/feed/home" /> : children;
  };

export const Routing = {UnauthenticatedRoute,PrivateRoute ,AdminProtectedRoute}