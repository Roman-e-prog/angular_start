import {createFeatureSelector, createSelector} from '@ngrx/store';
import { UebermichState } from '../reducers/uebermich.reducer';

const selectUebermich = createFeatureSelector<UebermichState>('uebermich')

export const selectAllUebermichData = createSelector(
    selectUebermich,
    (state)=>state.allUebermich
)
export const selectUebermichData = createSelector(
    selectUebermich,
    (state)=>state.uebermich
)
export const selectUebermichLoading = createSelector(
    selectUebermich,
    (state)=>state.isLoading
)
export const selectUebermichError = createSelector(
    selectUebermich,
    (state)=>state.isError
)
export const selectUebermichMessage = createSelector(
    selectUebermich,
    (state)=>state.message
)