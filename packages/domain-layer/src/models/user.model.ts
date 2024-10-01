export class UnauthorizedAccessException extends Error {
    constructor() {
        super("Unauthorized access");
    }
}

export class EmailAlreadyRegisteredException extends Error {
    constructor() {
        super("The email is already registered");
    }
}

interface UserProps {
    id: string;
    name: string;
    email: string;
    passwordHash: string;
}

export class User {
    get id(): string {
        return this.props.id;
    }

    get name(): string {
        return this.props.name;
    }

    get email(): string {
        return this.props.email;
    }

    get passwordHash(): string {
        return this.props.passwordHash;
    }

    constructor(private readonly props: UserProps) {}

    verifyPassword(password: string): boolean {
        return this.hash(password) === this.passwordHash;
    }

    private hash(password: string): string {
        // Simple hash implementation (for example purposes)
        return password.split("").reverse().join("");
    }
}
