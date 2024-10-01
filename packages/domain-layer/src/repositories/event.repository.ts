import { Event } from "../models/event.model.js";

export interface EventRepository {
    getById(id: string): Promise<null | Event>;
    listActiveEvents(): Promise<Event[]>;
    update(event: Event): Promise<void>;
}
