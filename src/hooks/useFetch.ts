import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { useAuthStore } from "../stores";
import { appDB } from "../api";


interface UseFetch<T> {
    isLoading: boolean;
    data: undefined | T;
    error: undefined | string;
}

export const useFetch = <T>(url: string): UseFetch<T> => {

    const { token } = useAuthStore();

    const [data, setData] = useState();
    const [error, setError] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);

        try {
            const response = await appDB.get(url, {
                headers: {
                    Authorization: "Bearer " + token
                }
            });
            setData(response.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error)
            if( isAxiosError(error) ){
                setError(error.response?.data.message);
                setIsLoading(false);
                return
            }
        }
    }

    useEffect(() => {
        fetchData();
    }, [])
    

    return {
        data,
        error,
        isLoading,
    }
}