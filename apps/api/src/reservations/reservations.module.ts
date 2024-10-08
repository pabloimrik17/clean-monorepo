import { Module } from '@nestjs/common';
import { ReservationsController } from './reservations/reservations.controller';

@Module({
  controllers: [ReservationsController]
})
export class ReservationsModule {}
