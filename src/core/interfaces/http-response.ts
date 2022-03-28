export interface Response<T> {
    ok: boolean;
    statusCode: number;
    statusText: string;
    data?: T;
    message?: string;
    name?: string;
}
