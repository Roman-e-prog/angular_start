import {createAction, props} from '@ngrx/store';
import { ForumTheme } from '../reducers/forumTheme.reducer';
export const createForumTheme = createAction('[forumTheme] Create ForumTheme', props<{forumThemeData: ForumTheme}>())
export const createForumThemeSuccess = createAction('[forumTheme] Create ForumTheme Success', props<{forumThemeData: ForumTheme}>())
export const createForumThemeError = createAction('[forumTheme] Create ForumTheme Error', props<{error: any}>())

export const updateForumTheme = createAction('[forumTheme]  Update ForumTheme', props<{id: number, forumThemeData: ForumTheme}>())
export const updateForumThemeSuccess = createAction('[forumTheme] Update ForumTheme Success', props<{forumThemeData: ForumTheme}>())
export const updateForumThemeError = createAction('[forumTheme] Update ForumTheme Error', props<{error: any}>())

export const deleteForumTheme = createAction('[forumTheme] Delete ForumTheme', props<{id: number}>())
export const deleteForumThemeSuccess = createAction('[forumTheme] Delete ForumTheme Success', props<{id: number}>())
export const deleteForumThemeError = createAction('[forumTheme] Delete ForumTheme Error', props<{error: any}>())

export const getForumTheme = createAction('[forumTheme] Get ForumTheme', props<{id:number}>())
export const getForumThemeSuccess = createAction('[forumTheme] Get ForumTheme Success', props<{forumThemeData: ForumTheme}>())
export const getForumThemeError = createAction('[forumTheme] Get ForumTheme Error', props<{error: any}>())

export const getAllForumTheme = createAction('[forumTheme] Getall ForumTheme')
export const getAllForumThemeSuccess = createAction('[forumTheme] Getall ForumTheme Success', props<{data:ForumTheme[]}>())
export const getAllForumThemeError = createAction('[forumTheme] Getall ForumTheme Error', props<{error: any}>())
