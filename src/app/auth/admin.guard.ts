import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { AuthService } from "./auth.service";
import { Store } from "@ngrx/store";

import * as fromApp from '../state/app.state';
import { map, Observable, take } from "rxjs";


@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router, private store: Store<fromApp.State>) {}

    canActivate(): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
        return this.store.select('user').pipe(
            take(1),
            map(authState => {
                return {user : authState.user, isAdmin: authState.isAdmin}
            }),
            map(res => {
                const isAuth = !!res.user;
                if (isAuth && res.isAdmin) {
                    return true;
                }
                return this.router.createUrlTree(['/auth']);
            })
        )
    }


}