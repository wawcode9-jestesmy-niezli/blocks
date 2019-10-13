import React, {useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

import usePostGameService from "./services/GameService";
import {Request} from "./types/Service";
import {IBlock, State} from "./types/IBlock";
import {get, random, sortBy} from "lodash";
import {Game, selectElement} from "./types/Game";
import GameContainer from "./containers/GameContainer";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            // flexGrow: 1,
        }
    }),
);

let elements = Array.from(Array(50).keys());
const blocks: IBlock[] = elements.map((element: number): IBlock => {
    return {
        image: `${element}.jpg`,
        originPosition: element,
        activePosition: element,
        state: State.ACTIVE
    }
});
let usedElements: number[] = [];
const getFreePosition = () => {
    let number = random(0, blocks.length);
    if (!usedElements.includes(number)) {
        usedElements.push(number);
    } else {
        number = getFreePosition();
    }
    return number;
};
const gameObj: Game = {
    selectedIndex: null,
    id: 1,
    name: 'Pałac kultury',
    blocks: sortBy(blocks.map((block: IBlock): IBlock => {
        block.activePosition = getFreePosition();
        return block;
    }), 'activePosition')
};


const App: React.FC = () => {
    const [game, setGame] = useState<Game>(gameObj);
    const service = usePostGameService(get(window, 'hwPlaceId', null));
    const classes = useStyles();
    const select = (block: IBlock): void => {
        if (block.state === State.BLOCKED) {
            alert("Element in correct place");
            return;
        }
        let newGame = selectElement(game, block.activePosition);
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
            <GameContainer game={game} fnClick={select}/>
        </div>
    );
};

export default App;
