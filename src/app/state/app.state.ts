import { ActionReducerMap } from "@ngrx/store";
import * as fromAuth from '../auth/state/auth.reducer'

export interface State {
    user: fromAuth.UserState;

}

export const appReducers: ActionReducerMap<State> = {
    user: fromAuth.AuthReducer
    
}