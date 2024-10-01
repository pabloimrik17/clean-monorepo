import {
    ReservationCancelUseCase,
    ReservationCreateUseCase,
    ReservationEditUseCase,
} from "@repo/domain-layer";
import { Container } from "inversify";

export const domainTypes = {
    usecases: {
        ReservationCancelUseCase: Symbol.for("ReservationCancelUseCase"),
        ReservationCreateUseCase: Symbol.for("ReservationCreateUseCase"),
        ReservationEditUseCase: Symbol.for("ReservationEditUseCase"),
    },
};

export const domainContainer = new Container();

domainContainer
    .bind(domainTypes.usecases.ReservationCancelUseCase)
    .to(ReservationCancelUseCase);

domainContainer
    .bind(domainTypes.usecases.ReservationCreateUseCase)
    .to(ReservationCreateUseCase);

domainContainer
    .bind(domainTypes.usecases.ReservationEditUseCase)
    .to(ReservationEditUseCase);
