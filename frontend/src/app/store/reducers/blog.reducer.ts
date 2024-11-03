import { createReducer, on } from '@ngrx/store';
import {
    createBlog,
    createBlogSuccess,
    createBlogError,
    updateBlog,
    updateBlogSuccess,
    updateBlogError,
    deleteBlog,
    deleteBlogSuccess,
    deleteBlogError,
    getAllBlog,
    getAllBlogSuccess,
    getAllBlogError,
    getBlog,
    getBlogSuccess,
    getBlogError
} from '../actions/blog.actions';

export interface Blog {
    id?: number;
    blog_title: string,
    blog_content:string,
    blog_theme: string,
    blog_author: string,
    cloudinary_ids?: string[],
    images: string[],
    created_at?: Date;
    updated_at?: Date;
}

export interface BlogState {
    blog: Blog;
    allBlog: Blog[];
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    message: string;
}

const initialState: BlogState = {
    blog: {} as Blog,
    allBlog: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
};

export const _blogReducer = createReducer(
    initialState,
    on(createBlog, (state) => ({ ...state, isLoading: true })),
    on(createBlogSuccess, (state, { blogData }) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        allBlog: [...state.allBlog, blogData]
    })),
    on(createBlogError, (state, { error }) => ({ ...state, isLoading: false, isError: true, message: error })),
    on(updateBlog, (state) => ({ ...state, isLoading: true })),
    on(updateBlogSuccess, (state, {blogData}) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        blog: {...blogData}
    })),
    on(updateBlogError, (state, { error }) => ({ ...state, isLoading: false, isError: true, message: error })),
    on(deleteBlog, (state) => ({ ...state, isLoading: true })),
    on(deleteBlogSuccess, (state, { id }) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        allBlog: state.allBlog.filter(item => item.id !== id)
    })),
    on(deleteBlogError, (state, { error }) => ({ ...state, isLoading: false, isError: true, message: error })),
    on(getBlog, (state) => ({ ...state, isLoading: true })),
    on(getBlogSuccess, (state, { blogData }) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        blog: blogData
    })),
    on(getBlogError, (state, { error }) => ({ ...state, isLoading: false, isError: true, message: error })),
    on(getAllBlog, (state) => ({ ...state, isLoading: true })),
    on(getAllBlogSuccess, (state, { data }) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        allBlog: data
    })),
    on(getAllBlogError, (state, { error }) => ({ ...state, isLoading: false, isError: true, message: error }))
);
export const blogReducer = (action:any, data:any)=>{
    return _blogReducer(action, data)
}
