import React, {useState} from 'react';
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
            flexGrow: 1,
        },
        selected: {
            border: '1px solid #ff0000',
            textAlign: 'center',
        },
        element: {
            padding: theme.spacing(1),
            textAlign: 'center'
        },
    }),
);

let elements = Array.from(Array(6).keys());
let blocks: IBlock[] = elements.map((element: number): IBlock => {
    return {
        image: `${element}.jpg`,
        originPosition: element,
        activePosition: element,
        state: State.ACTIVE
    }
});
let gameObj: Game = {
    selectedIndex: null,
    id: 1,
    name: 'Pałac kultury',
    blocks: blocks
};


const App: React.FC = () => {
    const [game, setGame] = useState<Game>(gameObj);
    const service = usePostGameService(get(window, 'hwPlaceId', null));
    const classes = useStyles();

    const select = (index: number):void => {
        let newGame = selectElement(game, index);
        console.log(newGame);
        setGame(newGame);
    };
    return (
        <div className={classes.root}>
            {service.status === Request.LOADING && <div>Loading...</div>}
            {service.status === Request.LOADED &&
            service.payload.blocks.map(block => (
                <div key={block.originPosition}>{block.originPosition}</div>
            ))}
            {service.status === Request.ERROR && (
                <div>Error, the backend moved to the dark side.</div>
            )}
            {game && <GameContainer game={game} fnClick={select}/>}
        </div>
    );
};

export default App;
