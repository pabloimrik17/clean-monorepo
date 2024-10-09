export type Nullable<T> = T | null;
export type NonNullable<T> = Exclude<T, null>;

export const isNullable = <T>(value: Nullable<T>): value is null =>
    value === null;
export const isNotNullable = <T>(value: T): value is NonNullable<T> =>
    value !== null;
