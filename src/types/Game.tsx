import {IBlock, State} from "./IBlock";

export interface Game {
    id: number,
    name: string;
    selectedIndex: number | null;
    blocks: IBlock[]
}

const move = (blocks: IBlock[], oldIndex: number | null, newIndex: number | null) => {
    if (oldIndex === null || newIndex === null) {
        return blocks;
    }
    let firstElement = blocks[newIndex];
    let secondElement = blocks[oldIndex];
    // firstElement.activePosition = oldIndex;
    // secondElement.activePosition = newIndex;
    blocks[oldIndex] = firstElement;
    blocks[newIndex] = secondElement;
    return blocks.map((element: IBlock, key: number): IBlock => {
        element.activePosition = key;
        element.state = element.activePosition === element.originPosition ? State.BLOCKED : State.ACTIVE;
        return element;
    });
};

export const selectElement = (game: Game, index: number): Game => {
    let {selectedIndex, blocks} = game;
    if (selectedIndex != null && selectedIndex !== index) {
        blocks = move(blocks, selectedIndex, index);
        selectedIndex = null;
    } else {
        selectedIndex = index;
    }
    return {...game, selectedIndex, blocks};
};