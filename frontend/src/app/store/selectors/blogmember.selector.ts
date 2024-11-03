import {createFeatureSelector, createSelector} from '@ngrx/store';
import { BlogmemberState } from '../reducers/blogMember.reducer';

const selectBlogmember = createFeatureSelector<BlogmemberState>('blogmember')

export const selectAllBlogmemberData = createSelector(
    selectBlogmember,
    (state)=>state.allBlogmember
)
export const selectBlogmemberData = createSelector(
    selectBlogmember,
    (state)=>state.blogmember
)
export const selectBlogmemberLoading = createSelector(
    selectBlogmember,
    (state)=>state.isLoading
)
export const selectBlogmemberError = createSelector(
    selectBlogmember,
    (state)=>state.isError
)
export const selectBlogmemberMessage = createSelector(
    selectBlogmember,
    (state)=>state.message
)