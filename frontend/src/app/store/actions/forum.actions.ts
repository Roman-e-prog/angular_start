import {createAction, props} from '@ngrx/store';
import { Forum } from '../reducers/forum.reducer';
export const createForum = createAction('[forum] Create Forum', props<{forumData: Forum}>())
export const createForumSuccess = createAction('[forum] Create Forum Success', props<{forumData: Forum}>())
export const createForumError = createAction('[forum] Create Forum Error', props<{error: any}>())

export const updateForum = createAction('[forum]  Update Forum', props<{id: number, forumData: Forum}>())
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
