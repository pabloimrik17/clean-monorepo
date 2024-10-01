import {
    EventGetByIdUseCase,
    EventListAvailableUseCase,
    ReservationCancelUseCase,
    ReservationCreateUseCase,
    ReservationEditUseCase,
} from "@repo/domain-layer";
import { Container } from "inversify";

export const domainTypes = {
    usecases: {
        EventGetByIdUseCase: Symbol.for("EventGetByIdUseCase"),
        EventListAvailableUseCase: Symbol.for("EventListAvailableUseCase"),
        ReservationCancelUseCase: Symbol.for("ReservationCancelUseCase"),
        ReservationCreateUseCase: Symbol.for("ReservationCreateUseCase"),
        ReservationEditUseCase: Symbol.for("ReservationEditUseCase"),
        UserCreateUseCase: Symbol.for("UserCreateUseCase"),
        UserGetReservationsUseCase: Symbol.for("UserGetReservationsUseCase"),
    },
};

export const domainContainer = new Container();

domainContainer
    .bind(domainTypes.usecases.EventGetByIdUseCase)
    .to(EventGetByIdUseCase);

domainContainer
    .bind(domainTypes.usecases.EventListAvailableUseCase)
    .to(EventListAvailableUseCase);

domainContainer
    .bind(domainTypes.usecases.ReservationCancelUseCase)
    .to(ReservationCancelUseCase);

domainContainer
    .bind(domainTypes.usecases.ReservationCreateUseCase)
    .to(ReservationCreateUseCase);

domainContainer
    .bind(domainTypes.usecases.ReservationEditUseCase)
    .to(ReservationEditUseCase);

domainContainer
    .bind(domainTypes.usecases.UserCreateUseCase)
    .toConstantValue(null);
domainContainer
    .bind(domainTypes.usecases.UserGetReservationsUseCase)
    .toConstantValue(null);
