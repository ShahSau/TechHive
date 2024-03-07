export interface user {
    firstName: string;
    lastName: string;
    address: string;
    email: string;
    password: string;
    username: string;
}

export interface userLogin {
    email: string;
    password: string;
}

export interface loginToken {
    token: string;
    expiresInSeconds: number;
    user: loggedInUser;
}

export interface loggedInUser {
    firstName: string;
    lastName: string;
    address: string;
    email: string;
    username: string;
    role?: string;
}