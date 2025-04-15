import { jwtDecode } from 'jwt-decode';
// import { tokenRefresh } from '../services/apiService';

import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import axios from 'axios';

// Decode token to get user_id
export const getUserFromToken = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.user_id;
  } catch (error) {
    console.error('Invalid or expired token', error);
    return null;
  }
};

// Refresh the access token
export const refreshAccessToken = async () => {
  try {
    const refreshToken = sessionStorage.getItem(REFRESH_TOKEN);
    if (!refreshToken) return null;

    const response = await axios.post('/auth/api/token/refresh/', {
      refresh: refreshToken,
    });

    if (response.status === 200 && response.data?.access) {
      sessionStorage.setItem(ACCESS_TOKEN, response.data.access);
      return response.data.access;
    }

    return null;
  } catch (error) {
    console.error('Failed to refresh access token', error);
    sessionStorage.removeItem(ACCESS_TOKEN);
    sessionStorage.removeItem(REFRESH_TOKEN);
    return null;
  }
};

// Get current user info
export const getUser = async (accessToken) => {
  try {
    const response = await axios.get('/auth/api/user/', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user details', error);
    throw new Error('Unable to fetch user details');
  }
};

// Get user_id with token refresh logic
export const getUserId = async () => {
  let accessToken = sessionStorage.getItem(ACCESS_TOKEN);
  if (!accessToken) throw new Error('No access token found');

  let userId = getUserFromToken(accessToken);
  if (!userId) {
    accessToken = await refreshAccessToken();
    if (accessToken) {
      userId = getUserFromToken(accessToken);
    }
  }

  if (!userId) throw new Error('Unable to retrieve user ID from token');
  return userId;
};
