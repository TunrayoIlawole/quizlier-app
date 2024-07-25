import { Action } from "@ngrx/store";
import { CategoryRequestDto } from "../../dto/category-request.dto";
import { Category } from "../../models/category.interface";

export const ADD_ITEM = '[Category] Add item';
export const ADD_ITEM_SUCCESS = '[Category] Add item success';
export const UPDATE_ITEM = '[Category] Update item';
export const UPDATE_ITEM_SUCCESS = '[Category] Update item success';
export const DELETE_ITEM = '[Category] Delete item';
export const DELETE_ITEM_SUCCESS = '[Category] Delete item success';
export const LOAD_ITEM = '[Category] Load item';
export const LOAD_ITEM_SUCCESS = '[Category] Load item success';
export const LOAD_ITEMS = '[Category] Load items';
export const LOAD_ITEMS_SUCCESS = '[Category] Load items success';
export const SELECT = '[Category] Select item';
export const ERROR_RESPONSE = '[Category] Error response';


export class AddItemAction implements Action {
    readonly type = ADD_ITEM;

    constructor(public category: CategoryRequestDto) {}
}

export class AddItemActionSuccess implements Action {
    readonly type = ADD_ITEM_SUCCESS;

    constructor(public category: Category) {}
}

export class UpdateItemAction implements Action {
    readonly type = UPDATE_ITEM;

    constructor(public id: number | string, public category: CategoryRequestDto, public setCurrent = false) {}
}

export class UpdateItemActionSuccess implements Action {
    readonly type = UPDATE_ITEM_SUCCESS;

    constructor(public category: Category, public setCurrent = false) {}
}

export class DeleteItemAction implements Action {
    readonly type = DELETE_ITEM;

    constructor(public id: number | string) {}
}

export class DeleteItemSuccessAction implements Action {
    readonly type = DELETE_ITEM_SUCCESS;

    constructor(public id: number | string) {}
}

export class LoadItemAction implements Action {
    readonly type = LOAD_ITEM;

    constructor(public id: number | string) { }
}

export class LoadItemSuccessAction implements Action {
    readonly type = LOAD_ITEM_SUCCESS;

    constructor(public category: Category) {}
}

export class LoadItemsAction implements Action {
    readonly type = LOAD_ITEMS;
}

export class LoadItemsSuccessAction implements Action {
    readonly type = LOAD_ITEMS_SUCCESS;

    constructor(public categories: Category[]) {}
}


export class SelectAction implements Action {
    readonly type = SELECT;
  
    constructor(public payload: number | string) { }
}

export class ErrorResponse implements Action {
    readonly type = ERROR_RESPONSE;
  
    constructor(public error: string) {
    }
  }