import { Event } from "../models/event.model.js";

export interface EventDatasource {
    getById(id: string): Promise<null | Event>;
    listActiveEvents(): Promise<Event[]>;
    update(event: Event): Promise<void>;
}
