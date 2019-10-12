export enum State{
    ACTIVE,
    BLOCKED
}
export interface IBlock {
    readonly image: string;
    activePosition: number;
    readonly originPosition: number;
    state?: State
};

