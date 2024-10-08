export interface UserApiDto {
    uuid: string;
    name: string;
    email: string;
    hashed_password: string;
}

export interface UserApiGetQueryParamsDto {
    email: string;
}
