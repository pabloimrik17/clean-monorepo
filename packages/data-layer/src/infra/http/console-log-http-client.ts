import { HttpClient } from "@repo/domain-layer";
import { injectable } from "inversify";

@injectable()
export class ConsoleLogHttpClient implements HttpClient {
    get<R>(url: string): Promise<null | R> {
        console.log("url: ", url);

        return Promise.resolve(null);
    }
}
