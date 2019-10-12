import * as React from "react";
import {Game, selectElement} from "../types/Game";
import {IBlock} from "../types/IBlock";
import Block from "../components/Block";
import {Grid} from "@material-ui/core";

interface GameContainerProps {
    game: Game,
    fnReorder: any,
}

const GameContainer: React.FC<GameContainerProps> = ({game, fnReorder}) => {
    const {blocks} = game;
    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={1}
        >
            {blocks.map((block: IBlock, key: number) => {
                return (
                    <Block block={block} selected={game.selectedIndex} fnOnclick={() => fnReorder(game, key)}/>
                );
            })}

        </Grid>
    )
};

export default GameContainer;