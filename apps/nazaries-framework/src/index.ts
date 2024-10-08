import { frontendContainer } from "@repo/di";
import {
    EventGetByIdUseCase,
    EventListAvailableUseCase,
    ReservationCancelUseCase,
    ReservationCreateUseCase,
    ReservationEditUseCase,
    UserCreateUseCase,
    UserGetReservationsUseCase,
} from "@repo/domain-layer";
import chalk from "chalk";
import Table from "cli-table3"; // Para mostrar tablas
import figlet from "figlet";
import inquirer from "inquirer";
import ora from "ora";
import "reflect-metadata";

// Color de la empresa (ajustado para mayor contraste en fondo negro)
const primaryColor = "#00A4F4"; // Azul más claro para mejor contraste
const secondaryColor = "#FFFFFF"; // Blanco para mayor contraste

// Función para mostrar splash screen con colores mejorados
const showSplashScreen = () => {
    console.log(
        chalk.hex(primaryColor)(
            figlet.textSync("Nazaries Framework", { horizontalLayout: "full" }),
        ),
    );
    console.log(
        chalk.hex(secondaryColor)(
            "Bienvenido al sistema de gestión de eventos y reservas.\n",
        ),
    );
};

// Función para simular un delay asincrónico (aleatorio)
const randomDelay = () => {
    return new Promise((resolve) =>
        setTimeout(resolve, Math.random() * 2000 + 1000),
    ); // Delay entre 1 y 3 segundos
};

// Mostrar un spinner mientras se ejecuta alguna acción con animaciones (barra de progreso)
const withLoading = async (fn: () => Promise<void>, message: string) => {
    const spinner = ora({
        text: message,
        spinner: {
            interval: 100, // Velocidad del cambio en ms
            frames: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"], // Animación estilo "dots"
        },
    }).start();

    await randomDelay(); // Simular delay asincrónico para realismo

    try {
        await fn();
        spinner.succeed(chalk.green("¡Éxito!"));
    } catch (error: any) {
        spinner.fail(chalk.red("Error: " + error.message));
    }
};

// Función para imprimir separadores y secciones visuales
const printSeparator = () => {
    console.log(chalk.hex(primaryColor)("=".repeat(60)));
};

const printSectionTitle = (title: string) => {
    printSeparator();
    console.log(chalk.hex(primaryColor)(`== ${title.toUpperCase()} ==`));
    printSeparator();
};

// Función para mostrar tabla
const printEventsTable = (events: any[]) => {
    const table = new Table({
        head: ["ID", "Nombre", "Descripción"],
        colWidths: [15, 30, 50],
        style: { head: [primaryColor], border: ["grey"] },
    });

    events.forEach((event) => {
        table.push([event.id, event.name, event.description]);
    });

    console.log(table.toString());
};

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
            console.log(chalk.hex(primaryColor)("¡Hasta luego!"));
            process.exit(0);
        default:
            console.log(chalk.red("Opción no válida."));
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

    await withLoading(async () => {
        const eventGetByIdUseCase = frontendContainer.get<EventGetByIdUseCase>(
            "EventGetByIdUseCase",
        );
        const eventResult = await eventGetByIdUseCase.execute(eventId);
        if (eventResult.isLeft()) {
            const error = eventResult.getLeftOrThrow();
            console.log(chalk.red(`Error: ${error.message}`));
            return;
        }

        const event = eventResult.getOrThrow();
        console.log(
            chalk.green(
                `Evento encontrado: ${event.name}, ${event.description}`,
            ),
        );
    }, "Buscando evento...");
};

const listAvailableEvents = async () => {
    await withLoading(async () => {
        const eventListAvailableUseCase =
            frontendContainer.get<EventListAvailableUseCase>(
                "EventListAvailableUseCase",
            );
        const events = await eventListAvailableUseCase.execute();
        printSectionTitle("Eventos Disponibles");
        printEventsTable(events);
    }, "Listando eventos disponibles...");
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

    await withLoading(async () => {
        const reservationCancelUseCase =
            frontendContainer.get<ReservationCancelUseCase>(
                "ReservationCancelUseCase",
            );
        await reservationCancelUseCase.execute(reservationId, userId);
        console.log(chalk.green("Reserva cancelada con éxito."));
    }, "Cancelando reserva...");
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

    await withLoading(async () => {
        const reservationCreateUseCase =
            frontendContainer.get<ReservationCreateUseCase>(
                "ReservationCreateUseCase",
            );
        const reservation = await reservationCreateUseCase.execute(
            userId,
            eventId,
        );
        console.log(chalk.green(`Reserva creada: ${reservation.id}`));
    }, "Creando reserva...");
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

    await withLoading(async () => {
        const reservationEditUseCase =
            frontendContainer.get<ReservationEditUseCase>(
                "ReservationEditUseCase",
            );
        await reservationEditUseCase.execute(reservationId, userId, newEventId);
        console.log(chalk.green("Reserva editada con éxito."));
    }, "Editando reserva...");
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

    await withLoading(async () => {
        const userCreateUseCase =
            frontendContainer.get<UserCreateUseCase>("UserCreateUseCase");
        const user = await userCreateUseCase.execute(name, email, password);
        console.log(chalk.green(`Usuario creado: ${user.id}`));
    }, "Creando usuario...");
};

const getUserReservations = async () => {
    const { userId } = await inquirer.prompt({
        name: "userId",
        type: "input",
        message: "Ingresa el ID del usuario:",
    });

    await withLoading(async () => {
        const userGetReservationsUseCase =
            frontendContainer.get<UserGetReservationsUseCase>(
                "UserGetReservationsUseCase",
            );
        const reservations = await userGetReservationsUseCase.execute(userId);
        printSectionTitle("Reservas del Usuario");

        const table = new Table({
            head: ["ID Reserva", "Estado"],
            colWidths: [15, 20],
            style: { head: [primaryColor], border: ["grey"] },
        });

        reservations.forEach((reservation) => {
            table.push([reservation.id, reservation.state]);
        });

        console.log(table.toString());
    }, "Obteniendo reservas del usuario...");
};

// Inicia la aplicación con el splash screen y luego el menú principal
showSplashScreen();
mainMenu();
