import {createFeatureSelector, createSelector} from '@ngrx/store';
import { BlogState } from '../reducers/blog.reducer';

const selectBlog = createFeatureSelector<BlogState>('blog')

export const selectAllBlogData = createSelector(
    selectBlog,
    (state)=>state.allBlog
)
export const selectBlogData = createSelector(
    selectBlog,
    (state)=>state.blog
)
export const selectBlogLoading = createSelector(
    selectBlog,
    (state)=>state.isLoading
)
export const selectBlogError = createSelector(
    selectBlog,
    (state)=>state.isError
)
export const selectBlogMessage = createSelector(
    selectBlog,
    (state)=>state.message
)