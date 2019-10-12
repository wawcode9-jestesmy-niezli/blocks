import React from 'react';
import './App.css';
import usePostGameService from "./services/Game";
import {Request} from "./types/Service";

const App: React.FC = () => {
    const service = usePostGameService();
    return (
        <div>
            {service.status === Request.LOADING && <div>Loading...</div>}
            {service.status === Request.LOADED &&
            service.payload.blocks.map(block => (
                <div key={block.originPosition}>{block.originPosition}</div>
            ))}
            {service.status === Request.ERROR && (
                <div>Error, the backend moved to the dark side.</div>
            )}
        </div>
    );
};

export default App;
