import {IBlock, State} from "./IBlock";

export interface Game {
    id: number,
    name: string;
    selectedIndex: number | null;
    blocks: IBlock[]
}

const move = (blocks: IBlock[], oldIndex: number|null, newIndex: number|null) => {
    if (oldIndex === null || newIndex === null) {
        return blocks;
    }
    while (oldIndex < 0) {
        oldIndex += blocks.length;
    }
    while (newIndex < 0) {
        newIndex += blocks.length;
    }
    blocks.splice(newIndex, 0, blocks.splice(oldIndex, 1)[0]);
    blocks[newIndex].activePosition = newIndex;
    if(blocks[newIndex].activePosition === blocks[newIndex].originPosition){
        blocks[newIndex].state = State.BLOCKED;
    }
    return blocks;
};

export const selectElement = (game: Game, index: number): Game => {
    console.log(game.selectedIndex);
    if (game.selectedIndex != null && game.selectedIndex !== index) {
        game.blocks = move(game.blocks, game.selectedIndex, index);
        game.blocks = move(game.blocks, index + 1, game.selectedIndex);
        game.selectedIndex = null;
    }else{
        game.selectedIndex = index;
    }

    return game;
};