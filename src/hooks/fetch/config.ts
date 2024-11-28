import axios from 'axios'
import { load } from 'react-cookies'

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    })

    axiosInstance.interceptors.request.use(
    (config) => {
        const token = load('token') // Usar react-cookies para obtener la cookie
        if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default axiosInstance
