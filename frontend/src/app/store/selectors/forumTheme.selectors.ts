import {createFeatureSelector, createSelector} from '@ngrx/store';
import { ForumThemeState } from '../reducers/forumTheme.reducer';

const selectForumTheme = createFeatureSelector<ForumThemeState>('forumTheme')

export const selectAllForumThemeData = createSelector(
    selectForumTheme,
    (state)=>state.allForumTheme
)
export const selectForumThemeData = createSelector(
    selectForumTheme,
    (state)=>state.forumTheme
)
export const selectForumThemeLoading = createSelector(
    selectForumTheme,
    (state)=>state.isLoading
)
export const selectForumThemeError = createSelector(
    selectForumTheme,
    (state)=>state.isError
)
export const selectForumThemeMessage = createSelector(
    selectForumTheme,
    (state)=>state.message
)