import {createAction, props} from '@ngrx/store';
import { Uebermich } from '../reducers/uebermich.reducer';
export const createUebermich = createAction('[uebermich] Create Uebermich', props<{uebermichData: Uebermich}>())
export const createUebermichSuccess = createAction('[uebermich] Create Uebermich Success', props<{uebermichData: Uebermich}>())
export const createUebermichError = createAction('[uebermich] Create Uebermich Error', props<{error: any}>())

export const updateUebermich = createAction('[uebermich]  Update Uebermich', props<{id: number, uebermichData: Uebermich}>())
export const updateUebermichSuccess = createAction('[uebermich] Update Uebermich Success', props<{uebermichData: Uebermich}>())
export const updateUebermichError = createAction('[uebermich] Update Uebermich Error', props<{error: any}>())

export const deleteUebermich = createAction('[uebermich] Delete Uebermich', props<{id: number}>())
export const deleteUebermichSuccess = createAction('[uebermich] Delete Uebermich Success', props<{id: number}>())
export const deleteUebermichError = createAction('[uebermich] Delete Uebermich Error', props<{error: any}>())

export const getUebermich = createAction('[uebermich] Get Uebermich', props<{id:number}>())
export const getUebermichSuccess = createAction('[uebermich] Get Uebermich Success', props<{uebermichData: Uebermich}>())
export const getUebermichError = createAction('[uebermich] Get Uebermich Error', props<{error: any}>())

export const getAllUebermich = createAction('[uebermich] Getall Uebermich')
export const getAllUebermichSuccess = createAction('[uebermich] Getall Uebermich Success', props<{uebermichData:Uebermich[]}>())
export const getAllUebermichError = createAction('[uebermich] Getall Uebermich Error', props<{error: any}>())
