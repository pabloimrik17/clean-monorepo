export interface UserBackendDto {
    uuid: string;
    name: string;
    email: string;
    hashed_password: string;
}

export type UserCreateBackendDto = Pick<
    UserBackendDto,
    "name" | "email" | "hashed_password"
>;

export interface UserBackendGetQueryParamsDto {
    email: string;
}
