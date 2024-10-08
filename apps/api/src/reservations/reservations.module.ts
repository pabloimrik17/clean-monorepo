import { Module } from "@nestjs/common";
import { backendContainer } from "@repo/di";
import {
    ReservationCancelUseCase,
    ReservationCreateUseCase,
    ReservationEditUseCase,
} from "@repo/domain-layer";
import { ReservationsController } from "./reservations/reservations.controller";

@Module({
    controllers: [ReservationsController],
    providers: [
        {
            provide: ReservationCancelUseCase,
            useValue: backendContainer.get("ReservationCancelUseCase"),
        },
        {
            provide: ReservationCreateUseCase,
            useValue: backendContainer.get("ReservationCreateUseCase"),
        },
        {
            provide: ReservationEditUseCase,
            useValue: backendContainer.get("ReservationEditUseCase"),
        },
    ],
})
export class ReservationsModule {}
