import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, Observable, take } from "rxjs";

import * as fromApp from '../state/app.state'
import { Store } from "@ngrx/store";

@Injectable({
    providedIn: 'root'
})

export class AuthInterceptor implements HttpInterceptor {
    constructor(private store: Store<fromApp.State>) {}

    private urlsToIntercept = [
        'http://localhost:8056/core/api/v1/option' // to be updated
    ]

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store.select('user').pipe(
            take(1),
            map(authState => {
                return authState.user
            }),
            exhaustMap(user => {
                if (!user) {
                    return next.handle(req);
                }
                const modifiedReq = req.clone({headers: new HttpHeaders().set('Authorization', user.token)});
                return next.handle(modifiedReq);
            })
        )
        // if (this.shouldIntercept(req.url)) {
        //     const clonedReq = req.clone({
        //         setHeaders: {
        //             'Authorization': 
        //         }
        //     })
        // }
        
    }

    private shouldIntercept(url: string): boolean {
        return this.urlsToIntercept.some(ulrToIntercept => url.startsWith(ulrToIntercept));
    }
}