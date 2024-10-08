export interface UserFrontendDto {
    uuid: string;
    name: string;
    email: string;
    hashed_password: string;
}

export interface UserFrontendGetQueryParamsDto {
    email: string;
}
