import {createAction, props} from '@ngrx/store';
import { UserMessage } from '../reducers/userMessage.reducer';
export const createUserMessage = createAction('[userMessage] Create UserMessage', props<{userMessageData: UserMessage}>())
export const createUserMessageSuccess = createAction('[userMessage] Create UserMessage Success', props<{userMessageData: UserMessage}>())
export const createUserMessageError = createAction('[userMessage] Create UserMessage Error', props<{error: any}>())

export const updateUserMessage = createAction('[userMessage]  Update UserMessage', props<{id: number, userMessageData: UserMessage}>())
export const updateUserMessageSuccess = createAction('[userMessage] Update UserMessage Success', props<{userMessageData: UserMessage}>())
export const updateUserMessageError = createAction('[userMessage] Update UserMessage Error', props<{error: any}>())

export const deleteUserMessage = createAction('[userMessage] Delete UserMessage', props<{id: number}>())
export const deleteUserMessageSuccess = createAction('[userMessage] Delete UserMessage Success', props<{id: number}>())
export const deleteUserMessageError = createAction('[userMessage] Delete UserMessage Error', props<{error: any}>())

export const getUserMessage = createAction('[userMessage] Get UserMessage', props<{id:number}>())
export const getUserMessageSuccess = createAction('[userMessage] Get UserMessage Success', props<{userMessageData: UserMessage}>())
export const getUserMessageError = createAction('[userMessage] Get UserMessage Error', props<{error: any}>())

export const getAllUserMessage = createAction('[userMessage] Getall UserMessage')
export const getAllUserMessageSuccess = createAction('[userMessage] Getall UserMessage Success', props<{data:UserMessage[]}>())
export const getAllUserMessageError = createAction('[userMessage] Getall UserMessage Error', props<{error: any}>())
