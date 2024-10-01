import {
    EventGetByIdUseCase,
    EventListAvailableUseCase,
    ReservationCancelUseCase,
    ReservationCreateUseCase,
    ReservationEditUseCase,
    UserCreateUseCase,
    UserGetReservationsUseCase,
} from "@repo/domain-layer";
import { Container } from "inversify";

export const domainContainer = new Container();

domainContainer.bind("EventGetByIdUseCase").to(EventGetByIdUseCase);
domainContainer.bind("EventListAvailableUseCase").to(EventListAvailableUseCase);

domainContainer.bind("ReservationCancelUseCase").to(ReservationCancelUseCase);
domainContainer.bind("ReservationCreateUseCase").to(ReservationCreateUseCase);
domainContainer.bind("ReservationEditUseCase").to(ReservationEditUseCase);

domainContainer.bind("UserCreateUseCase").to(UserCreateUseCase);
domainContainer
    .bind("UserGetReservationsUseCase")
    .to(UserGetReservationsUseCase);
