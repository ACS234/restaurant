import {jwtDecode} from 'jwt-decode';
import api from '../services/api'; // Your api service
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';

// Function to decode access token and get the user ID
export const getUserFromToken = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.user_id; // Assuming the user_id is in the token payload
  } catch (error) {
    console.error('Invalid or expired token',error);
    return null;
  }
};

// Function to refresh access token using the refresh token
export const refreshAccessToken = async () => {
  try {
    const response = await api.post('/auth/refresh/', {
      refresh: sessionStorage.getItem(REFRESH_TOKEN),
    });
    sessionStorage.setItem(ACCESS_TOKEN, response.data.access);
    return response.data.access;
  } catch (error) {
    console.error('Failed to refresh access token', error);
    return null;
  }
};

// Function to get the current user by using the access token
export const getUser = async (accessToken) => {
  try {
    const response = await api.get('/account/api/user/', {
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

// Function to get the user ID from the current access token, refreshing the token if necessary
export const getUserId = async () => {
  const accessToken = sessionStorage.getItem(ACCESS_TOKEN);
  if (!accessToken) {
    throw new Error('No access token found');
  }

  let userId = getUserFromToken(accessToken);
  if (!userId) {
    const newAccessToken = await refreshAccessToken();
    if (newAccessToken) {
      userId = getUserFromToken(newAccessToken);
    }
  }

  if (!userId) {
    throw new Error('Unable to retrieve user ID from token');
  }

  return userId;
};