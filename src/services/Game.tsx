import {useEffect, useState} from 'react';
import {Request, Service} from '../types/Service';
import {Game} from "../types/Game";

const API_URL = 'https://localhost:3000/api/game';
const usePostGameService = () => {
    const [result, setResult] = useState<Service<Game>>({
        status: Request.INIT
    });

    useEffect(() => {
        fetch(API_URL)
            .then(response => response.json())
            .then(response => setResult({status: Request.LOADED, payload: response}))
            .catch(error => setResult({status: Request.ERROR, error}));
    }, []);

    return result;
};

export default usePostGameService;