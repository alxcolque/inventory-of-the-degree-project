import axios from "axios";

export const newsDB = axios.create({
    baseURL: import.meta.env.VITE_API_NEWS_URL,
    headers: {
        "Content-type": "application/json"
    }   
});