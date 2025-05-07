export type User = {
    name?: string,
    email?: string,
    password?: string;
}

export type UserLogin = {
    email?: string,
    password?: string;
}

export type AccessToken = {
    accessToken?: string;
}

export type UserSessionToken = {
    name?: string,
    email?: string,
    accessToken?: string;
    expiration?: number;
}