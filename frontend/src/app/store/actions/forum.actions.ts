import {createAction, props} from '@ngrx/store';
import { Forum } from '../reducers/forum.reducer';
import { ForumUpdateData } from '../../components/edit-forum-question/edit-forum-question.component';
export const createForum = createAction('[forum] Create Forum', props<{forumData: Forum}>())
export const createForumSuccess = createAction('[forum] Create Forum Success', props<{forumData: Forum}>())
export const createForumError = createAction('[forum] Create Forum Error', props<{error: any}>())

export const updateForum = createAction('[forum]  Update Forum', props<{id: number, forumData: ForumUpdateData}>())
export const updateForumSuccess = createAction('[forum] Update Forum Success', props<{forumData: Forum}>())
export const updateForumError = createAction('[forum] Update Forum Error', props<{error: any}>())

export const deleteForum = createAction('[forum] Delete Forum', props<{id: number}>())
export const deleteForumSuccess = createAction('[forum] Delete Forum Success', props<{id: number}>())
export const deleteForumError = createAction('[forum] Delete Forum Error', props<{error: any}>())

export const getForum = createAction('[forum] Get Forum', props<{id:number}>())
export const getForumSuccess = createAction('[forum] Get Forum Success', props<{forumData: Forum}>())
export const getForumError = createAction('[forum] Get Forum Error', props<{error: any}>())

export const getAllForum = createAction('[forum] Getall Forum')
export const getAllForumSuccess = createAction('[forum] Getall Forum Success', props<{data:Forum[]}>())
export const getAllForumError = createAction('[forum] Getall Forum Error', props<{error: any}>())

export const getAllUserQuestions = createAction('[forum] Getall UserQuestions', props<{id:number}>())
export const getAllUserQuestionsSuccess = createAction('[forum] Getall UserQuestions Success', props<{data:Forum[]}>())
export const getAllUserQuestionsError = createAction('[forum] Getall UserQuestions Error', props<{error: any}>())
export const incrementLikes = createAction('[forum] Increment Likes', props<{id:number, user_id:number}>())
export const incrementLikesSuccess = createAction('[forum] Increment Likes Success')
export const incrementLikesError = createAction('[forum] Increment Likes Error', props<{error: any}>())
export const incrementDisLikes = createAction('[forum] Increment DisLikes', props<{id:number, user_id:number}>())
export const incrementDisLikesSuccess = createAction('[forum] Increment DisLikes')
export const incrementDisLikesError = createAction('[forum] Increment DisLikes Error', props<{error: any}>())
export const incrementViews = createAction('[forum] Increment Views', props<{id:number}>())
export const incrementViewsSuccess = createAction('[forum] Increment Views')
export const incrementViewsError = createAction('[forum] Increment Views Error', props<{error: any}>())

// export const loadPageData = createAction('[Forum Page] Load ForumPage', props<{ id: number }>());
