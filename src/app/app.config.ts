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
import { CategoryComponent } from './admin/category/category.component';
import { AdminComponent } from './admin/admin.component';
import { CategoryListComponent } from './admin/category/components/list/list.component';
import { CategoryCreateOrEditComponent } from './admin/category/components/create-or-edit/create-or-edit.component';
import { CategoryDetailsComponent } from './admin/category/components/details/details.component';
import { QuestionCreateEditComponent } from './admin/question/components/question-create-edit/question-create-edit.component';
import { QuestionDetailsComponent } from './admin/question/components/question-details/question-details.component';
import { OptionCreateEditComponent } from './admin/option/components/option-create-edit/option-create-edit.component';
import { CategoryEffects } from './admin/category/state/category.effects';
import { QuestionEffects } from './admin/question/state/question.effects';
import { OptionEffects } from './admin/option/state/options.effects';
import { CategoryReducer } from './admin/category/state/category.reducer';
import { QuestionReducer } from './admin/question/state/question.reducer';
import { OptionReducer } from './admin/option/state/options.reducer';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'auth', component: AuthComponent, children: [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }
  ]},
  { path: 'admin', component: AdminComponent },
  { path: 'categories', component: CategoryComponent, children: [
    { path: '', component: CategoryListComponent },
    { path: 'create', component: CategoryCreateOrEditComponent },
    { path: ':id', component: CategoryDetailsComponent },
    { path: ':id/edit', component: CategoryCreateOrEditComponent },
    { path: ':id/questions/create', component: QuestionCreateEditComponent },
    { path: ':id/questions/:questionId', component: QuestionDetailsComponent },
    { path: ':id/questions/:questionId/edit', component: QuestionCreateEditComponent },
    { path: ':id/questions/:questionId/options/create', component: OptionCreateEditComponent },
    { path: ':id/questions/:questionId/options/:optionId/edit', component: OptionCreateEditComponent },

  ]},
  { path: '**', redirectTo: '' }
]

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideStore(),
    provideState({ name: 'user', reducer: AuthReducer}),
    provideState({ name: 'category', reducer: CategoryReducer}),
    provideState({ name: 'question', reducer: QuestionReducer}),
    provideState({ name: 'option', reducer: OptionReducer}),
    provideEffects(AuthEffects, CategoryEffects, QuestionEffects, OptionEffects),
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes, withComponentInputBinding()),
    provideRouterStore()]
};
