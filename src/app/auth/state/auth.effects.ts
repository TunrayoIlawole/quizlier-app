import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../auth.service";
import * as AuthActions from "./auth.actions";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { User } from "../user.model";
import { RegisterResponseDto } from "../dtos/register-response.dto";
import { LoginResponseDto } from "../dtos/login-response.dto";
import { Router } from "@angular/router";

const handleAuthentication = (expiresIn: Date, email: string, username: string, id: string, token: string ) => {
    const expirationDate = expiresIn;

    const user = new User(email, id, username, token, expirationDate);
    localStorage.setItem('userData', JSON.stringify(user));

    return new AuthActions.LoginSuccess({
        email: email,
        id: id,
        token: token,
        expirationDate: expirationDate,
        redirect: true
    });
}

const handleError = (errorRes: any) => {
    let errorMessage = "An unknown error occured";

    if (!errorRes.status || !errorRes.message) {
        return of(new AuthActions.AuthFail(errorMessage));
    }

    // update action to be more general
    return of(new AuthActions.AuthFail(errorRes.message));
}

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions, 
        private http: HttpClient, 
        private authService: AuthService, 
        private router: Router
    ) {}
    authSignup$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.REGISTER_START),
            switchMap((signupAction: AuthActions.RegisterStart) => {
                return this.authService.register(signupAction.payload, false)
                .pipe(
                    map((resData: RegisterResponseDto) => {
                        return new AuthActions.RegisterSuccess();
                    }),
                    catchError(errorRes => {
                        return handleError(errorRes)
                    })
                )
            })
        )
    });

    authSignupAdmin$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.REGISTER_START_ADMIN),
            switchMap((signupAction: AuthActions.RegisterStartAdmin) => {
                return this.authService.register(signupAction.payload, true)
                .pipe(
                    tap(() => console.log("It got to the effect")),
                    map((resData: RegisterResponseDto) => {
                        return new AuthActions.RegisterSuccess();
                    }),
                    catchError(errorRes => {
                        return handleError(errorRes)
                    })
                )
            })
        )
    });

    authLogin$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.LOGIN_START),
            switchMap((authData: AuthActions.LoginStart) => {
                return this.authService.login(authData.payload)
                .pipe(
                    map((resData: LoginResponseDto) => {
                        return handleAuthentication(this.authService.getTokenExpirationDate(), resData.data.email, resData.data.username, resData.data.id, resData.data.token)
                    }),
                    catchError(errorRes => {
                        return handleError(errorRes)
                    })
                )
            })
        )
    });

    authSignupSuccess$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.REGISTER_SUCCESS),
            tap((authSuccessAction: AuthActions.RegisterSuccess) => {
                // do somthing here : redirect to sign in page maybe
                this.router.navigate(['/login']);
            })
        )
    })

    authLoginSucess$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.LOGIN_SUCCESS),
            tap((authSuccessAction: AuthActions.LoginSuccess) => {
                if (authSuccessAction.payload.redirect) {
                    // redirect to quiz start page
                }
            })
        )
    })

    authLogout$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.LOGOUT),
            tap(() => {
                localStorage.removeItem('userData');
                this.router.navigate(['/auth'])
            })
        )
    }, {dispatch: false}
);
}