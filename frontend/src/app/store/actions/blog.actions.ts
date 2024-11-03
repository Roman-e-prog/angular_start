import {createAction, props} from '@ngrx/store';
import { Blog } from '../reducers/blog.reducer';
export const createBlog = createAction('[blog] Create Blog', props<{blogData: Blog}>())
export const createBlogSuccess = createAction('[blog] Create Blog Success', props<{blogData: Blog}>())
export const createBlogError = createAction('[blog] Create Blog Error', props<{error: any}>())

export const updateBlog = createAction('[blog]  Update Blog', props<{id: number, blogData: Blog}>())
export const updateBlogSuccess = createAction('[blog] Update Blog Success', props<{blogData: Blog}>())
export const updateBlogError = createAction('[blog] Update Blog Error', props<{error: any}>())

export const deleteBlog = createAction('[blog] Delete Blog', props<{id: number}>())
export const deleteBlogSuccess = createAction('[blog] Delete Blog Success', props<{id: number}>())
export const deleteBlogError = createAction('[blog] Delete Blog Error', props<{error: any}>())

export const getBlog = createAction('[blog] Get Blog', props<{id:number}>())
export const getBlogSuccess = createAction('[blog] Get Blog Success', props<{blogData: Blog}>())
export const getBlogError = createAction('[blog] Get Blog Error', props<{error: any}>())

export const getAllBlog = createAction('[blog] Getall Blog')
export const getAllBlogSuccess = createAction('[blog] Getall Blog Success', props<{data:Blog[]}>())
export const getAllBlogError = createAction('[blog] Getall Blog Error', props<{error: any}>())
