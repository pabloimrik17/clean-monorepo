export interface UserBackendDto {
    uuid: string;
    name: string;
    email: string;
    hashed_password: string;
}

export interface UserBackendGetQueryParamsDto {
    email: string;
}
