import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CategoryService } from "../../services/category.service";
import { createFeature, Store } from "@ngrx/store";

import * as CategoryActions from './category.actions';
import { catchError, map, mergeMap, of, switchMap } from "rxjs";
import { CategoryResponseDto } from "../../dto/category-response.dto";
import { CategoryRequestDto } from "../../dto/category-request.dto";


const handleError = (errorRes: any) => {
    let errorMessage = "An unknown error occured";

    if (!errorRes.status || !errorRes.message) {
        return of(new CategoryActions.ErrorResponse(errorMessage));
    }

    // update action to be more general
    return of(new CategoryActions.ErrorResponse(errorRes.message));
}

@Injectable()
export class CategoryEffects {
    constructor(
        private actions$: Actions,
        private categoryService: CategoryService,
    ) {}

    createCategory$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CategoryActions.ADD_ITEM),
            switchMap((categoryAction: CategoryActions.AddItemAction) => {
                return this.categoryService.createCategory(categoryAction.category)
                .pipe(
                    map((resData: CategoryResponseDto) => {
                        return new CategoryActions.AddItemActionSuccess(resData);
                    }),
                    catchError(errorRes => {
                        return handleError(errorRes)
                    })
                )
            })
        )
        1                                           
    });

    getCategories$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CategoryActions.LOAD_ITEMS),
            switchMap((categoryAction: CategoryActions.LoadItemsAction) => {
                return this.categoryService.getCategories()
                .pipe(
                    map((resData: CategoryResponseDto[]) => {
                        return new CategoryActions.LoadItemsSuccessAction(resData);
                    }),
                    catchError(errorRes => {
                        return handleError(errorRes)
                    })
                )
            })
        )
    });

    getCategory$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CategoryActions.LOAD_ITEM),
            switchMap((categoryAction: CategoryActions.LoadItemAction) => {
                return this.categoryService.getCategory(categoryAction.id)
                .pipe(
                    map((resData: CategoryResponseDto) => {
                        return new CategoryActions.LoadItemSuccessAction(resData);
                    }),
                    catchError(errorRes => {
                        return handleError(errorRes)
                    })
                )
            })
        )
    });

    updateCategory$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CategoryActions.UPDATE_ITEM),
            mergeMap((categoryAction: CategoryActions.UpdateItemAction) => {
                return this.categoryService.updateCategory(categoryAction.id, categoryAction.category)
                .pipe(
                    map((resData: CategoryResponseDto) => {
                        return new CategoryActions.UpdateItemActionSuccess(resData);
                    }),
                    catchError(errorRes => {
                        return handleError(errorRes);
                    })
                )
            })
        )
    });

    deleteCategory$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(CategoryActions.DELETE_ITEM),
            switchMap((categoryAction: CategoryActions.DeleteItemAction) => {
                return this.categoryService.deleteCategory(categoryAction.id)
                .pipe(
                    map((resData: any) => {
                        return new CategoryActions.DeleteItemSuccessAction(resData);
                    }),
                    catchError(errorRes => {
                        return handleError(errorRes)
                    })
                )
            })
        )
    });
}