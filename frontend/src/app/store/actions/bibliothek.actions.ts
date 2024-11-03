import {createAction, props} from '@ngrx/store';
import { Bibliothek } from '../reducers/bibliothek.reducer';
export const createBibliothek = createAction('[bibliothek] Create Bibliothek', props<{BibliothekData: Bibliothek}>())
export const createBibliothekSuccess = createAction('[bibliothek] Create Bibliothek Success', props<{bibliothekData: Bibliothek}>())
export const createBibliothekError = createAction('[bibliothek] Create Bibliothek Error', props<{error: any}>())

export const updateBibliothek = createAction('[bibliothek]  Update Bibliothek', props<{id: number, bibliothekData: Bibliothek}>())
export const updateBibliothekSuccess = createAction('[bibliothek] Update Bibliothek Success', props<{bibliothekData: Bibliothek}>())
export const updateBibliothekError = createAction('[bibliothek] Update Bibliothek Error', props<{error: any}>())

export const deleteBibliothek = createAction('[bibliothek] Delete Bibliothek', props<{id: number}>())
export const deleteBibliothekSuccess = createAction('[bibliothek] Delete Bibliothek Success', props<{id: number}>())
export const deleteBibliothekError = createAction('[bibliothek] Delete Bibliothek Error', props<{error: any}>())

export const getBibliothek = createAction('[bibliothek] Get Bibliothek', props<{id:number}>())
export const getBibliothekSuccess = createAction('[bibliothek] Get Bibliothek Success', props<{bibliothekData: Bibliothek}>())
export const getBibliothekError = createAction('[bibliothek] Get Bibliothek Error', props<{error: any}>())

export const getAllBibliothek = createAction('[bibliothek] Getall Bibliothek')
export const getAllBibliothekSuccess = createAction('[bibliothek] Getall Bibliothek Success', props<{data:Bibliothek[]}>())
export const getAllBibliothekError = createAction('[bibliothek] Getall Bibliothek Error', props<{error: any}>())
