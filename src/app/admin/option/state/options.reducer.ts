import { Action } from "@ngrx/store";
import { Option } from "../../models/option.interface";
import * as OptionActions from "./option.actions";
import { OptionResponseDto } from "../../dto/option-response.dto";

export interface OptionState {
    options: OptionResponseDto[];
    questionId: string | number;
    currentOption: OptionResponseDto;
    error: string;
    loading: boolean;
}

const initialState: OptionState = {
    options: [],
    questionId: null,
    currentOption: null,
    error: null,
    loading: false
}

export function OptionReducer(state = initialState, action: Action): OptionState {
    switch(action.type) {
        case OptionActions.LOAD_ITEMS_SUCCESS:
            return {
                ...state,
                options: (action as OptionActions.LoadItemsSuccessAction).payload || [],
                questionId: (action as OptionActions.LoadItemsSuccessAction).questionId,
                error: null,
                loading: false
            };
        case OptionActions.LOAD_ITEM_SUCCESS:
            return {
                ...state,
                currentOption: (action as OptionActions.LoadItemSuccessAction).option,
                error: null,
                loading: false
            };
        case OptionActions.ADD_ITEM_SUCCESS:
            return {
                ...state,
                options: [...state.options, (action as OptionActions.AddItemActionSuccess).option],
                questionId: (action as OptionActions.AddItemActionSuccess).questionId,
                error: null,
                loading: false
            };
        case OptionActions.UPDATE_ITEM_SUCCESS:
            const updatedItem = (action as OptionActions.UpdateItemActionSuccess).option;
            const newState = {
                ...state,
                options: state.options.map(option => {
                    if (option.data.id !=- updatedItem.data.id) {
                        return option;
                    } else {
                        return updatedItem;
                    }
                })
            };

            if ((action as OptionActions.UpdateItemActionSuccess).setCurrent) {
                newState.currentOption = updatedItem;
            }
            return newState;
        case OptionActions.DELETE_ITEM_SUCCESS:
            return {
                ...state,
                options: state.options.filter(option => option.data.id !== (action as OptionActions.DeleteItemSuccessAction).id),
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