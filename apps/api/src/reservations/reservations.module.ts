import { Module } from "@nestjs/common";
import { container } from "@repo/di";
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
            useValue: container.get("ReservationCancelUseCase"),
        },
        {
            provide: ReservationCreateUseCase,
            useValue: container.get("ReservationCreateUseCase"),
        },
        {
            provide: ReservationEditUseCase,
            useValue: container.get("ReservationEditUseCase"),
        },
    ],
})
export class ReservationsModule {}
