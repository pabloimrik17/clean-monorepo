import {
    Event,
    type EventDatasource,
    EventRepository,
} from "@repo/domain-layer";
import { inject, injectable } from "inversify";

@injectable()
export class EventImplRepository implements EventRepository {
    constructor(
        @inject("EventDatasource")
        private readonly eventDatasource: EventDatasource,
    ) {}

    listActiveEvents(): Promise<Event[]> {
        return this.eventDatasource.listActiveEvents();
    }

    update(event: Event): Promise<void> {
        return this.eventDatasource.update(event);
    }
}
