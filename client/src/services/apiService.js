import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';


// For Fetching Data Function
const getData = async (url) => {
    try {
        const response = await axios.get(url);
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

export const getMenuDetail=async(id)=>{
    try {
        const response =await getData(`${apiUrl}/api/menus/${id}/`);
        return response?.data;
    } catch (error) {
        toast.error("Something Went Wrong",error);
        throw error
    }
}


// For Posting Data Function
const postData = async (url, data) => {
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
        console.log("apiurl", apiUrl)
        const response = await postData(`${apiUrl}/auth/api/register/`, data);
        toast.success("Registration successful!");
        return response?.data;
    } catch (error) {
        toast.error("Registration failed!", error);
    }
}

// Function For Login 
export const Login = async (data) => {
    try {
        const response = await postData(`${apiUrl}/auth/api/token/`, data);
        toast.success("Login successful!");
        console.log("response", response)
        return response;
    } catch (error) {
        console.error('Error:', error);
        toast.error("Invalid credentials!");

    }
}


