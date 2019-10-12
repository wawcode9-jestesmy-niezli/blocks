import React from 'react';
import {Box, createStyles, Grid, makeStyles, Theme} from "@material-ui/core";
import {IBlock} from "../types/IBlock";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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

interface CardProps {
    block: IBlock;
    selected?: number|null;
    fnOnclick: any;
}
const Block: React.FC<CardProps> = ({block, selected, fnOnclick}) => {
    const classes = useStyles();
    return (
        <Grid item xs={2} key={block.originPosition}>
            <Box height={50} width="100%"
                 className={selected === block.activePosition ? classes.selected : classes.element}
                 onClick={fnOnclick}>
                <Box height="100%" bgcolor="grey.300" mx={0.5} width={50} display="inline-block">
                    {block.originPosition}
                </Box>
            </Box>
        </Grid>
    );
};

export default Block;
