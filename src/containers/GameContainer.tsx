import * as React from "react";
import {Game} from "../types/Game";
import {IBlock} from "../types/IBlock";
import Block from "../components/Block";
import {Grid} from "@material-ui/core";

interface GameContainerProps {
    game: Game,
    fnClick: (_: IBlock) => void,
}

const GameContainer: React.FC<GameContainerProps> = ({game, fnClick}) => {
    const {blocks} = game;
    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={1}
        >
            {blocks.map((block: IBlock) => {
                return (
                    <Block key={block.image} block={block} selected={game.selectedIndex} fnClick={fnClick}/>
                );
            })}

        </Grid>
    )
};

export default GameContainer;