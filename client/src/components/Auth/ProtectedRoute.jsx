import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { ACCESS_TOKEN,REFRESH_TOKEN } from '../../constants';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
const ProtectedRoute = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState(null)

    const auth = useCallback(async () => {
        try {
            const token = sessionStorage.getItem(ACCESS_TOKEN)
            if (!token) {
                setIsAuthorized(false)
                return
            }
            const decodedToken = jwtDecode(token)
            const tokenExpiration = decodedToken.exp
            const now = Date.now() / 1000
            if (tokenExpiration < now) {
                await refreshToken()
            } else {
                setIsAuthorized(true)
            }
        } catch (error) {
            console.error('Error during authentication:', error.message || error)
            setIsAuthorized(false)
        }
    }, [])

    const refreshToken = async () => {
        const refreshToken = sessionStorage.getItem(REFRESH_TOKEN)
        try {
            const res = await axios.post('/auth/api/token/refresh/', { refresh: refreshToken })
            if (res.status === 200) {
                sessionStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }
        } catch (error) {
            console.error('Error refreshing token:', error.message || error)
            setIsAuthorized(false)
        }
    }

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [auth])

    if (isAuthorized === null) {
        return <div>Loading...</div>
    }

    return isAuthorized ? children : <Navigate to="/register" />
}

export default ProtectedRoute