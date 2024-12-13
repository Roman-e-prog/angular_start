import {createAction, props} from '@ngrx/store';
import { ForumAnswer } from '../reducers/forumAnswer.reducer';
import { ForumAnswerUpdateData } from '../../components/forum-answer-edit-module/forum-answer-edit-module.component';
export const createForumAnswer = createAction('[forumAnswer] Create ForumAnswer', props<{forumAnswerData: ForumAnswer}>())
export const createForumAnswerSuccess = createAction('[forumAnswer] Create ForumAnswer Success', props<{forumAnswerData: ForumAnswer}>())
export const createForumAnswerError = createAction('[forumAnswer] Create ForumAnswer Error', props<{error: any}>())

export const updateForumAnswer = createAction('[forumAnswer]  Update ForumAnswer', props<{id: number, forumAnswerData: ForumAnswerUpdateData}>())
export const updateForumAnswerSuccess = createAction('[forumAnswer] Update ForumAnswer Success', props<{forumAnswerData: ForumAnswer}>())
export const updateForumAnswerError = createAction('[forumAnswer] Update ForumAnswer Error', props<{error: any}>())

export const deleteForumAnswer = createAction('[forumAnswer] Delete ForumAnswer', props<{id: number, question_id:number}>())
export const deleteForumAnswerSuccess = createAction('[forumAnswer] Delete ForumAnswer Success', props<{id: number}>())
export const deleteForumAnswerError = createAction('[forumAnswer] Delete ForumAnswer Error', props<{error: any}>())

export const getForumAnswer = createAction('[forumAnswer] Get ForumAnswer', props<{id:number}>())
export const getForumAnswerSuccess = createAction('[forumAnswer] Get ForumAnswer Success', props<{forumAnswerData: ForumAnswer}>())
export const getForumAnswerError = createAction('[forumAnswer] Get ForumAnswer Error', props<{error: any}>())

export const getAllForumAnswer = createAction('[forumAnswer] Getall ForumAnswer')
export const getAllForumAnswerSuccess = createAction('[forumAnswer] Getall ForumAnswer Success', props<{forumAnswerData:ForumAnswer[]}>())
export const getAllForumAnswerError = createAction('[forumAnswer] Getall ForumAnswer Error', props<{error: any}>())
export const getAllAnswersToQuestion = createAction('[forumAnswer] Getall ForumAnswerToQuestion', props<{id:number}>())
export const getAllAnswersToQuestionSuccess = createAction('[forumAnswer] Getall ForumAnswerToQuestion Success', props<{forumAnswerData:ForumAnswer[]}>())
export const getAllAnswersToQuestionError = createAction('[forumAnswer] Getall ForumAnswerToQuestion Error', props<{error: any}>())

export const incrementAnswerLikes = createAction('[forumAnswer] Increment Likes', props<{id:number, user_id:number}>())
export const incrementAnswerLikesSuccess = createAction('[forumAnswer] Increment Likes Success', props<{id: number, likes: number}>())
export const incrementAnswerLikesError = createAction('[forumAnswer] Increment Likes Error', props<{error: any}>())

export const incrementAnswerDisLikes = createAction('[forumAnswer] Increment DisLikes', props<{id:number, user_id:number}>())
export const incrementAnswerDisLikesSuccess = createAction('[forumAnswer] Increment DisLikes Success', props<{id: number, dislikes: number}>())
export const incrementAnswerDisLikesError = createAction('[forumAnswer] Increment DisLikes Error', props<{error: any}>())

export const hasSolved = createAction('[forumAnswer] Set hasSolved', props<{id:number, question_id:number}>())
export const hasSolvedSuccess = createAction('[forumAnswer] hasSolved', props<{id: number, has_solved:boolean }>())
export const hasSolvedError = createAction('[forumAnswer] hasSolved Error', props<{error: any}>())
