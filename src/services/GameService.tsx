import {useEffect, useState} from 'react';
import {Request, Service} from '../types/Service';
import {Game} from "../types/Game";

const API_URL = 'https://localhost:3000/api/game/:id';
const usePostGameService = (id: number) => {
    const [result, setResult] = useState<Service<Game>>({
        status: Request.INIT
    });

    useEffect(() => {
        fetch(API_URL.replace(":id", `${id}`))
            .then(response => response.json())
            .then(response => setResult({status: Request.LOADED, payload: response}))
            .catch(error => setResult({status: Request.ERROR, error}));
    }, []);

    return result;
};

export default usePostGameService;