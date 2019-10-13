import React, {useEffect, useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

import usePostGameService from "./services/GameService";
import {Request} from "./types/Service";
import {IBlock, State} from "./types/IBlock";
import {get} from "lodash";
import {Game, selectElement} from "./types/Game";
import GameContainer from "./containers/GameContainer";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            // flexGrow: 1,
        }
    }),
);

const App: React.FC = () => {
    const [game, setGame] = useState<Game>();
    const service = usePostGameService(get(window, 'hwPlaceId', null));
    const classes = useStyles();
    const select = (block: IBlock): void => {
        if (!game) {
            return;
        }
        if (block.state === State.BLOCKED) {
            alert("Element in correct place");
            return;
        }
        let newGame = selectElement(game, block.activePosition);
        setGame(newGame);
    };
    useEffect(() => {
        if (service.status === Request.LOADED) {
            setGame(service.payload);
        }
    }, [service]);

    return (
        <div className={classes.root}>
            {service.status === Request.LOADING && <div>Loading...</div>}
            {service.status === Request.LOADED && <GameContainer game={game} fnClick={select}/>}
            {service.status === Request.ERROR && (
                <div>Error, the backend moved to the dark side.</div>
            )}
        </div>
    );
};

export default App;
