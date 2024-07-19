import * as AuthActions from "./auth.actions";

export interface UserState {
    token: string | null;
    authError: string;
    loading: boolean;
}

const initialState: UserState = {
    token: null,
    authError: null,
    loading: false
}

export function AuthReducer(state = initialState, action): UserState {
    switch(action.type) {
        case AuthActions.LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                authError: null,
                loading: false
            };
        case AuthActions.LOGIN_FAIL:
            return {
                ...state,
                token: null,
                authError: action.payload,
                loading: false
            };
        case AuthActions.LOGOUT:
            return {
                ...state,
                token: null
            };
        case AuthActions.LOGIN_START:
        case AuthActions.REGISTER_START:
            return {
                ...state,
                authError: null,
                loading: true
            };
        case AuthActions.REGISTER_SUCCESS:
            return {
                ...state,
                authError: null,
                loading: false
            };
        case AuthActions.REGISTER_FAIL:
            return {
                ...state,
                authError: action.payload,
                loading: false
            };
        default:
            return state;
    }
}