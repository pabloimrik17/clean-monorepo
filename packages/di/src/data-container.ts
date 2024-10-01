import { ConsoleLogHttpClient } from "@repo/data-layer";
import { HttpClient } from "@repo/domain-layer";
import { Container } from "inversify";

export const dataContainer = new Container();

// Repositories
dataContainer.bind("EventRepository").toConstantValue(null);
dataContainer.bind("ReservationRepository").toConstantValue(null);
dataContainer.bind("UserRepository").toConstantValue(null);

// Datasources
dataContainer.bind("EventDatasource").toConstantValue(null);
dataContainer.bind("ReservationDatasource").toConstantValue(null);
dataContainer.bind("UserDatasource").toConstantValue(null);

// Infra
dataContainer.bind<HttpClient>("HttpClient").to(ConsoleLogHttpClient);
