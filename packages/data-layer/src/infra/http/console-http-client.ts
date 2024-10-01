import { HttpClient } from "@repo/domain-layer";
import { injectable } from "inversify";

@injectable()
export class ConsoleHttpClient implements HttpClient {
    get<R>(url: string): Promise<null | R> {
        console.log("GET: ", url);

        return Promise.resolve(null);
    }

    post<R, B>(url: string, body: B): Promise<null | R> {
        console.log("POST: ", url, body);

        return Promise.resolve(null);
    }

    put<R, B>(url: string, body: B): Promise<null | R> {
        console.log("PUT: ", url, body);

        return Promise.resolve(null);
    }

    patch<R, B>(url: string, body: B): Promise<null | R> {
        console.log("PATCH: ", url, body);

        return Promise.resolve(null);
    }

    delete<R>(url: string): Promise<null | R> {
        console.log("DELETE: ", url);

        return Promise.resolve(null);
    }
}
