import {IBlock} from "./IBlock";

export interface Game {
    id: number,
    name: string;
    selectedIndex?: number | null;
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
    return blocks;
};

export const selectElement = (game: Game, index: number): Game => {
    if (game.selectedIndex != null && game.selectedIndex !== index) {
        game.blocks = move(game.blocks, game.selectedIndex, index);
        game.blocks = move(game.blocks, index + 1, game.selectedIndex - 1);
        game.selectedIndex = null;
    }else{
        game.selectedIndex = index;
    }
    console.log(game);
    return game;
};