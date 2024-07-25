import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { createFeature, Store } from "@ngrx/store";

import * as QuestionActions from './question.actions';
import { catchError, map, mergeMap, of, switchMap } from "rxjs";
import { QuestionResponseDto } from "../../dto/question-response.dto";
import { QuestionRequestDto } from "../../dto/question-request.dto";
import { QuestionService } from "../../services/question.service";


const handleError = (errorRes: any) => {
    let errorMessage = "An unknown error occured";

    if (!errorRes.status || !errorRes.message) {
        return of(new QuestionActions.ErrorResponse(errorMessage));
    }

    // update action to be more general
    return of(new QuestionActions.ErrorResponse(errorRes.message));
}

@Injectable()
export class QuestionEffects {
    constructor(
        private actions$: Actions,
        private questionService: QuestionService,
    ) {}

    createQuestion$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(QuestionActions.ADD_ITEM),
            switchMap((questionAction: QuestionActions.AddItemAction) => {
                return this.questionService.createQuestion(questionAction.question, questionAction.categoryId)
                .pipe(
                    map((resData: QuestionResponseDto) => {
                        return new QuestionActions.AddItemActionSuccess(resData, questionAction.categoryId);
                    }),
                    catchError(errorRes => {
                        return handleError(errorRes)
                    })
                )
            })
        )
        1                                           
    });

    getQuestions$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(QuestionActions.LOAD_ITEMS),
            switchMap((questionAction: QuestionActions.LoadItemsAction) => {
                return this.questionService.getQuestions(questionAction.categoryId)
                .pipe(
                    map((resData: QuestionResponseDto[]) => {
                        return new QuestionActions.LoadItemsSuccessAction(resData, questionAction.categoryId);
                    }),
                    catchError(errorRes => {
                        return handleError(errorRes)
                    })
                )
            })
        )
    });

    getQuestion$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(QuestionActions.LOAD_ITEM),
            switchMap((questionAction: QuestionActions.LoadItemAction) => {
                return this.questionService.getQuestion(questionAction.id)
                .pipe(
                    map((resData: QuestionResponseDto) => {
                        return new QuestionActions.LoadItemSuccessAction(resData);
                    }),
                    catchError(errorRes => {
                        return handleError(errorRes)
                    })
                )
            })
        )
    });

    updateQuestion$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(QuestionActions.UPDATE_ITEM),
            mergeMap((questionAction: QuestionActions.UpdateItemAction) => {
                return this.questionService.updateQuestion(questionAction.id)
                .pipe(
                    map((resData: QuestionResponseDto) => {
                        return new QuestionActions.UpdateItemActionSuccess(resData);
                    }),
                    catchError(errorRes => {
                        return handleError(errorRes);
                    })
                )
            })
        )
    });

    deleteQuestion$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(QuestionActions.DELETE_ITEM),
            switchMap((questionAction: QuestionActions.DeleteItemAction) => {
                return this.questionService.deleteQuestion(questionAction.id)
                .pipe(
                    map((resData: any) => {
                        return new QuestionActions.DeleteItemSuccessAction(resData);
                    }),
                    catchError(errorRes => {
                        return handleError(errorRes)
                    })
                )
            })
        )
    });
}