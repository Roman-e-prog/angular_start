import { createReducer, on } from '@ngrx/store';
import {
    createAdminMessage,
    createAdminMessageSuccess,
    createAdminMessageError,
    updateAdminMessage,
    updateAdminMessageSuccess,
    updateAdminMessageError,
    deleteAdminMessage,
    deleteAdminMessageSuccess,
    deleteAdminMessageError,
    getAllAdminMessage,
    getAllAdminMessageSuccess,
    getAllAdminMessageError,
    getAdminMessage,
    getAdminMessageSuccess,
    getAdminMessageError,
    getUserAdminMessages,
    getUserAdminMessageSuccess,
    getUserAdminMessageError
} from '../actions/adminmessage.actions';

export interface AdminMessage {
    id?: number;
    adminname:string,
    admin_id: number,
    message: string,
    username:string,
    user_id: number,
    usermessage_id:number,
    created_at?: Date;
    updated_at?: Date;
}

export interface AdminMessageState {
    adminMessage: AdminMessage;
    allAdminMessage: AdminMessage[];
    allUserAdminMessage: AdminMessage[],
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    message: string;
}

const initialState: AdminMessageState = {
    adminMessage: {} as AdminMessage,
    allAdminMessage: [],
    allUserAdminMessage:[],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
};

export const _adminMessageReducer = createReducer(
    initialState,
    on(createAdminMessage, (state) => ({ ...state, isLoading: true })),
    on(createAdminMessageSuccess, (state, { adminMessageData }) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        allAdminMessage: [...state.allAdminMessage, adminMessageData]
    })),
    on(createAdminMessageError, (state, { error }) => ({ ...state, isLoading: false, isError: true, message: error })),
    on(updateAdminMessage, (state) => ({ ...state, isLoading: true })),
    on(updateAdminMessageSuccess, (state, {adminMessageData}) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        adminMessage: {...adminMessageData}
    })),
    on(updateAdminMessageError, (state, { error }) => ({ ...state, isLoading: false, isError: true, message: error })),
    on(deleteAdminMessage, (state) => ({ ...state, isLoading: true })),
    on(deleteAdminMessageSuccess, (state, { id }) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        allAdminMessage: state.allAdminMessage.filter(item => item.id !== id)
    })),
    on(deleteAdminMessageError, (state, { error }) => ({ ...state, isLoading: false, isError: true, message: error })),
    on(getAdminMessage, (state) => ({ ...state, isLoading: true })),
    on(getAdminMessageSuccess, (state, { adminMessageData }) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        adminMessage: adminMessageData
    })),
    on(getAdminMessageError, (state, { error }) => ({ ...state, isLoading: false, isError: true, message: error })),
    on(getAllAdminMessage, (state) => ({ ...state, isLoading: true })),
    on(getAllAdminMessageSuccess, (state, { data }) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        allAdminMessage: data
    })),
    on(getAllAdminMessageError, (state, { error }) => ({ ...state, isLoading: false, isError: true, message: error })),
    on(getUserAdminMessages, (state)=>({...state, isLoading:true})),
    on(getUserAdminMessageSuccess, (state, {data})=>({
        ...state,
        isLoading: false,
        isSuccess: true,
        allUserAdminMessage:  data
    })),
    on(getUserAdminMessageError, (state, {error})=>({
        ...state,
        isLoading:false,
        isError:true,
        message: error,
    }))
);
export const adminMessageReducer = (action:any, data:any)=>{
    return _adminMessageReducer(action, data)
}
