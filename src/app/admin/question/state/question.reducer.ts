import { Action, createFeatureSelector, createSelector } from "@ngrx/store";
import { Option } from "../../models/option.interface";
import * as QuestionActions from "./question.actions";
import { QuestionResponseDto } from "../../dto/question-response.dto";
import { Question } from "../../models/question.interface";

export interface QuestionState {
    questions: Question[];
    categoryId: string | number;
    currentQuestion: Question;
    error: string;
    loading: boolean;
}

const initialState: QuestionState = {
    questions: [],
    categoryId: null,
    currentQuestion: null,
    error: null,
    loading: false
}

export function QuestionReducer(state = initialState, action: Action): QuestionState {
    switch(action.type) {
        case QuestionActions.LOAD_ITEMS_SUCCESS:
            return {
                ...state,
                questions: (action as QuestionActions.LoadItemsSuccessAction).questions,
                categoryId: (action as QuestionActions.LoadItemsSuccessAction).categoryId,
                error: null,
                loading: false
            };
        case QuestionActions.LOAD_ITEM_SUCCESS:
            return {
                ...state,
                currentQuestion: (action as QuestionActions.LoadItemSuccessAction).question,
                error: null,
                loading: false
            };
        case QuestionActions.ADD_ITEM_SUCCESS:
            return {
                ...state,
                questions: [...state.questions, (action as QuestionActions.AddItemActionSuccess).question],
                categoryId: (action as QuestionActions.AddItemActionSuccess).categoryId,
                error: null,
                loading: false
            };
        case QuestionActions.UPDATE_ITEM_SUCCESS:
            const updatedItem = (action as QuestionActions.UpdateItemActionSuccess).question;
            const newState = {
                ...state,
                questions: state.questions.map(question => {
                    if (question.id !=- updatedItem.id) {
                        return question;
                    } else {
                        return updatedItem;
                    }
                })
            };

            if ((action as QuestionActions.UpdateItemActionSuccess).setCurrent) {
                newState.currentQuestion = updatedItem;
            }
            return newState;
        case QuestionActions.DELETE_ITEM_SUCCESS:
            return {
                ...state,
                questions: state.questions.filter(option => option.id !== (action as QuestionActions.DeleteItemSuccessAction).id),
                error: null,
                loading: false
            };
        // case CategoryActions.ADD_ITEM:
        // case CategoryActions.UPDATE_ITEM:
        // case CategoryActions.DELETE_ITEM:
        // case CategoryActions.LOAD_ITEM:
        // case CategoryActions.LOAD_ITEMS:
        //     return {
        //         ...state,
        //         categories: [],
        //         selectedId: null,
        //         selectedCategory: null,
        //         error: null,
        //         loading: true
        //     }
        default:
            return state;
    }
}

export const getQuestionState = createFeatureSelector<QuestionState>('question');
export const getQuestions = createSelector(getQuestionState, (state: QuestionState) => state.questions);
export const getQuestion = createSelector(getQuestionState, (state: QuestionState) => state.currentQuestion);