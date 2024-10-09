import type { Nullable } from "./nullable.type";

interface Left<L> {
    kind: "left";
    leftValue: L;
}
interface Right<R> {
    kind: "right";
    rightValue: R;
}

type EitherValue<L, R> = Left<L> | Right<R>;

export class Either<L, R> {
    private constructor(private readonly value: EitherValue<L, R>) {}

    isLeft(): boolean {
        return this.value.kind === "left";
    }

    isRight(): boolean {
        return this.value.kind === "right";
    }

    fold<T>(leftFn: (left: L) => T, rightFn: (right: R) => T): T {
        if (this.value.kind === "left") {
            return leftFn(this.value.leftValue);
        }

        return rightFn(this.value.rightValue);
    }

    // eslint-disable-next-line id-denylist,id-length
    map<T>(fn: (r: R) => T): Either<L, T> {
        // eslint-disable-next-line id-length
        return this.flatMap((r) => Either.Right(fn(r)));
    }

    // eslint-disable-next-line id-denylist,id-length
    mapLeft<T>(fn: (l: L) => T): Either<T, R> {
        // eslint-disable-next-line id-length
        return this.flatMapLeft((l) => Either.Left(fn(l)));
    }

    // eslint-disable-next-line id-denylist,id-length
    flatMap<T>(fn: (right: R) => Either<L, T>): Either<L, T> {
        return this.fold(
            (leftValue) => Either.Left(leftValue),
            (rightValue) => fn(rightValue),
        );
    }

    // eslint-disable-next-line id-denylist,id-length
    flatMapLeft<T>(fn: (left: L) => Either<T, R>): Either<T, R> {
        return this.fold(
            (leftValue) => fn(leftValue),
            (rightValue) => Either.Right(rightValue),
        );
    }

    getOrThrow(errorMessage?: string): R {
        const throwFn = (): R => {
            throw Error(
                errorMessage ??
                    `An error has ocurred: ${JSON.stringify(this.value)}`,
            );
        };

        return this.fold(
            () => throwFn(),
            (rightValue) => rightValue,
        );
    }

    getLeftOrThrow(errorMessage?: string): L {
        const throwFn = (): L => {
            throw Error(
                errorMessage ??
                    `An error has ocurred: ${JSON.stringify(this.value)}`,
            );
        };

        return this.fold(
            (leftValue) => leftValue,
            () => throwFn(),
        );
    }

    getOrElse(defaultValue: R): R {
        return this.fold(
            () => defaultValue,
            (someValue) => someValue,
        );
    }

    get left(): Nullable<L> {
        switch (this.value.kind) {
            case "left":
                return this.value.leftValue;
            default:
                return null;
        }
    }

    get right(): Nullable<R> {
        switch (this.value.kind) {
            case "right":
                return this.value.rightValue;
            default:
                return null;
        }
    }

    static Left<L, R>(value: L): Either<L, R> {
        return new Either<L, R>({ kind: "left", leftValue: value });
    }

    static Right<L, R>(value: R): Either<L, R> {
        return new Either<L, R>({ kind: "right", rightValue: value });
    }
}
