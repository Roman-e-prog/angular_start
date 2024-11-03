import { createReducer, on } from '@ngrx/store';
import {
    createForumAnswer,
    createForumAnswerSuccess,
    createForumAnswerError,
    updateForumAnswer,
    updateForumAnswerSuccess,
    updateForumAnswerError,
    deleteForumAnswer,
    deleteForumAnswerSuccess,
    deleteForumAnswerError,
    getAllForumAnswer,
    getAllForumAnswerSuccess,
    getAllForumAnswerError,
    getForumAnswer,
    getForumAnswerSuccess,
    getForumAnswerError
} from '../actions/forumAnswers.actions';

export interface ForumAnswer {
    id?: number;
    username:string,
    user_id: number,
    is_admin: boolean,
    question_id: number,
    answer: string,
    likes: number ,
    dislikes: number,
    like_ids: number[],
    dislike_ids: number[]
    has_solved: boolean,
    answerername: string,
    answerer_id: number,
    views?: number,
    created_at?: Date;
    updated_at?: Date;
}

export interface ForumAnswerState {
    forumAnswer: ForumAnswer;
    allForumAnswer: ForumAnswer[];
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    message: string;
}

const initialState: ForumAnswerState = {
    forumAnswer: {} as ForumAnswer,
    allForumAnswer: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
};

export const _forumAnswerReducer = createReducer(
    initialState,
    on(createForumAnswer, (state) => ({ ...state, isLoading: true })),
    on(createForumAnswerSuccess, (state, { forumAnswerData }) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        allForumAnswer: [...state.allForumAnswer, forumAnswerData]
    })),
    on(createForumAnswerError, (state, { error }) => ({ ...state, isLoading: false, isError: true, message: error })),
    on(updateForumAnswer, (state) => ({ ...state, isLoading: true })),
    on(updateForumAnswerSuccess, (state, {forumAnswerData}) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        forumAnswer: {...forumAnswerData}
    })),
    on(updateForumAnswerError, (state, { error }) => ({ ...state, isLoading: false, isError: true, message: error })),
    on(deleteForumAnswer, (state) => ({ ...state, isLoading: true })),
    on(deleteForumAnswerSuccess, (state, { id }) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        allForumAnswer: state.allForumAnswer.filter(item => item.id !== id)
    })),
    on(deleteForumAnswerError, (state, { error }) => ({ ...state, isLoading: false, isError: true, message: error })),
    on(getForumAnswer, (state) => ({ ...state, isLoading: true })),
    on(getForumAnswerSuccess, (state, { forumAnswerData }) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        forumAnswer: forumAnswerData
    })),
    on(getForumAnswerError, (state, { error }) => ({ ...state, isLoading: false, isError: true, message: error })),
    on(getAllForumAnswer, (state) => ({ ...state, isLoading: true })),
    on(getAllForumAnswerSuccess, (state, { data }) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        allForumAnswer: data
    })),
    on(getAllForumAnswerError, (state, { error }) => ({ ...state, isLoading: false, isError: true, message: error }))
);
export const forumAnswerReducer = (action:any, data:any)=>{
    return _forumAnswerReducer(action, data)
}
