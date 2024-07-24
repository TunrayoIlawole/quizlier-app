import { Action } from "@ngrx/store";
import { QuestionRequestDto } from "../../dto/question-request.dto";
import { Question } from "../../models/question.interface";

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

export class AddItemAction implements Action {
    readonly type = ADD_ITEM;

    constructor(public category: QuestionRequestDto) {}
}

export class AddItemActionSuccess implements Action {
    readonly type = ADD_ITEM_SUCCESS;

    constructor(public category: QuestionRequestDto) {}
}

export class UpdateItemAction implements Action {
    readonly type = UPDATE_ITEM;

    constructor(public category: QuestionRequestDto) {}
}

export class UpdateItemActionSuccess implements Action {
    readonly type = UPDATE_ITEM_SUCCESS;

    constructor(public category: QuestionRequestDto) {}
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

    constructor(public category: Question) {}
}

export class LoadItemsAction implements Action {
    readonly type = LOAD_ITEMS;
}

export class LoadItemsSuccessAction implements Action {
    readonly type = LOAD_ITEMS_SUCCESS;

    constructor(public payload: Question[]) {}
}