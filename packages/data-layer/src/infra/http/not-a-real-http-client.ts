import { HttpClient } from "@repo/domain-layer";
import { injectable } from "inversify";
import { EventDto, EventStateEnumDto } from "../../dtos/event.dto.js";
import {
    ReservationDto,
    ReservationStateEnumDto,
} from "../../dtos/reservation.dto.js";
import { GetUserQueryParamsDto, UserDto } from "../../dtos/user.dto.js";

const events: EventDto[] = [
    {
        uuid: "event-001",
        name: "Tech Conference 2024",
        short_description:
            "An event for tech enthusiasts to explore the future of technology.",
        date: "2024-11-05",
        city: "San Francisco",
        capacity: {
            total: 500,
            available: 200,
        },
        current_state: EventStateEnumDto.Active,
    },
    {
        uuid: "event-002",
        name: "Startup Meetup",
        short_description:
            "A networking event for startup founders and investors.",
        date: "2024-12-01",
        city: "New York",
        capacity: {
            total: 200,
            available: 50,
        },
        current_state: EventStateEnumDto.Finished,
    },
    {
        uuid: "event-003",
        name: "AI Summit 2024",
        short_description:
            "A conference focusing on the latest advancements in AI.",
        date: "2024-10-15",
        city: "London",
        capacity: {
            total: 300,
            available: 0,
        },
        current_state: EventStateEnumDto.Canceled,
    },
];

// Usuarios
const users: UserDto[] = [
    {
        uuid: "user-001",
        name: "John Doe",
        email: "johndoe@example.com",
        hashed_password: "hashedpassword123",
    },
    {
        uuid: "user-002",
        name: "Jane Smith",
        email: "janesmith@example.com",
        hashed_password: "hashedpassword456",
    },
    {
        uuid: "user-003",
        name: "Alice Johnson",
        email: "alicejohnson@example.com",
        hashed_password: "hashedpassword789",
    },
];

// Reservas
const reservations: ReservationDto[] = [
    {
        uuid: "reservation-001",
        user: "user-001", // John Doe
        event: "event-001", // Tech Conference 2024
        booking_date: "2024-09-25",
        current_state: ReservationStateEnumDto.Active,
    },
    {
        uuid: "reservation-002",
        user: "user-002", // Jane Smith
        event: "event-002", // Startup Meetup
        booking_date: "2024-10-30",
        current_state: ReservationStateEnumDto.Active,
    },
    {
        uuid: "reservation-003",
        user: "user-003", // Alice Johnson
        event: "event-003", // AI Summit 2024 (Cancelled event)
        booking_date: "2024-08-15",
        current_state: ReservationStateEnumDto.Canceled,
    },
];

@injectable()
export class NotARealHttpClient implements HttpClient {
    get<R>(url: string, query?: object): Promise<null | R> {
        if (url === "/events/active") {
            return Promise.resolve(
                events.filter(
                    (event) => event.current_state === EventStateEnumDto.Active,
                ),
            ) as Promise<R>;
        } else if (url.includes("/events/")) {
            const uuid = url.split("/")[2];
            return Promise.resolve(
                events.find((event) => event.uuid === uuid) ?? null,
            ) as Promise<null | R>;
        }

        if (url.includes("/reservation/user/")) {
            const userUuid = url.split("/")[3];
            return Promise.resolve(
                reservations.filter(
                    (reservation) => reservation.user === userUuid,
                ),
            ) as Promise<R>;
        } else if (url.includes("/reservation/")) {
            const uuid = url.split("/")[2];
            return Promise.resolve(
                reservations.find((reservation) => reservation.uuid === uuid) ??
                    null,
            ) as Promise<null | R>;
        }

        if (url === "/user") {
            const email = (query as GetUserQueryParamsDto).email;
            const maybeUser = users.find((user) => user.email === email);
            if (!maybeUser) return Promise.resolve(null);

            return Promise.resolve(maybeUser) as Promise<R>;
        }

        return Promise.resolve(null);
    }

    post<R, B>(url: string, body: B): Promise<null | R> {
        return Promise.resolve(null);
    }

    put<R, B>(url: string, body: B): Promise<null | R> {
        if (url.includes("/events/")) {
            const uuid = url.split("/")[2];
            const index = events.findIndex((event) => event.uuid === uuid);
            if (!index) return Promise.resolve(null);

            events[index] = body as EventDto;

            return Promise.resolve(events[index] as unknown as Promise<R>);
        }

        if (url.includes("/reservation/")) {
            const uuid = url.split("/")[2];
            const index = reservations.findIndex(
                (event) => event.uuid === uuid,
            );
            if (!index) return Promise.resolve(null);

            reservations[index] = body as ReservationDto;

            return Promise.resolve(
                reservations[index] as unknown as Promise<R>,
            );
        }

        if (url.includes("/user/")) {
            const uuid = url.split("/")[2];
            const index = users.findIndex((user) => user.uuid === uuid);
            if (!index) return Promise.resolve(null);

            users[index] = body as UserDto;

            return Promise.resolve(users[index] as unknown as Promise<R>);
        }

        return Promise.resolve(null);
    }

    patch<R, B>(url: string, body: B): Promise<null | R> {
        console.log("PATCH: ", url, body);

        return Promise.resolve(null);
    }

    delete<R>(url: string): Promise<null | R> {
        console.log("DELETE: ", url);

        return Promise.resolve(null);
    }
}
