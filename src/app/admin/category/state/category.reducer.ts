import { Action } from "@ngrx/store";
import { Category } from "../../models/category.interface";
import * as CategoryActions from "./category.actions";
import { act } from "@ngrx/effects";

export interface CategoryState {
    categories: Category[];
    currentCategory: Category
    error: string;
    loading: boolean;
}

const initialState: CategoryState = {
    categories: [],
    currentCategory: null,
    error: null,
    loading: false
}

export function CategoryReducer(state = initialState, action: Action): CategoryState {
    switch(action.type) {
        case CategoryActions.LOAD_ITEMS_SUCCESS:
            return {
                ...state,
                categories: (action as CategoryActions.LoadItemsSuccessAction).categories || [],
                error: null,
                loading: false
            };
        case CategoryActions.LOAD_ITEM_SUCCESS:
            return {
                ...state,
                currentCategory: (action as CategoryActions.LoadItemSuccessAction).category,
                error: null,
                loading: false
            };
        case CategoryActions.ADD_ITEM_SUCCESS:
            return {
                ...state,
                categories: [...state.categories, (action as CategoryActions.AddItemActionSuccess).category],
                error: null,
                loading: false
            };
        case CategoryActions.UPDATE_ITEM_SUCCESS:
            const updatedItem = (action as CategoryActions.UpdateItemActionSuccess).category;
            const newState = {
                ...state,
                categories: state.categories.map(category => {
                    if (category.id !=- updatedItem.id) {
                        return category;
                    } else {
                        return updatedItem;
                    }
                })
            };

            if ((action as CategoryActions.UpdateItemActionSuccess).setCurrent) {
                newState.currentCategory = updatedItem;
            }
            return newState;
        case CategoryActions.DELETE_ITEM_SUCCESS:
            return {
                ...state,
                categories: state.categories.filter(category => category.id !== (action as CategoryActions.DeleteItemSuccessAction).id),
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