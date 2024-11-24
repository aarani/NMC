import axios from "axios";

export default function createAxiosInstance(router: any) {
    const axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_BACKEND_URL
    });

    axiosInstance.defaults.withCredentials = true

    axiosInstance.interceptors.response.use(res => res, async (err) => {
        if (err?.response?.status === 401 || err?.response?.status === 403) {
            router.navigate({to: "/auth/login"})
        }
        return Promise.reject(err);
    })
    
    return axiosInstance;
}