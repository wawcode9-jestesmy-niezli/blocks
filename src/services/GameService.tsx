import {useEffect, useState} from 'react';
import {Request, Service} from '../types/Service';
import {checkGame, Game} from "../types/Game";

const API_URL = 'https://hiwarsaw.herokuapp.com/api-place/:id';
const usePostGameService = (id: number) => {
    const [result, setResult] = useState<Service<Game>>({
        status: Request.INIT
    });

    useEffect(() => {
        fetch(API_URL.replace(":id", `${id}`))
            .then(response => response.json())
            .then(response => setResult({status: Request.LOADED, payload: checkGame(response)}))
            .catch(error => setResult({status: Request.ERROR, error}));
    }, [id]);

    return result;
};

export default usePostGameService;