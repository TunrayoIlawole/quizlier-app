import { Action } from "@ngrx/store";
import { OptionRequestDto } from "../../dto/option-request.dto";
import { Option } from "../../models/option.interface";
import { OptionResponseDto } from "../../dto/option-response.dto";

export const ADD_ITEM = '[Option] Add item';
export const ADD_ITEM_SUCCESS = '[Option] Add item success';
export const UPDATE_ITEM = '[Option] Update item';
export const UPDATE_ITEM_SUCCESS = '[Option] Update item success';
export const DELETE_ITEM = '[Option] Delete item';
export const DELETE_ITEM_SUCCESS = '[Option] Delete item success';
export const LOAD_ITEM = '[Option] Load item';
export const LOAD_ITEM_SUCCESS = '[Option] Load item success';
export const LOAD_ITEMS = '[Option] Load items';
export const LOAD_ITEMS_SUCCESS = '[Option] Load items success';
export const SELECT = '[Option] Select item';
export const ERROR_RESPONSE = '[Category] Error response';


export class AddItemAction implements Action {
    readonly type = ADD_ITEM;

    constructor(public option: OptionRequestDto, public questionId: string | number) {}
}

export class AddItemActionSuccess implements Action {
    readonly type = ADD_ITEM_SUCCESS;

    constructor(public option: Option, public questionId: string | number) {}
}

export class UpdateItemAction implements Action {
    readonly type = UPDATE_ITEM;

    constructor(public option: OptionRequestDto, public id: string | number, public setCurrent = false) {}
}

export class UpdateItemActionSuccess implements Action {
    readonly type = UPDATE_ITEM_SUCCESS;

    constructor(public option: Option, public setCurrent = false) {}
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

    constructor(public option: Option) {}
}

export class LoadItemsAction implements Action {
    readonly type = LOAD_ITEMS;

    constructor(public questionId: string | number) {}
}

export class LoadItemsSuccessAction implements Action {
    readonly type = LOAD_ITEMS_SUCCESS;

    constructor(public payload: Option[], public questionId: string | number) {}
}


export class SelectAction implements Action {
    readonly type = SELECT;
  
    constructor(public payload: number) { }
}

export class ErrorResponse implements Action {
    readonly type = ERROR_RESPONSE;
  
    constructor(public error: string) {}
}