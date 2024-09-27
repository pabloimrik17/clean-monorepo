import { DateTime } from "luxon";

type EventStateEnum = "active" | "cancelled" | "finished";

export class InsufficientCapacityException extends Error {
    constructor() {
        super("Not enough available capacity.");
    }
}

export class CapacityExceededException extends Error {
    constructor() {
        super("Capacity exceeds the maximum allowed.");
    }
}

interface EventProps {
    id: string;
    name: string;
    description: string;
    date: DateTime;
    location: string;
    totalCapacity: number;
    availableCapacity: number;
    state: EventStateEnum;
}

export class Event {
    get id(): string {
        return this.props.id;
    }

    get name(): string {
        return this.props.name;
    }

    get description(): string {
        return this.props.description;
    }

    get date(): DateTime {
        return this.props.date;
    }

    get location(): string {
        return this.props.location;
    }

    get totalCapacity(): number {
        return this.props.totalCapacity;
    }

    get availableCapacity(): number {
        return this.props.availableCapacity;
    }

    get state(): EventStateEnum {
        return this.props.state;
    }

    constructor(private readonly props: Readonly<EventProps>) {}

    decreaseCapacity(amount: number = 1): Event {
        if (this.availableCapacity - amount < 0) {
            throw new InsufficientCapacityException();
        }

        return new Event({
            ...this.props,
            availableCapacity: this.availableCapacity - amount,
        });
    }

    increaseCapacity(amount: number = 1): Event {
        if (this.availableCapacity + amount > this.totalCapacity) {
            throw new CapacityExceededException();
        }

        return new Event({
            ...this.props,
            availableCapacity: this.availableCapacity + amount,
        });
    }

    isActive(): boolean {
        return this.state === "active" && this.date > DateTime.now();
    }
}
