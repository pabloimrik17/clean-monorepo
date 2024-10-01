export interface UserDto {
    uuid: string;
    name: string;
    email: string;
    hashed_password: string;
}

export interface GetUserQueryParamsDto {
    email: string;
}
