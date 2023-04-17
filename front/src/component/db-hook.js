import { useState, useEffect } from "react";
import axios from "axios";

export const useDB = (url) => {
    const [result, setResult] = useState();
    const [error, setError] = useState('');

    useEffect(() => {
        const getAllItems = () => {
            axios
                .get(`${url}`)
                .then((res) => res.data)
                .then((res) => {
                    setResult(res);
                })
                .catch((err) => {
                    setError(err);
                })
        };

        getAllItems();
    }, [url]);

    

    return { result, error };
}