import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Routes, withComponentInputBinding } from '@angular/router';

import { provideState, provideStore, StoreModule } from '@ngrx/store';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { AuthReducer } from './auth/state/auth.reducer';
import { AuthEffects } from './auth/state/auth.effects';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { provideHttpClient } from '@angular/common/http';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'auth', component: AuthComponent, children: [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }
  ]},
  { path: '**', redirectTo: '' }
]

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideStore(),
    provideState({ name: 'user', reducer: AuthReducer}),
    provideEffects(AuthEffects),
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes, withComponentInputBinding()),
    provideRouterStore()]
};
