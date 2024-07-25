import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { createFeature, Store } from "@ngrx/store";

import * as OptionsActions from './option.actions';
import { catchError, map, mergeMap, of, switchMap } from "rxjs";
import { OptionResponseDto } from "../../dto/option-response.dto";
import { OptionRequestDto } from "../../dto/option-request.dto";
import { OptionService } from "../../services/option.service";


const handleError = (errorRes: any) => {
    let errorMessage = "An unknown error occured";

    if (!errorRes.status || !errorRes.message) {
        return of(new OptionsActions.ErrorResponse(errorMessage));
    }

    // update action to be more general
    return of(new OptionsActions.ErrorResponse(errorRes.message));
}

@Injectable()
export class OptionEffects {
    constructor(
        private actions$: Actions,
        private optionService: OptionService,
    ) {}

    createOption$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(OptionsActions.ADD_ITEM),
            switchMap((optionAction: OptionsActions.AddItemAction) => {
                return this.optionService.createOption(optionAction.option, optionAction.questionId)
                .pipe(
                    map((resData: OptionResponseDto) => {
                        return new OptionsActions.AddItemActionSuccess(resData, optionAction.questionId);
                    }),
                    catchError(errorRes => {
                        return handleError(errorRes)
                    })
                )
            })
        )
        1                                           
    });

    getOptions$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(OptionsActions.LOAD_ITEMS),
            switchMap((optionAction: OptionsActions.LoadItemsAction) => {
                return this.optionService.getOptions(optionAction.questionId)
                .pipe(
                    map((resData: OptionResponseDto[]) => {
                        return new OptionsActions.LoadItemsSuccessAction(resData, optionAction.questionId);
                    }),
                    catchError(errorRes => {
                        return handleError(errorRes)
                    })
                )
            })
        )
    });

    getOption$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(OptionsActions.LOAD_ITEM),
            switchMap((optionAction: OptionsActions.LoadItemAction) => {
                return this.optionService.getOption(optionAction.id)
                .pipe(
                    map((resData: OptionResponseDto) => {
                        return new OptionsActions.LoadItemSuccessAction(resData);
                    }),
                    catchError(errorRes => {
                        return handleError(errorRes)
                    })
                )
            })
        )
    });

    updateOption$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(OptionsActions.UPDATE_ITEM),
            mergeMap((optionAction: OptionsActions.UpdateItemAction) => {
                return this.optionService.updateOption(optionAction.id)
                .pipe(
                    map((resData: OptionResponseDto) => {
                        return new OptionsActions.UpdateItemActionSuccess(resData);
                    }),
                    catchError(errorRes => {
                        return handleError(errorRes);
                    })
                )
            })
        )
    });

    deleteOption$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(OptionsActions.DELETE_ITEM),
            switchMap((optionAction: OptionsActions.DeleteItemAction) => {
                return this.optionService.deleteOption(optionAction.id)
                .pipe(
                    map((resData: any) => {
                        return new OptionsActions.DeleteItemSuccessAction(resData);
                    }),
                    catchError(errorRes => {
                        return handleError(errorRes)
                    })
                )
            })
        )
    });
}