import * as React from "react";
import {Game} from "../types/Game";
import {IBlock} from "../types/IBlock";
import Block from "../components/Block";
import {Grid} from "@material-ui/core";
import "../App.css";

interface GameContainerProps {
    game: Game|undefined,
    fnClick: (_: IBlock) => void,
}

const GameContainer: React.FC<GameContainerProps> = ({game, fnClick}) => {
    if(game === undefined){
        return(
            <span/>
        )
    }
    const {blocks} = game;

    return (
        <React.Fragment>
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
            {game.completed && <span>
                Gratulacje udało Ci się ułożyć miejsce, możesz podzielić się tym

            </span>}
            <div>Ilość ruchów: {game.moved}</div>

        </React.Fragment>
    )
};

export default GameContainer;