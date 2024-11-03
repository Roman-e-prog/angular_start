import { createReducer, on } from '@ngrx/store';
import {
    createUebermich,
    createUebermichSuccess,
    createUebermichError,
    updateUebermich,
    updateUebermichSuccess,
    updateUebermichError,
    deleteUebermich,
    deleteUebermichSuccess,
    deleteUebermichError,
    getAllUebermich,
    getAllUebermichSuccess,
    getAllUebermichError,
    getUebermich,
    getUebermichSuccess,
    getUebermichError
} from '../actions/uebermich.actions';

export interface Uebermich {
    id?: number;
    my_person: string;
    created_at?: Date;
    updated_at?: Date;
}

export interface UebermichState {
    uebermich: Uebermich;
    allUebermich: Uebermich[];
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    message: string;
}

const initialState: UebermichState = {
    uebermich: {} as Uebermich,
    allUebermich: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
};

export const _uebermichReducer = createReducer(
    initialState,
    on(createUebermich, (state) => ({ ...state, isLoading: true })),
    on(createUebermichSuccess, (state, { uebermichData }) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        allUebermich: [...state.allUebermich, uebermichData]
    })),
    on(createUebermichError, (state, { error }) => ({ ...state, isLoading: false, isError: true, message: error})),
    on(updateUebermich, (state) => ({ ...state, isLoading: true })),
    on(updateUebermichSuccess, (state, {uebermichData}) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        uebermich: {...uebermichData}
    })),
    on(updateUebermichError, (state, { error }) => ({ ...state, isLoading: false, isError: true, message: error })),
    on(deleteUebermich, (state) => ({ ...state, isLoading: true })),
    on(deleteUebermichSuccess, (state, { id }) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        allUebermich: state.allUebermich.filter(item => item.id !== id)
    })),
    on(deleteUebermichError, (state, { error }) => ({ ...state, isLoading: false, isError: true, message: error })),
    on(getUebermich, (state) => ({ ...state, isLoading: true })),
    on(getUebermichSuccess, (state, { uebermichData }) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        uebermich: uebermichData
    })),
    on(getUebermichError, (state, { error }) => ({ ...state, isLoading: false, isError: true, message: error })),
    on(getAllUebermich, (state) => ({ ...state, isLoading: true })),
    on(getAllUebermichSuccess, (state, { uebermichData }) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        allUebermich: uebermichData
    })),
    on(getAllUebermichError, (state, { error }) => ({ ...state, isLoading: false, isError: true, message: error }))
);
export const uebermichReducer = (action:any, data:any)=>{
    return _uebermichReducer(action, data)
}
