import {createAction, props} from '@ngrx/store';
import { AdminMessage } from '../reducers/adminMessage.reducer';
import { UpdateData } from '../../components/dashboardComponents/editForms/admin-messages-edit/admin-messages-edit.component';
export const createAdminMessage = createAction('[adminMessage] Create AdminMessage', props<{adminMessageData: AdminMessage}>())
export const createAdminMessageSuccess = createAction('[adminMessage] Create AdminMessage Success', props<{adminMessageData: AdminMessage}>())
export const createAdminMessageError = createAction('[adminMessage] Create AdminMessage Error', props<{error: any}>())

export const updateAdminMessage = createAction('[adminMessage]  Update AdminMessage', props<{id: number, adminMessageData: UpdateData}>())
export const updateAdminMessageSuccess = createAction('[adminMessage] Update AdminMessage Success', props<{adminMessageData: AdminMessage}>())
export const updateAdminMessageError = createAction('[adminMessage] Update AdminMessage Error', props<{error: any}>())

export const deleteAdminMessage = createAction('[adminMessage] Delete AdminMessage', props<{id: number}>())
export const deleteAdminMessageSuccess = createAction('[adminMessage] Delete AdminMessage Success', props<{id: number}>())
export const deleteAdminMessageError = createAction('[adminMessage] Delete AdminMessage Error', props<{error: any}>())

export const getAdminMessage = createAction('[adminMessage] Get AdminMessage', props<{id:number}>())
export const getAdminMessageSuccess = createAction('[adminMessage] Get AdminMessage Success', props<{adminMessageData: AdminMessage}>())
export const getAdminMessageError = createAction('[adminMessage] Get AdminMessage Error', props<{error: any}>())

export const getAllAdminMessage = createAction('[adminMessage] Getall AdminMessage')
export const getAllAdminMessageSuccess = createAction('[adminMessage] Getall AdminMessage Success', props<{data:AdminMessage[]}>())
export const getAllAdminMessageError = createAction('[adminMessage] Getall AdminMessage Error', props<{error: any}>())

export const getUserAdminMessages = createAction('[adminMessage] Getall UserAdminMessage', props<{id:number}>())
export const getUserAdminMessageSuccess = createAction('[adminMessage] Getall UserAdminMessage Success', props<{data:AdminMessage[]}>())
export const getUserAdminMessageError = createAction('[adminMessage] Getall UserAdminMessage Error', props<{error: any}>())
