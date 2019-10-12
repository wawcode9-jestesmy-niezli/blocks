export enum State{
    ACTIVE,
    BLOCKED
}
export interface IBlock {
    image: String;
    activePosition: number;
    originPosition: number;
    state?: State
};

