import { createReducer, on } from '@ngrx/store';
import {
    updateBlogmember,
    updateBlogmemberSuccess,
    updateBlogmemberError,
    deleteBlogmember,
    deleteBlogmemberSuccess,
    deleteBlogmemberError,
    getAllBlogmember,
    getAllBlogmemberSuccess,
    getAllBlogmemberError,
    getBlogmember,
    getBlogmemberSuccess,
    getBlogmemberError
} from '../actions/blogmember.actions';

export interface Blogmember {
    id?: number;
    username: string,
    vorname: string,
    nachname: string,
    email: string,
    profile_picture?:"",
    password: string,
    is_admin:boolean,
    created_at?: Date;
    updated_at?: Date;
}

export interface BlogmemberState {
    blogmember: Blogmember;
    allBlogmember: Blogmember[];
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    message: string;
}

const initialState: BlogmemberState = {
    blogmember: {} as Blogmember,
    allBlogmember: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
};

export const _blogmemberReducer = createReducer(
    initialState,
    on(updateBlogmember, (state) => ({ ...state, isLoading: true })),
    on(updateBlogmemberSuccess, (state, {blogmemberData}) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        Blogmember: {...blogmemberData}
    })),
    on(updateBlogmemberError, (state, { error }) => ({ ...state, isLoading: false, isError: true, message: error })),
    on(deleteBlogmember, (state) => ({ ...state, isLoading: true })),
    on(deleteBlogmemberSuccess, (state, { id }) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        allBlogmember: state.allBlogmember.filter(item => item.id !== id)
    })),
    on(deleteBlogmemberError, (state, { error }) => ({ ...state, isLoading: false, isError: true, message: error })),
    on(getBlogmember, (state) => ({ ...state, isLoading: true })),
    on(getBlogmemberSuccess, (state, { blogmemberData }) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        blogmember: blogmemberData
    })),
    on(getBlogmemberError, (state, { error }) => ({ ...state, isLoading: false, isError: true, message: error })),
    on(getAllBlogmember, (state) => ({ ...state, isLoading: true })),
    on(getAllBlogmemberSuccess, (state, { data }) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        allBlogmember: data
    })),
    on(getAllBlogmemberError, (state, { error }) => ({ ...state, isLoading: false, isError: true, message: error }))
);
export const BlogmemberReducer = (action:any, data:any)=>{
    return _blogmemberReducer(action, data)
}
