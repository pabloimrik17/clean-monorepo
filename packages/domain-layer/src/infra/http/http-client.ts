export interface HttpClient {
    get<R>(url: string): Promise<null | R>;
}
