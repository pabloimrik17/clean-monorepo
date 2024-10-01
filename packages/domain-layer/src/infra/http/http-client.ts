export interface HttpClient {
    get<R>(url: string, query?: object): Promise<null | R>;

    post<R, B>(url: string, body: B): Promise<null | R>;

    put<R, B>(url: string, body: B): Promise<null | R>;

    patch<R, B>(url: string, body: B): Promise<null | R>;

    delete<R>(url: string): Promise<null | R>;
}
