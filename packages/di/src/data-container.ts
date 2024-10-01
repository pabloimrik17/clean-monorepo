import { ConsoleLogHttpClient } from "@repo/data-layer";
import { HttpClient } from "@repo/domain-layer";
import { Container } from "inversify";

export const dataContainer = new Container();

dataContainer.bind<HttpClient>("HttpClient").to(ConsoleLogHttpClient);
dataContainer.bind("EventRepository").toConstantValue(null);
dataContainer.bind("ReservationRepository").toConstantValue(null);
dataContainer.bind("UserRepository").toConstantValue(null);
