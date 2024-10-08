import { date, integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    name: text("name"),
    email: text("email"),
    passwordHash: text("password_hash"),
});

export const events = pgTable("events", {
    id: serial("id").primaryKey(),
    name: text("name"),
    description: text("description"),
    date: text("date"),
    location: text("location"),
    totalCapacity: integer("total_capacity"),
    availableCapacity: integer("available_capacity"),
    state: text("state", { enum: ["active", "cancelled", "finished"] }),
});

export const reservations = pgTable("reservations", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").references(() => users.id),
    eventId: integer("event_id").references(() => events.id),
    reservationDate: date("reservation_date"),
    state: text("state", { enum: ["active", "cancelled"] }),
});

export const databaseSchema = {
    users,
    events,
    reservations,
};
