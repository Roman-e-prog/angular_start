import {createFeatureSelector, createSelector} from '@ngrx/store';
import { ForumAnswerState } from '../reducers/forumAnswer.reducer';

const selectForumAnswer = createFeatureSelector<ForumAnswerState>('forumAnswer')

export const selectAllForumAnswerData = createSelector(
    selectForumAnswer,
    (state)=>state.allForumAnswer
)
export const selectForumAnswerData = createSelector(
    selectForumAnswer,
    (state)=>state.forumAnswer
)
export const selectForumAnswerLoading = createSelector(
    selectForumAnswer,
    (state)=>state.isLoading
)
export const selectForumAnswerError = createSelector(
    selectForumAnswer,
    (state)=>state.isError
)
export const selectForumAnswerMessage = createSelector(
    selectForumAnswer,
    (state)=>state.message
)
export const selectAllAnswerToQuestion = createSelector(
    selectForumAnswer,
    (state)=>{
        return state.allAnswersToQuestion
    }
)