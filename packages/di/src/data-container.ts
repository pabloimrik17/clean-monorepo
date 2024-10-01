import { ConsoleLogHttpClient } from "@repo/data-layer";
import { HttpClient } from "@repo/domain-layer";
import { Container } from "inversify";

export const dataTypes = {
    infra: {
        HttpClient: Symbol.for("HttpClient"),
    },
    repositories: {
        EventRepository: Symbol.for("EventRepository"),
        ReservationRepository: Symbol.for("ReservationRepository"),
        UserRepository: Symbol.for("UserRepository"),
    },
};

export const dataContainer = new Container();

dataContainer
    .bind<HttpClient>(dataTypes.infra.HttpClient)
    .to(ConsoleLogHttpClient);
dataContainer
    .bind(dataTypes.repositories.EventRepository)
    .toConstantValue(null);
dataContainer
    .bind(dataTypes.repositories.ReservationRepository)
    .toConstantValue(null);
dataContainer.bind(dataTypes.repositories.UserRepository).toConstantValue(null);
