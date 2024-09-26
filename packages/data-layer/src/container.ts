import { HttpClient } from "@repo/domain-layer";
import { Container } from "inversify";
import { ConsoleLogHttpClient } from "./infra/http/console-log-http-client.js";

export const dataTypes = {
    HttpClient: Symbol.for("HttpClient"),
};

export const dataContainer = new Container();

dataContainer.bind<HttpClient>(dataTypes.HttpClient).to(ConsoleLogHttpClient);
