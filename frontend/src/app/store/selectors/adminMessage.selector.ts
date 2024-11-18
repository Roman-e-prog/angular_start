import {createFeatureSelector, createSelector} from '@ngrx/store';
import { AdminMessageState } from '../reducers/adminMessage.reducer';

const selectAdminMessage = createFeatureSelector<AdminMessageState>('adminMessage')

export const selectAllAdminMessageData = createSelector(
    selectAdminMessage,
    (state)=>state.allAdminMessage
)
export const selectAdminMessageData = createSelector(
    selectAdminMessage,
    (state)=>state.adminMessage
)
export const selectAdminMessageLoading = createSelector(
    selectAdminMessage,
    (state)=>state.isLoading
)
export const selectAdminMessageError = createSelector(
    selectAdminMessage,
    (state)=>state.isError
)
export const selectAdminMessageMessage = createSelector(
    selectAdminMessage,
    (state)=>state.message
)
export const selectUserAdminMessage = createSelector(
    selectAdminMessage,
    (state)=>state.allUserAdminMessage
)