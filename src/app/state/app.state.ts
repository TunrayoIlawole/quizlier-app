import { ActionReducerMap } from "@ngrx/store";
import * as fromAuth from '../auth/state/auth.reducer'
import * as fromOptions from '../admin/option/state/options.reducer';
import * as fromQuestions from '../admin/question/state/question.reducer';
import * as fromCategories from '../admin/category/state/category.reducer';

export interface State {
    user: fromAuth.UserState;
    option: fromOptions.OptionState;
    question: fromQuestions.QuestionState;
    category: fromCategories.CategoryState;

}

export const appReducers: ActionReducerMap<State> = {
    user: fromAuth.AuthReducer,
    option: fromOptions.OptionReducer,
    question: fromQuestions.QuestionReducer,
    category: fromCategories.CategoryReducer

    
}