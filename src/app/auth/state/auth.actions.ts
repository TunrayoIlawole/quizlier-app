import { Action } from "@ngrx/store";
import { LoginDto } from "../dtos/login.dto";
import { RegisterDto } from "../dtos/register.dto";

export const LOGIN_START = '[Auth] Login Start';
export const LOGIN_SUCCESS = '[Auth] Login';
// export const LOGIN_FAIL = '[Auth] Login Fail';

export const REGISTER_START = '[Auth] Register Start';
export const REGISTER_START_ADMIN = '[Auth] Register Start Admin';
export const REGISTER_SUCCESS = '[Auth] Register';
export const AUTH_FAIL = '[Auth] Auth Fail';

export const LOGOUT = '[Auth] Logout';

export class LoginStart implements Action {
    readonly type = LOGIN_START;

    constructor(public payload: LoginDto) {}
}

export class LoginSuccess implements Action {
    readonly type = LOGIN_SUCCESS;

    constructor(public payload: { 
        email: string,
        id: string,
        username: String,
        token: string,
        expirationDate: Date,
        redirect: boolean
    }) {}
}

export class LoginFail implements Action {
    readonly type = LOGIN_SUCCESS;

    constructor(public payload: string) {}
}

export class RegisterStart implements Action {
    readonly type = REGISTER_START;

    constructor(public payload: {
        registerDto: RegisterDto,
        isAdmin: boolean
    }) {}
}

export class RegisterStartAdmin implements Action {
    readonly type = REGISTER_START_ADMIN;

    constructor(public payload: {
        registerDto: RegisterDto,
        isAdmin: boolean
    }) {}
}

export class RegisterSuccess implements Action {
    readonly type = REGISTER_SUCCESS;
}

export class AuthFail implements Action {
    readonly type = AUTH_FAIL;

    constructor(public payload: string) {}
}

export class Logout implements Action {
    readonly type = LOGOUT;
}