import React from 'react';
import {createStyles, Grid, makeStyles, Theme} from "@material-ui/core";
import {IBlock, State} from "../types/IBlock";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        selected: {
            margin: "2px",
            border: '2px solid #ff0000',
            textAlign: 'center',
            width: "15vw",
            height: "15vw",
            cursor: "pointer",
            backgroundSize: "cover",
            filter: 'grayscale(100%)',
            color: "#fff"
        },
        element: {
            margin: "3px",
            background: "#e3e3e3",
            textAlign: 'center',
            width: "15vw",
            height: "15vw",
            cursor: "pointer",
            backgroundSize: "cover",
            filter: 'grayscale(100%)',
            color: "#fff",
            fontWeight: "bolder"
        },
        correct: {
            margin: "2px",
            textAlign: 'center',
            width: "15vw",
            height: "15vw",
            cursor: "no-drop",
            backgroundSize: "cover",
        },
        done: {
            textAlign: 'center',
            width: "20vw",
            height: "20vw",
            cursor: "no-drop",
            backgroundSize: "cover",
        }
    }),
);

interface CardProps {
    block: IBlock;
    selected?: number | null;
    fnClick: (_: IBlock) => void;
    completed?: boolean;
}

const Block: React.FC<CardProps> = ({block, selected, fnClick, completed}) => {
    const classes = useStyles();
    const getClassName = () => {
        let style = classes.element;
        if (block.activePosition === selected) {
            style = classes.selected;
        }
        if (block.state === State.BLOCKED) {
            style = classes.correct;
        }
        return style;
    };

    return (
        <Grid item xs={2} key={block.image}
              className={getClassName()}
              style={{backgroundImage: `url(https://hiwarsaw.herokuapp.com${block.image}`}}
              onClick={() => fnClick(block)}>
        </Grid>
    );
};

export default Block;
