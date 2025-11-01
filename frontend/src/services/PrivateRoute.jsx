import { Navigate, useNavigate } from "react-router-dom";
import AuthService from "./AuthService";
import { useEffect } from "react";
import LoadingSkeleton from '../pages/LoadingSkeleton'

const PrivateRoute = ({ children }) => {
    const { authUser, checkAuth, isCheckingAuth } = AuthService();
  
    useEffect(() => {
      checkAuth();
    }, [checkAuth]);
  
    if (isCheckingAuth) {
      return <LoadingSkeleton/>;
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
        <LoadingSkeleton/>
      );
    }
  
    return authUser ? <Navigate to="/cases" /> : children;
  };

  const AdminProtectedRoute = ({ children }) => {
    const { authUser, checkAuth, isCheckingAuth } = AuthService();
  
    useEffect(() => {
      checkAuth();
    }, [checkAuth]);
  
    if (isCheckingAuth) {
      return (
        <LoadingSkeleton/>
      );
    }
  
    return authUser.userType !== 'admin' ? <Navigate to="/cases" /> : children;
  };

export const Routing = {UnauthenticatedRoute,PrivateRoute ,AdminProtectedRoute}