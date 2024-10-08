import { Module } from "@nestjs/common";
import { container } from "@repo/di";
import { EventGetByIdUseCase } from "@repo/domain-layer";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { ReservationsModule } from './reservations/reservations.module';

@Module({
    imports: [UsersModule, EventsModule, ReservationsModule],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: EventGetByIdUseCase,
            useValue: container.get("EventGetByIdUseCase"),
        },
    ],
})
export class AppModule {}
