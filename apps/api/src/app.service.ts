import { Injectable } from "@nestjs/common";
import { EventGetByIdUseCase } from "@repo/domain-layer";

@Injectable()
export class AppService {
    constructor(private readonly eventGetByIdUseCase: EventGetByIdUseCase) {}

    async getHello(): Promise<string> {
        const event = await this.eventGetByIdUseCase.execute("event-001");
        return JSON.stringify(event);
    }
}
