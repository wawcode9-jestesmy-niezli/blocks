export enum State{
    ACTIVE,
    BLOCKED
}
export interface Block {
    image: String;
    activePosition: number;
    originPosition: number;
    state?: State
};

