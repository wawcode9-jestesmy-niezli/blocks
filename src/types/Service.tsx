export enum Request{
    INIT,
    LOADING,
    LOADED,
    ERROR
}
interface ServiceInit {
    status: Request.INIT
}
interface ServiceLoading {
    status: Request.LOADING
}
interface ServiceLoaded<T> {
    status: Request.LOADED
    payload: T;
}
interface ServiceError {
    status: Request.ERROR
    error: Error;
}
export type Service<T> =
    | ServiceInit
    | ServiceLoading
    | ServiceLoaded<T>
    | ServiceError;