import { HttpClient } from "@repo/domain-layer";
import { injectable } from "inversify";
import { EventApiDto, EventApiStateEnumDto } from "../../dtos/event-api.dto";
import {
    ReservationApiDto,
    ReservationApiStateEnumDto,
} from "../../dtos/reservation-api.dto";
import { UserApiDto, UserApiGetQueryParamsDto } from "../../dtos/user-api.dto";

// Eventos
const events: EventApiDto[] = [
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
        current_state: EventApiStateEnumDto.Active,
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
        current_state: EventApiStateEnumDto.Finished,
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
        current_state: EventApiStateEnumDto.Canceled,
    },
    {
        uuid: "event-004",
        name: "Music Festival 2024",
        short_description:
            "A festival featuring live music from various genres.",
        date: "2024-09-20",
        city: "Los Angeles",
        capacity: {
            total: 1000,
            available: 250,
        },
        current_state: EventApiStateEnumDto.Active,
    },
    {
        uuid: "event-005",
        name: "Health and Wellness Expo",
        short_description:
            "An expo showcasing the latest in health and wellness.",
        date: "2024-10-10",
        city: "Chicago",
        capacity: {
            total: 800,
            available: 600,
        },
        current_state: EventApiStateEnumDto.Active,
    },
    {
        uuid: "event-006",
        name: "Art Exhibition: Modern Wonders",
        short_description: "Explore contemporary art from around the globe.",
        date: "2024-10-25",
        city: "Miami",
        capacity: {
            total: 300,
            available: 100,
        },
        current_state: EventApiStateEnumDto.Active,
    },
    {
        uuid: "event-007",
        name: "Blockchain Summit 2024",
        short_description:
            "A summit discussing the future of blockchain technology.",
        date: "2024-11-15",
        city: "Austin",
        capacity: {
            total: 400,
            available: 150,
        },
        current_state: EventApiStateEnumDto.Active,
    },
    {
        uuid: "event-008",
        name: "Cooking Masterclass",
        short_description: "Learn cooking skills from professional chefs.",
        date: "2024-09-30",
        city: "Seattle",
        capacity: {
            total: 50,
            available: 10,
        },
        current_state: EventApiStateEnumDto.Active,
    },
    {
        uuid: "event-009",
        name: "Film Screening: Indie Night",
        short_description: "A night dedicated to independent filmmakers.",
        date: "2024-10-05",
        city: "Boston",
        capacity: {
            total: 150,
            available: 0,
        },
        current_state: EventApiStateEnumDto.Finished,
    },
    {
        uuid: "event-010",
        name: "Outdoor Adventure Retreat",
        short_description:
            "Join us for a weekend of outdoor activities and adventure.",
        date: "2024-12-10",
        city: "Denver",
        capacity: {
            total: 200,
            available: 80,
        },
        current_state: EventApiStateEnumDto.Active,
    },
];

// Usuarios
const users: UserApiDto[] = [
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
    {
        uuid: "user-004",
        name: "Michael Brown",
        email: "michaelbrown@example.com",
        hashed_password: "hashedpassword101",
    },
    {
        uuid: "user-005",
        name: "Emily Davis",
        email: "emilydavis@example.com",
        hashed_password: "hashedpassword102",
    },
    {
        uuid: "user-006",
        name: "Chris Wilson",
        email: "chriswilson@example.com",
        hashed_password: "hashedpassword103",
    },
    {
        uuid: "user-007",
        name: "Olivia Garcia",
        email: "oliviagarcia@example.com",
        hashed_password: "hashedpassword104",
    },
    {
        uuid: "user-008",
        name: "James Martinez",
        email: "jamesmartinez@example.com",
        hashed_password: "hashedpassword105",
    },
    {
        uuid: "user-009",
        name: "Sophia Rodriguez",
        email: "sophiarodriguez@example.com",
        hashed_password: "hashedpassword106",
    },
    {
        uuid: "user-010",
        name: "Liam Hernandez",
        email: "liamhernandez@example.com",
        hashed_password: "hashedpassword107",
    },
];

// Reservas
const reservations: ReservationApiDto[] = [
    {
        uuid: "reservation-001",
        user: "user-001", // John Doe
        event: "event-001", // Tech Conference 2024
        booking_date: "2024-09-25",
        current_state: ReservationApiStateEnumDto.Active,
    },
    {
        uuid: "reservation-002",
        user: "user-002", // Jane Smith
        event: "event-002", // Startup Meetup
        booking_date: "2024-10-30",
        current_state: ReservationApiStateEnumDto.Active,
    },
    {
        uuid: "reservation-003",
        user: "user-003", // Alice Johnson
        event: "event-003", // AI Summit 2024 (Cancelled event)
        booking_date: "2024-08-15",
        current_state: ReservationApiStateEnumDto.Canceled,
    },
    {
        uuid: "reservation-004",
        user: "user-004", // Michael Brown
        event: "event-004", // Music Festival 2024
        booking_date: "2024-09-01",
        current_state: ReservationApiStateEnumDto.Active,
    },
    {
        uuid: "reservation-005",
        user: "user-005", // Emily Davis
        event: "event-005", // Health and Wellness Expo
        booking_date: "2024-09-15",
        current_state: ReservationApiStateEnumDto.Active,
    },
    {
        uuid: "reservation-006",
        user: "user-006", // Chris Wilson
        event: "event-006", // Art Exhibition: Modern Wonders
        booking_date: "2024-09-18",
        current_state: ReservationApiStateEnumDto.Active,
    },
    {
        uuid: "reservation-007",
        user: "user-007", // Olivia Garcia
        event: "event-007", // Blockchain Summit 2024
        booking_date: "2024-09-20",
        current_state: ReservationApiStateEnumDto.Active,
    },
    {
        uuid: "reservation-008",
        user: "user-008", // James Martinez
        event: "event-008", // Cooking Masterclass
        booking_date: "2024-09-22",
        current_state: ReservationApiStateEnumDto.Active,
    },
    {
        uuid: "reservation-009",
        user: "user-009", // Sophia Rodriguez
        event: "event-009", // Film Screening: Indie Night (Finished event)
        booking_date: "2024-09-25",
        current_state: ReservationApiStateEnumDto.Canceled,
    },
    {
        uuid: "reservation-010",
        user: "user-010", // Liam Hernandez
        event: "event-010", // Outdoor Adventure Retreat
        booking_date: "2024-09-28",
        current_state: ReservationApiStateEnumDto.Active,
    },
];

@injectable()
export class NotARealHttpClient implements HttpClient {
    get<R>(url: string, query?: object): Promise<null | R> {
        if (url === "/events/active") {
            return Promise.resolve(
                events.filter(
                    (event) =>
                        event.current_state === EventApiStateEnumDto.Active,
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
            const email = (query as UserApiGetQueryParamsDto).email;
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

            events[index] = body as EventApiDto;

            return Promise.resolve(events[index] as unknown as Promise<R>);
        }

        if (url.includes("/reservation/")) {
            const uuid = url.split("/")[2];
            const index = reservations.findIndex(
                (event) => event.uuid === uuid,
            );
            if (!index) return Promise.resolve(null);

            reservations[index] = body as ReservationApiDto;

            return Promise.resolve(
                reservations[index] as unknown as Promise<R>,
            );
        }

        if (url.includes("/user/")) {
            const uuid = url.split("/")[2];
            const index = users.findIndex((user) => user.uuid === uuid);
            if (!index) return Promise.resolve(null);

            users[index] = body as UserApiDto;

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
