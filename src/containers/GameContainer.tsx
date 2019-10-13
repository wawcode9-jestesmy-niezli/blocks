import * as React from "react";
import {Game} from "../types/Game";
import {IBlock} from "../types/IBlock";
import Block from "../components/Block";
import {Grid} from "@material-ui/core";
import "../App.css";

interface GameContainerProps {
    game: Game,
    fnClick: (_: IBlock) => void,
}

const GameContainer: React.FC<GameContainerProps> = ({game, fnClick}) => {
    const {blocks} = game;

    const fbShare = (link: string): void => {
        window.open(link, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
    };

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
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${game.shareUrl}`} title="Share on Facebook"
                   target="_blank"
                   className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--facebook">
                    <i className="fa fa-facebook fa-fw"/> Facebook</a>
            </span>}
            <div>Ilość ruchów: {game.moved}</div>
        </React.Fragment>
    )
};

export default GameContainer;