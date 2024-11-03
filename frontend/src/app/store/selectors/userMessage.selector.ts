import {createFeatureSelector, createSelector} from '@ngrx/store';
import { UserMessageState } from '../reducers/userMessage.reducer';

const selectUserMessage = createFeatureSelector<UserMessageState>('userMessage')

export const selectAllUserMessageData = createSelector(
    selectUserMessage,
    (state)=>state.allUserMessage
)
export const selectUserMessageData = createSelector(
    selectUserMessage,
    (state)=>state.userMessage
)
export const selectUserMessageLoading = createSelector(
    selectUserMessage,
    (state)=>state.isLoading
)
export const selectUserMessageError = createSelector(
    selectUserMessage,
    (state)=>state.isError
)
export const selectUserMessageMessage = createSelector(
    selectUserMessage,
    (state)=>state.message
)