import { Event } from "../models/event.model.js";

export interface EventDatasource {
    getById(id: string): Promise<Event>;
    listActiveEvents(): Promise<Event[]>;
    update(event: Event): Promise<void>;
}
