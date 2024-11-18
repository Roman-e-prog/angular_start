import { createReducer, on } from '@ngrx/store';
import {
    createUserMessage,
    createUserMessageSuccess,
    createUserMessageError,
    updateUserMessage,
    updateUserMessageSuccess,
    updateUserMessageError,
    deleteUserMessage,
    deleteUserMessageSuccess,
    deleteUserMessageError,
    getAllUserMessage,
    getAllUserMessageSuccess,
    getAllUserMessageError,
    getUserMessage,
    getUserMessageSuccess,
    getUserMessageError
} from '../actions/usermessage.actions';

export interface UserMessage {
    id?: number;
    username:string,
    user_id: number,
    message: string,
    is_answered?: boolean,
    created_at?: Date;
    updated_at?: Date;
}

export interface UserMessageState {
    userMessage: UserMessage;
    allUserMessage: UserMessage[];
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    message: string;
}

const initialState: UserMessageState = {
    userMessage: {} as UserMessage,
    allUserMessage: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
};

export const _userMessageReducer = createReducer(
    initialState,
    on(createUserMessage, (state) => ({ ...state, isLoading: true })),
    on(createUserMessageSuccess, (state, { userMessageData }) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        allUserMessage: [...state.allUserMessage, userMessageData]
    })),
    on(createUserMessageError, (state, { error }) => ({ ...state, isLoading: false, isError: true, message: error})),
    on(updateUserMessage, (state) => ({ ...state, isLoading: true })),
    on(updateUserMessageSuccess, (state, {userMessageData}) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        userMessage: {...userMessageData}
    })),
    on(updateUserMessageError, (state, { error }) => ({ ...state, isLoading: false, isError: true, message: error })),
    on(deleteUserMessage, (state) => ({ ...state, isLoading: true })),
    on(deleteUserMessageSuccess, (state, { id }) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        allUserMessage: state.allUserMessage.filter(item => item.id !== id)
    })),
    on(deleteUserMessageError, (state, { error }) => ({ ...state, isLoading: false, isError: true, message: error.message })),
    on(getUserMessage, (state) => ({ ...state, isLoading: true })),
    on(getUserMessageSuccess, (state, { userMessageData }) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        userMessage: userMessageData
    })),
    on(getUserMessageError, (state, { error }) => ({ ...state, isLoading: false, isError: true, message: error })),
    on(getAllUserMessage, (state) => ({ ...state, isLoading: true })),
    on(getAllUserMessageSuccess, (state, { data }) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        allUserMessage: data
    })),
    on(getAllUserMessageError, (state, { error }) => ({ ...state, isLoading: false, isError: true, message: error }))
);
export const userMessageReducer = (action:any, data:any)=>{
    return _userMessageReducer(action, data)
}
