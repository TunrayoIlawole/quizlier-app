import { User } from "../user.model";
import * as AuthActions from "./auth.actions";

export interface UserState {
    token: string | null;
    authError: string;
    loading: boolean;
    user: User;
    isAdmin: boolean;
}

const initialState: UserState = {
    token: null,
    authError: null,
    loading: false,
    user: null,
    isAdmin: false
}

export function AuthReducer(state = initialState, action): UserState {
    switch(action.type) {
        case AuthActions.LOGIN_SUCCESS:
            const user = new User(action.payload.email, action.payload.id, action.payload.username, action.payload.token, action.payload.expirationDate);
            return {
                ...state,
                token: action.payload.token,
                authError: null,
                loading: false,
                user: user
            };
        // case AuthActions.LOGIN_FAIL:
        //     return {
        //         ...state,
        //         authError: action.payload,
        //         loading: false
        //     };
        case AuthActions.LOGOUT:
            return {
                ...state,
                token: null,
                user: null
            };
        case AuthActions.LOGIN_START:
        case AuthActions.REGISTER_START:
            return {
                ...state,
                authError: null,
                loading: true,
                isAdmin: false
            };
        case AuthActions.REGISTER_START_ADMIN:
            return {
                ...state,
                authError: null,
                loading: true,
                isAdmin: true
            };
        case AuthActions.REGISTER_SUCCESS:
            return {
                ...state,
                authError: null,
                loading: false
            };
        case AuthActions.AUTH_FAIL:
            return {
                ...state,
                token: null,
                authError: action.payload,
                loading: false
            };
        default:
            return state;
    }
}