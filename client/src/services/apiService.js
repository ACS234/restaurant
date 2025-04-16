import { toast } from 'react-toastify';
import { ACCESS_TOKEN } from '../constants';
import axiosInstance from './axiosInstance';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const getData = async (url) => {
  try {
    const response = await axiosInstance.get(url);
    return response?.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const postData = async (url, data) => {
  try {
    const response = await axiosInstance.post(url, data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

const updateData = async (url, data) => {
  try {
    const response = await axiosInstance.patch(url, data);
    return response.data;
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
};

const deleteData = async (url, config) => {
  try {
    const response = await axiosInstance.delete(url, config);
    return response.data;
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
};

// API CALLS
export const getFoods = async () => {
  try {
    const response = await getData(`/api/foods/`);
    return response?.data;
  } catch (error) {
    toast.error('Failed to fetch foods!');
    throw error;
  }
};

export const getMenus = async () => {
  try {
    const response= await getData(`/api/menus/`);
    console.log("reponse from service",response)
    return response;
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};

export const getMenuDetail = async (id) => {
  try {
    const response= await getData(`/api/menus/${id}/`);
    console.log("menu detail",response)
    return response?.data;
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};

export const getFood = async (id) => {
  try {
    return await getData(`/api/foods/${id}/`);
  } catch (error) {
    console.error("Something went wrong", error);
    throw error;
  }
};

export const getTable = async () => {
  try {
    return await getData(`/api/get_table/`);
  } catch (error) {
    console.error('Something went wrong', error);
    throw error;
  }
};

export const getCart = async () => {
  try {
    const response = await getData(`/api/cart/`);
    return response?.data;
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
};

export const getRestaurant = async () => {
  try {
    const response = await getData(`/api/restaurants/`);
    return response;
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    throw error;
  }
};


export const fetchQRData = async () => {
    const res = await axios.get(`${apiUrl}/qr/`);
    return res.data; 
  };


export const addCart = async (data) => {
  try {
    return await postData(`/api/cart/add/`, data);
  } catch (error) {
    console.error('Add to cart error:', error);
    toast.error("Something went wrong.");
  }
};

export const removeCart = async (id) => {
  try {
    return await deleteData(`/api/cart/${id}/remove/`);
  } catch (error) {
    toast.error("Error removing cart item.");
    throw error;
  }
};

export const updateCart=async(id,data)=>{
  try {
    const response=await updateData(`/api/cart/${id}/update/`,data);
    console.log("Updated Cart",response)
    return response?.data;
  } catch (error) {
    toast.error("Error while Updating",error);
    throw error;
  }
}

export const bookTable = async (data) => {
  try {
    return await postData(`/api/book/`, data);
  } catch (error) {
    console.error('Booking error:', error);
    toast.error("Something went wrong.");
  }
};

// Payment
export const orderPayment = async (data) => {
  try {
    const response=await postData(`/api/payments/`, data);
    return response;
  } catch (error) {
    console.error('Payment error:', error);
    toast.error("Something went wrong.");
  }
};
// AUTH

const registerData = async (url, data) => {
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.error('Error registering:', error);
    throw error;
  }
};

export const Signup = async (data) => {
  try {
    return await registerData(`${apiUrl}/auth/api/register/`, data);
  } catch (error) {
    console.log("Signup error", error);
    throw error;
  }
};

export const Login = async (data) => {
  try {
    const response = await axios.post(`${apiUrl}/auth/api/token/`, data);
    toast.success("Login successful!");
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    toast.error("Invalid credentials!");
    throw error;
  }
};

export const tokenRefresh = async (data) => {
  try {
    return await axios.post(`${apiUrl}/auth/api/token/refresh/`, data);
  } catch (error) {
    console.error('Token refresh error:', error);
    return null;
  }
};
