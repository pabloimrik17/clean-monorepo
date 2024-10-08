import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { EventsModule } from "./events/events.module";
import { ReservationsModule } from "./reservations/reservations.module";
import { UsersModule } from "./users/users.module";

@Module({
    imports: [UsersModule, EventsModule, ReservationsModule],
    controllers: [AppController],
})
export class AppModule {}
