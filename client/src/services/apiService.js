import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { ACCESS_TOKEN } from '../constants';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';


// For Fetching Data Function
const getData = async (url) => {
    const token = sessionStorage.getItem(ACCESS_TOKEN);
    try {
        const response = await axios.get(url,{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response?.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};


// For Fetching Foods
export const getFoods = async () => {
    try {
        const response = await getData(`${apiUrl}/api/foods/`);
        toast.success('Food data fetched successfully!');
        return response?.data;
    } catch (error) {
        toast.error('Failed to fetch foods!', error.message);
        throw error;
    }
};

// For Fetching Menus
export const getMenus = async () => {
    try {
        const response = await getData(`${apiUrl}/api/menus/`);
        return response?.data;
    } catch (error) {
        toast.error("Something Went Wrong")
        throw error
    }
}

export const getMenuDetail = async (id) => {
    try {
        const response = await getData(`${apiUrl}/api/menus/${id}/`);
        return response?.data;
    } catch (error) {
        toast.error("Something Went Wrong", error);
        throw error
    }
}

export const getFood = async (id) => {
    try {
        const response = await getData(`${apiUrl}/api/foods/${id}/`);
        return response?.data;
    } catch (error) {
        console.error("Something Went Wrong", error);
        throw error
    }
}

export const getTable = async () => {
    try {
        const response = await getData(`${apiUrl}/api/get_table/`);
        console.log("data from apiService", response)
        return response;
    } catch (error) {
        console.error('Something went wrong', error)
        throw error
    }
}

export const getCart=async()=>{
    try {
        const response=await getData(`${apiUrl}/api/cart/add/`)
        return response?.data;
    } catch (error) {
        console.error('Error',error)
    }
}

// For Posting Data Function
const postData = async (url, data) => {
    const token = sessionStorage.getItem(ACCESS_TOKEN);
    try {
        const response = await axios.post(url, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
}

const registerData = async (url, data) => {
    try {
        const response = await axios.post(url, data);
        return response.data;
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
}

// Function For Signup 
export const Signup = async (data) => {
    try {
        const response = await registerData(`${apiUrl}/auth/api/register/`, data);
        return response?.data;
    } catch (error) {
        console.log("Error",error)
        throw error;
    }
}


 
// Function For Login 
export const Login = async (data) => {
    try {
        const response = await postData(`${apiUrl}/auth/api/token/`, data);
        toast.success("Login successful!");
        return response;
    } catch (error) {
        console.error('Error:', error);
        toast.error("Invalid credentials!",error);

    }
}

export const tokenRefresh = async (data) => {
    try {
        const response = await axios.post(`${apiUrl}/auth/api/token/refresh/`, data);
        return response;
    } catch (error) {
        console.error('Token refresh error:', error);
        toast.error("Session expired. Please log in again.");
        return null;
    }
};

// For Cart Function

export const addCart = async (data) => {
    try {
        const response = await postData(`${apiUrl}/api/cart/add/`, data);
        return response;
    } catch (error) {
        console.error('Error', error);
        toast.error("Invalid credentials!",error);
    }
}

export const bookTable = async (data) => {
    try {
        const response = await postData(`${apiUrl}/api/book/`, data);
        return response;
    } catch (error) {
        console.error('Error', error);
        toast.error("Invalid credentials!");
    }
}


const deleteData = async (url, data) => {
    const token = sessionStorage.getItem(ACCESS_TOKEN);
    try {
        const response = await axios.delete(url, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting data:', error);
        throw error;
    }
}


export const removeCart=async(id)=>{
    try {
        const response=await deleteData(`${apiUrl}/api/cart/${id}/remove/`);
        return response;
    } catch (error) {
        toast.error("Error",error)
        throw error;   
    }
}