import { Action } from "@ngrx/store";
import { QuestionRequestDto } from "../../dto/question-request.dto";
import { Question } from "../../models/question.interface";
import { QuestionResponseDto } from "../../dto/question-response.dto";

export const ADD_ITEM = '[Question] Add item';
export const ADD_ITEM_SUCCESS = '[Question] Add item success';
export const UPDATE_ITEM = '[Question] Update item';
export const UPDATE_ITEM_SUCCESS = '[Question] Update item success';
export const DELETE_ITEM = '[Question] Delete item';
export const DELETE_ITEM_SUCCESS = '[Question] Delete item success';
export const LOAD_ITEM = '[Question] Load item';
export const LOAD_ITEM_SUCCESS = '[Question] Load item success';
export const LOAD_ITEMS = '[Question] Load items';
export const LOAD_ITEMS_SUCCESS = '[Question] Load items success';
export const SELECT = '[Question] Select item';
export const ERROR_RESPONSE = '[Category] Error response';


export class AddItemAction implements Action {
    readonly type = ADD_ITEM;

    constructor(public question: QuestionRequestDto, public categoryId: string | number) {}
}

export class AddItemActionSuccess implements Action {
    readonly type = ADD_ITEM_SUCCESS;

    constructor(public question: QuestionResponseDto, public categoryId: string | number) {}
}

export class UpdateItemAction implements Action {
    readonly type = UPDATE_ITEM;

    constructor(public id: string | number, public question: QuestionRequestDto, public setCurrent = false) {}
}

export class UpdateItemActionSuccess implements Action {
    readonly type = UPDATE_ITEM_SUCCESS;

    constructor(public question: QuestionResponseDto, public setCurrent = false) {}
}

export class DeleteItemAction implements Action {
    readonly type = DELETE_ITEM;

    constructor(public id: number) {}
}

export class DeleteItemSuccessAction implements Action {
    readonly type = DELETE_ITEM_SUCCESS;

    constructor(public id: number) {}
}

export class LoadItemAction implements Action {
    readonly type = LOAD_ITEM;

    constructor(public id: number) { }
}

export class LoadItemSuccessAction implements Action {
    readonly type = LOAD_ITEM_SUCCESS;

    constructor(public question: QuestionResponseDto) {}
}

export class LoadItemsAction implements Action {
    readonly type = LOAD_ITEMS;

    constructor(public categoryId: string | number) {}
}

export class LoadItemsSuccessAction implements Action {
    readonly type = LOAD_ITEMS_SUCCESS;

    constructor(public questions: QuestionResponseDto[], public categoryId: string | number) {}
}

export class ErrorResponse implements Action {
    readonly type = ERROR_RESPONSE;
  
    constructor(public error: string) {}
}