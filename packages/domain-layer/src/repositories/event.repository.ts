import { Event } from "../models/event.model.js";

export interface EventRepository {
    getById(id: string): Promise<Event>;
    listActiveEvents(): Promise<Event[]>;
    update(event: Event): Promise<void>
}
