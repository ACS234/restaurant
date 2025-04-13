import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants';
import { useState, useEffect, useCallback } from 'react';
import { tokenRefresh } from '../../services/apiService';

const ProtectedRoute = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);

  const auth = useCallback(async () => {
    try {
      const token = sessionStorage.getItem(ACCESS_TOKEN);
      if (!token) {
        setIsAuthorized(false);
        return;
      }

      const decodedToken = jwtDecode(token);
      const tokenExpiration = decodedToken.exp;
      const now = Date.now() / 1000;

      if (tokenExpiration < now) {
        await refreshToken();
      } else {
        setIsAuthorized(true);
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      setIsAuthorized(false);
    }
  }, []);

  const refreshToken = async () => {
    const refreshToken = sessionStorage.getItem(REFRESH_TOKEN);
    if (!refreshToken) {
      setIsAuthorized(false);
      return;
    }

    const res = await tokenRefresh({ refresh: refreshToken });

    if (res && res.status === 200 && res.data?.access) {
      sessionStorage.setItem(ACCESS_TOKEN, res.data.access);
      setIsAuthorized(true);
    } else {
      sessionStorage.removeItem(ACCESS_TOKEN);
      sessionStorage.removeItem(REFRESH_TOKEN);
      setIsAuthorized(false);
    }
  };

  useEffect(() => {
    auth();
  }, [auth]);

  if (isAuthorized === null) return <div>Loading...</div>;

  return isAuthorized ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
