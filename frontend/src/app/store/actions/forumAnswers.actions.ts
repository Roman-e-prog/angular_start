import {createAction, props} from '@ngrx/store';
import { ForumAnswer } from '../reducers/forumAnswer.reducer';
export const createForumAnswer = createAction('[forumAnswer] Create ForumAnswer', props<{forumAnswerData: ForumAnswer}>())
export const createForumAnswerSuccess = createAction('[forumAnswer] Create ForumAnswer Success', props<{forumAnswerData: ForumAnswer}>())
export const createForumAnswerError = createAction('[forumAnswer] Create ForumAnswer Error', props<{error: any}>())

export const updateForumAnswer = createAction('[forumAnswer]  Update ForumAnswer', props<{id: number, forumAnswerData: ForumAnswer}>())
export const updateForumAnswerSuccess = createAction('[forumAnswer] Update ForumAnswer Success', props<{forumAnswerData: ForumAnswer}>())
export const updateForumAnswerError = createAction('[forumAnswer] Update ForumAnswer Error', props<{error: any}>())

export const deleteForumAnswer = createAction('[forumAnswer] Delete ForumAnswer', props<{id: number}>())
export const deleteForumAnswerSuccess = createAction('[forumAnswer] Delete ForumAnswer Success', props<{id: number}>())
export const deleteForumAnswerError = createAction('[forumAnswer] Delete ForumAnswer Error', props<{error: any}>())

export const getForumAnswer = createAction('[forumAnswer] Get ForumAnswer', props<{id:number}>())
export const getForumAnswerSuccess = createAction('[forumAnswer] Get ForumAnswer Success', props<{forumAnswerData: ForumAnswer}>())
export const getForumAnswerError = createAction('[forumAnswer] Get ForumAnswer Error', props<{error: any}>())

export const getAllForumAnswer = createAction('[forumAnswer] Getall ForumAnswer')
export const getAllForumAnswerSuccess = createAction('[forumAnswer] Getall ForumAnswer Success', props<{forumAnswerData:ForumAnswer[]}>())
export const getAllForumAnswerError = createAction('[forumAnswer] Getall ForumAnswer Error', props<{error: any}>())
export const getAllAnswersToQuestion = createAction('[forumAnswer] Getall ForumAnswer', props<{id:number}>())
export const getAllAnswersToQuestionSuccess = createAction('[forumAnswer] Getall ForumAnswer Success', props<{forumAnswerData:ForumAnswer[]}>())
export const getAllAnswersToQuestionError = createAction('[forumAnswer] Getall ForumAnswer Error', props<{error: any}>())
