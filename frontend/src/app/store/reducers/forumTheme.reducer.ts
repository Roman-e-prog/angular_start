import { createReducer, on } from '@ngrx/store';
import {
    createForumTheme,
    createForumThemeSuccess,
    createForumThemeError,
    updateForumTheme,
    updateForumThemeSuccess,
    updateForumThemeError,
    deleteForumTheme,
    deleteForumThemeSuccess,
    deleteForumThemeError,
    getAllForumTheme,
    getAllForumThemeSuccess,
    getAllForumThemeError,
    getForumTheme,
    getForumThemeSuccess,
    getForumThemeError
} from '../actions/forumtheme.actions';

export interface ForumTheme {
    id?: number;
    ressort: string,
    title: string,
    content: string,
    created_at?: Date;
    updated_at?: Date;
}

export interface ForumThemeState {
    forumTheme: ForumTheme;
    allForumTheme: ForumTheme[];
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    message: string;
}

const initialState: ForumThemeState = {
    forumTheme: {} as ForumTheme,
    allForumTheme: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
};

export const _forumThemeReducer = createReducer(
    initialState,
    on(createForumTheme, (state) => ({ ...state, isLoading: true })),
    on(createForumThemeSuccess, (state, { forumThemeData }) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        allForumTheme: [...state.allForumTheme, forumThemeData]
    })),
    on(createForumThemeError, (state, { error }) => ({ ...state, isLoading: false, isError: true, message: error })),
    on(updateForumTheme, (state) => ({ ...state, isLoading: true })),
    on(updateForumThemeSuccess, (state, {forumThemeData}) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        ForumTheme: {...forumThemeData}
    })),
    on(updateForumThemeError, (state, { error }) => ({ ...state, isLoading: false, isError: true, message: error })),
    on(deleteForumTheme, (state) => ({ ...state, isLoading: true })),
    on(deleteForumThemeSuccess, (state, { id }) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        allForumTheme: state.allForumTheme.filter(item => item.id !== id)
    })),
    on(deleteForumThemeError, (state, { error }) => ({ ...state, isLoading: false, isError: true, message: error })),
    on(getForumTheme, (state) => ({ ...state, isLoading: true })),
    on(getForumThemeSuccess, (state, { forumThemeData }) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        forumTheme: forumThemeData
    })),
    on(getForumThemeError, (state, { error }) => ({ ...state, isLoading: false, isError: true, message: error })),
    on(getAllForumTheme, (state) => ({ ...state, isLoading: true })),
    on(getAllForumThemeSuccess, (state, { data }) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        allForumTheme: data
    })),
    on(getAllForumThemeError, (state, { error }) => ({ ...state, isLoading: false, isError: true, message: error }))
);
export const forumThemeReducer = (action:any, data:any)=>{
    return _forumThemeReducer(action, data)
}
