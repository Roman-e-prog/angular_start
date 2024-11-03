import { createReducer, on } from '@ngrx/store';
import {
    createBibliothek,
    createBibliothekSuccess,
    createBibliothekError,
    updateBibliothek,
    updateBibliothekSuccess,
    updateBibliothekError,
    deleteBibliothek,
    deleteBibliothekSuccess,
    deleteBibliothekError,
    getAllBibliothek,
    getAllBibliothekSuccess,
    getAllBibliothekError,
    getBibliothek,
    getBibliothekSuccess,
    getBibliothekError
} from '../actions/bibliothek.actions';

export interface Bibliothek {
    id?: number;
    bibliothek_title:string,
    bibliothek_ressort:string,
    bibliothek_url: string,
    created_at?: Date;
    updated_at?: Date;
}

export interface BibliothekState {
    bibliothek: Bibliothek;
    allBibliothek: Bibliothek[];
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    message: string;
}

const initialState: BibliothekState = {
    bibliothek: {} as Bibliothek,
    allBibliothek: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
};

export const _bibliothekReducer = createReducer(
    initialState,
    on(createBibliothek, (state) => ({ ...state, isLoading: true })),
    on(createBibliothekSuccess, (state, { bibliothekData }) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        allBibliothek: [...state.allBibliothek, bibliothekData]
    })),
    on(createBibliothekError, (state, { error }) => ({ ...state, isLoading: false, isError: true, message: error})),
    on(updateBibliothek, (state) => ({ ...state, isLoading: true })),
    on(updateBibliothekSuccess, (state, {bibliothekData}) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        bibliothek: {...bibliothekData}
    })),
    on(updateBibliothekError, (state, { error }) => ({ ...state, isLoading: false, isError: true, message: error})),
    on(deleteBibliothek, (state) => ({ ...state, isLoading: true })),
    on(deleteBibliothekSuccess, (state, { id }) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        allBibliothek: state.allBibliothek.filter(item => item.id !== id)
    })),
    on(deleteBibliothekError, (state, { error }) => ({ ...state, isLoading: false, isError: true, message: error})),
    on(getBibliothek, (state) => ({ ...state, isLoading: true })),
    on(getBibliothekSuccess, (state, { bibliothekData }) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        bibliothek: bibliothekData
    })),
    on(getBibliothekError, (state, { error }) => ({ ...state, isLoading: false, isError: true, message: error})),
    on(getAllBibliothek, (state) => ({ ...state, isLoading: true })),
    on(getAllBibliothekSuccess, (state, { data }) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        allBibliothek: data
    })),
    on(getAllBibliothekError, (state, { error }) => ({ ...state, isLoading: false, isError: true, message: error}))
);
export const bibliothekReducer = (action:any, data:any)=>{
    return _bibliothekReducer(action, data)
}
