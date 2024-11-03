import {createFeatureSelector, createSelector} from '@ngrx/store';
import { BibliothekState } from '../reducers/bibliothek.reducer';

const selectBibliothek = createFeatureSelector<BibliothekState>('bibliothek')

export const selectAllBibliothekData = createSelector(
    selectBibliothek,
    (state)=>state.allBibliothek
)
export const selectBibliothekData = createSelector(
    selectBibliothek,
    (state)=>state.bibliothek
)
export const selectBibliothekLoading = createSelector(
    selectBibliothek,
    (state)=>state.isLoading
)
export const selectBibliothekError = createSelector(
    selectBibliothek,
    (state)=>state.isError
)
export const selectBibliothekMessage = createSelector(
    selectBibliothek,
    (state)=>state.message
)