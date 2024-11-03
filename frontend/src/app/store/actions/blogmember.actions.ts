import {createAction, props} from '@ngrx/store';
import { Blogmember } from '../reducers/blogMember.reducer';

export const updateBlogmember = createAction('[blogMember]  Update Blogmember', props<{id: number, blogmemberData: Blogmember}>())
export const updateBlogmemberSuccess = createAction('[blogMember] Update Blogmember Success', props<{blogmemberData: Blogmember}>())
export const updateBlogmemberError = createAction('[blogMember] Update Blogmember Error', props<{error: any}>())

export const deleteBlogmember = createAction('[blogMember] Delete Blogmember', props<{id: number}>())
export const deleteBlogmemberSuccess = createAction('[blogMember] Delete Blogmember Success', props<{id: number}>())
export const deleteBlogmemberError = createAction('[blogMember] Delete Blogmember Error', props<{error: any}>())

export const getBlogmember = createAction('[blogMember] Get Blogmember', props<{id:number}>())
export const getBlogmemberSuccess = createAction('[blogMember] Get Blogmember Success', props<{blogmemberData: Blogmember}>())
export const getBlogmemberError = createAction('[blogMember] Get Blogmember Error', props<{error: any}>())

export const getAllBlogmember = createAction('[blogMember] Getall Blogmember')
export const getAllBlogmemberSuccess = createAction('[blogMember] Getall Blogmember Success', props<{data:Blogmember[]}>())
export const getAllBlogmemberError = createAction('[blogMember] Getall Blogmember Error', props<{error: any}>())
