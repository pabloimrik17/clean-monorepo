import { container } from "@repo/di";
import {
    EventGetByIdUseCase,
    EventListAvailableUseCase,
    ReservationCancelUseCase,
    ReservationCreateUseCase,
    ReservationEditUseCase,
    UserCreateUseCase,
    UserGetReservationsUseCase,
} from "@repo/domain-layer"; // Necesario para inversify
import inquirer from "inquirer";
import "reflect-metadata";

// Función para mostrar el menú principal
const mainMenu = async () => {
    const options = [
        { name: "Obtener Evento por ID", value: "getEventById" },
        { name: "Listar Eventos Disponibles", value: "listAvailableEvents" },
        { name: "Cancelar Reserva", value: "cancelReservation" },
        { name: "Crear Reserva", value: "createReservation" },
        { name: "Editar Reserva", value: "editReservation" },
        { name: "Crear Usuario", value: "createUser" },
        { name: "Obtener Reservas de Usuario", value: "getUserReservations" },
        { name: "Salir", value: "exit" },
    ];

    const { action } = await inquirer.prompt({
        name: "action",
        type: "list",
        message: "Selecciona una opción:",
        choices: options,
    });

    switch (action) {
        case "getEventById":
            await getEventById();
            break;
        case "listAvailableEvents":
            await listAvailableEvents();
            break;
        case "cancelReservation":
            await cancelReservation();
            break;
        case "createReservation":
            await createReservation();
            break;
        case "editReservation":
            await editReservation();
            break;
        case "createUser":
            await createUser();
            break;
        case "getUserReservations":
            await getUserReservations();
            break;
        case "exit":
            console.log("¡Hasta luego!");
            process.exit(0);
        default:
            console.log("Opción no válida.");
            break;
    }

    // Volver a mostrar el menú después de ejecutar una acción
    await mainMenu();
};

// Casos de uso implementados en el menú

const getEventById = async () => {
    const { eventId } = await inquirer.prompt({
        name: "eventId",
        type: "input",
        message: "Ingresa el ID del evento:",
    });

    const eventGetByIdUseCase = container.get<EventGetByIdUseCase>(
        "EventGetByIdUseCase",
    );
    try {
        const event = await eventGetByIdUseCase.execute(eventId);
        console.log(`Evento encontrado: ${event.name}, ${event.description}`);
    } catch (error: any) {
        console.error("Error:", error.message);
    }
};

const listAvailableEvents = async () => {
    const eventListAvailableUseCase = container.get<EventListAvailableUseCase>(
        "EventListAvailableUseCase",
    );
    const events = await eventListAvailableUseCase.execute();
    events.forEach((event) => {
        console.log(`Evento: ${event.name} - ${event.description}`);
    });
};

const cancelReservation = async () => {
    const { reservationId, userId } = await inquirer.prompt([
        {
            name: "reservationId",
            type: "input",
            message: "Ingresa el ID de la reserva:",
        },
        {
            name: "userId",
            type: "input",
            message: "Ingresa el ID del usuario:",
        },
    ]);

    const reservationCancelUseCase = container.get<ReservationCancelUseCase>(
        "ReservationCancelUseCase",
    );
    try {
        await reservationCancelUseCase.execute(reservationId, userId);
        console.log("Reserva cancelada con éxito.");
    } catch (error: any) {
        console.error("Error:", error.message);
    }
};

const createReservation = async () => {
    const { userId, eventId } = await inquirer.prompt([
        {
            name: "userId",
            type: "input",
            message: "Ingresa el ID del usuario:",
        },
        {
            name: "eventId",
            type: "input",
            message: "Ingresa el ID del evento:",
        },
    ]);

    const reservationCreateUseCase = container.get<ReservationCreateUseCase>(
        "ReservationCreateUseCase",
    );
    try {
        const reservation = await reservationCreateUseCase.execute(
            userId,
            eventId,
        );
        console.log(`Reserva creada: ${reservation.id}`);
    } catch (error: any) {
        console.error("Error:", error.message);
    }
};

const editReservation = async () => {
    const { reservationId, userId, newEventId } = await inquirer.prompt([
        {
            name: "reservationId",
            type: "input",
            message: "Ingresa el ID de la reserva:",
        },
        {
            name: "userId",
            type: "input",
            message: "Ingresa el ID del usuario:",
        },
        {
            name: "newEventId",
            type: "input",
            message: "Ingresa el nuevo ID del evento:",
        },
    ]);

    const reservationEditUseCase = container.get<ReservationEditUseCase>(
        "ReservationEditUseCase",
    );
    try {
        await reservationEditUseCase.execute(reservationId, userId, newEventId);
        console.log("Reserva editada con éxito.");
    } catch (error: any) {
        console.error("Error:", error.message);
    }
};

const createUser = async () => {
    const { name, email, password } = await inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "Ingresa el nombre del usuario:",
        },
        {
            name: "email",
            type: "input",
            message: "Ingresa el email del usuario:",
        },
        {
            name: "password",
            type: "password",
            message: "Ingresa la contraseña:",
        },
    ]);

    const userCreateUseCase =
        container.get<UserCreateUseCase>("UserCreateUseCase");
    try {
        const user = await userCreateUseCase.execute(name, email, password);
        console.log(`Usuario creado: ${user.id}`);
    } catch (error: any) {
        console.error("Error:", error.message);
    }
};

const getUserReservations = async () => {
    const { userId } = await inquirer.prompt({
        name: "userId",
        type: "input",
        message: "Ingresa el ID del usuario:",
    });

    const userGetReservationsUseCase =
        container.get<UserGetReservationsUseCase>("UserGetReservationsUseCase");
    const reservations = await userGetReservationsUseCase.execute(userId);
    reservations.forEach((reservation) => {
        console.log(`Reserva: ${reservation.id}, Estado: ${reservation.state}`);
    });
};

// Inicia la aplicación con el menú principal
mainMenu();
