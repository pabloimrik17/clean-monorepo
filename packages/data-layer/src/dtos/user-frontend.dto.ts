export interface UserFrontendDto {
    uuid: string;
    name: string;
    email: string;
    hashed_password: string;
}

export type UserCreateFrontendDto = Pick<
    UserFrontendDto,
    "name" | "email" | "hashed_password"
>;

export interface UserFrontendGetQueryParamsDto {
    email: string;
}
