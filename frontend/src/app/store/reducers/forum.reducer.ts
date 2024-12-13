import { createReducer, on } from '@ngrx/store';
import {
    createForum,
    createForumSuccess,
    createForumError,
    updateForum,
    updateForumSuccess,
    updateForumError,
    deleteForum,
    deleteForumSuccess,
    deleteForumError,
    getAllForum,
    getAllForumSuccess,
    getAllForumError,
    getForum,
    getForumSuccess,
    getForumError,
    getAllUserQuestions,
    getAllUserQuestionsError,
    getAllUserQuestionsSuccess,
    incrementViews,
    incrementViewsSuccess,
    incrementViewsError,
    incrementLikes,
    incrementLikesSuccess,
    incrementLikesError,
    incrementDisLikes,
    incrementDisLikesSuccess,
    incrementDisLikesError,
} from '../actions/forum.actions';

export interface Forum {
    id?: number;
    username: string,
    user_id: number,
    is_admin: boolean,
    question_ressort: string,
    question_theme: string,
    question: string,
    likes?: number ,
    dislikes?: number ,
    like_ids?: number[],
    dislike_ids?: number[],
    solved?: boolean,
    views?: number,
    created_at?: Date;
    updated_at?: Date;
}

export interface ForumState {
    forum: Forum;
    allForum: Forum[];
    allUserQuestions: Forum[],
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    message: string;
}

const initialState: ForumState = {
    forum: {} as Forum,
    allForum: [],
    allUserQuestions: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
};

export const _forumReducer = createReducer(
    initialState,
    on(createForum, (state) => ({ ...state, isLoading: true })),
    on(createForumSuccess, (state, { forumData }) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        allForum: [...state.allForum, forumData]
    })),
    on(createForumError, (state, { error }) => ({ ...state, isLoading: false, isError: true, message: error })),
    on(updateForum, (state) => ({ ...state, isLoading: true })),
    on(updateForumSuccess, (state, {forumData}) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        forum: {...forumData}
    })),
    on(updateForumError, (state, { error }) => ({ ...state, isLoading: false, isError: true, message: error })),
    on(deleteForum, (state) => ({ ...state, isLoading: true })),
    on(deleteForumSuccess, (state, { id }) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        allForum: state.allForum.filter(item => item.id !== id)
    })),
    on(deleteForumError, (state, { error }) => ({ ...state, isLoading: false, isError: true, message: error })),
    on(getForum, (state) => ({ ...state, isLoading: true })),
    on(getForumSuccess, (state, { forumData }) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        forum: forumData
    })),
    on(getForumError, (state, { error }) => ({ ...state, isLoading: false, isError: true, message: error })),
    on(getAllForum, (state) => ({ ...state, isLoading: true })),
    on(getAllForumSuccess, (state, { data }) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        allForum: data
    })),
    on(getAllForumError, (state, { error }) => (
        { 
            ...state, 
            isLoading: false, 
            isError: true, 
            message: error 
        })),
        on(getAllUserQuestions, (state)=>({...state, isLoading:true})),
        on(getAllUserQuestionsSuccess, (state, {data})=>({
            ...state,
            isLoading: false,
            isSuccess: true,
            allUserQuestions: data,
        })),
        on(getAllUserQuestionsError, (state, {error})=>({
            ...state,
            isLoading: false,
            isError: true,
            message: error,
        })),
        on(incrementViews, (state) => ({
            ...state,
            isUpdatingViews: true,
          })),
          on(incrementViewsSuccess, (state) => ({
            ...state,
            isUpdatingViews: false,
          })),
          on(incrementViewsError, (state) => ({
            ...state,
            isUpdatingViews: false,
          })),
          on(incrementLikes, (state) => ({
            ...state,
            isUpdatingLikes: true,
          })),
          on(incrementLikesSuccess, (state) => ({
            ...state,
            isUpdatingLikes: false,
          })),
          on(incrementLikesError, (state) => ({
            ...state,
            isUpdatingLikes: false,
          })),
          on(incrementDisLikes, (state) => ({
            ...state,
            isUpdatingDisLikes: true,
          })),
          on(incrementDisLikesSuccess, (state) => ({
            ...state,
            isUpdatingDisLikes: false,
          })),
          on(incrementDisLikesError, (state) => ({
            ...state,
            isUpdatingDisLikes: false,
          })),   
);
export const forumReducer = (action:any, data:any)=>{
    return _forumReducer(action, data)
}
