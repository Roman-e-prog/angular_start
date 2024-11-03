import {createFeatureSelector, createSelector} from '@ngrx/store';
import { ForumState } from '../reducers/forum.reducer';

const selectForum = createFeatureSelector<ForumState>('forum')

export const selectAllForumData = createSelector(
    selectForum,
    (state)=>state.allForum
)
export const selectForumData = createSelector(
    selectForum,
    (state)=>state.forum
)
export const selectForumLoading = createSelector(
    selectForum,
    (state)=>state.isLoading
)
export const selectForumError = createSelector(
    selectForum,
    (state)=>state.isError
)
export const selectForumMessage = createSelector(
    selectForum,
    (state)=>state.message
)