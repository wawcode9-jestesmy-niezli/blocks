import {Block} from "./Block";

export interface Game {
    id: number,
    name: string;
    blocks: Block[]
}