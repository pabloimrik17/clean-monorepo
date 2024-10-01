import { Container } from "inversify";
import { HttpClient } from "@repo/domain-layer";
import { ConsoleLogHttpClient } from "@repo/data-layer";


export const dataTypes = {
    HttpClient: Symbol.for("HttpClient"),
};

export const dataContainer = new Container();

dataContainer.bind<HttpClient>(dataTypes.HttpClient).to(ConsoleLogHttpClient);
