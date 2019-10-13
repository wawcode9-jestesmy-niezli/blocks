import {IBlock, State} from "./IBlock";
import {clone, sumBy} from 'lodash';

export interface Game {
    readonly id: number,
    readonly name: string;
    selectedIndex: number | null;
    blocks: IBlock[];
    completed?: boolean;
    moved?: number;
    shareUrl?: string;
}

const move = (blocks: IBlock[], oldIndex: number, newIndex: number): IBlock[] => {
    const firstElement = clone(blocks[oldIndex]);
    blocks[oldIndex] = clone(blocks[newIndex]);
    blocks[newIndex] = firstElement;
    return blocks;
};

export const selectElement = (game: Game, index: number): Game => {
    let {selectedIndex, blocks} = game;
    if (selectedIndex != null && selectedIndex !== index) {
        blocks = move(blocks, selectedIndex, index);
        game.moved =(game.moved ? game.moved : 0) + 1;
        game = checkGame({...game, blocks});
        selectedIndex = null;
    } else {
        selectedIndex = index;
    }
    return {...game, selectedIndex};
};

export function checkGame(game: Game): Game {
    let {blocks, completed} = game;
    blocks = blocks.map((element: IBlock, key: number): IBlock => {
        element.activePosition = key;
        element.state = element.activePosition === element.originPosition ? State.BLOCKED : State.ACTIVE;
        return element;
    });
    const checked = sumBy(blocks, (element: IBlock): number => {
        return element && element.state === State.BLOCKED ? 1 : 0
    });
    completed = checked === blocks.length;
    return {...game, blocks, completed}
}