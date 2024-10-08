import { Injectable } from "@nestjs/common";
import { container } from "@repo/di";
import { EventGetByIdUseCase } from "@repo/domain-layer";

@Injectable()
export class AppService {
    private readonly eventGetByIdUseCase: EventGetByIdUseCase;

    constructor() {
        this.eventGetByIdUseCase = container.get<EventGetByIdUseCase>(
            "EventGetByIdUseCase",
        );
    }

    async getHello(): Promise<string> {
        const event = await this.eventGetByIdUseCase.execute("event-001");
        return JSON.stringify(event);
    }
}
