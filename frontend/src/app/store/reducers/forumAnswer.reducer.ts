import { createReducer, on } from '@ngrx/store';
import {
    createForumAnswer,
    createForumAnswerSuccess,
    createForumAnswerError,
    updateForumAnswer,
    updateForumAnswerSuccess,
    updateForumAnswerError,
    deleteForumAnswer,
    deleteForumAnswerSuccess,
    deleteForumAnswerError,
    getAllForumAnswer,
    getAllForumAnswerSuccess,
    getAllForumAnswerError,
    getForumAnswer,
    getForumAnswerSuccess,
    getForumAnswerError,
    getAllAnswersToQuestion,
    getAllAnswersToQuestionSuccess,
    getAllAnswersToQuestionError,
    incrementAnswerLikes,
    incrementAnswerLikesSuccess,
    incrementAnswerLikesError,
    incrementAnswerDisLikes,
    incrementAnswerDisLikesSuccess,
    incrementAnswerDisLikesError,
    hasSolved,
    hasSolvedSuccess,
    hasSolvedError,
} from '../actions/forumAnswers.actions';

export interface ForumAnswer {
    id?: number;
    username:string,
    user_id: number,
    is_admin: boolean,
    question_id: number,
    answer: string,
    likes?: number ,
    dislikes?: number,
    like_ids?: number[],
    dislike_ids?: number[]
    has_solved?: boolean,
    answerername?: string,
    answerer_id?: number,
    views?: number,
    created_at?: Date;
    updated_at?: Date;
}

export interface ForumAnswerState {
    forumAnswer: ForumAnswer;
    allForumAnswer: ForumAnswer[];
    allAnswersToQuestion: ForumAnswer[];
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    message: string;
}

const initialState: ForumAnswerState = {
    forumAnswer: {} as ForumAnswer,
    allForumAnswer: [],
    allAnswersToQuestion: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
};

export const _forumAnswerReducer = createReducer(
    initialState,
    on(createForumAnswer, (state) => ({ ...state, isLoading: true })),
    on(createForumAnswerSuccess, (state, { forumAnswerData }) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        allForumAnswer: [...state.allForumAnswer, forumAnswerData]
    })),
    on(createForumAnswerError, (state, { error }) => ({ ...state, isLoading: false, isError: true, message: error })),
    on(updateForumAnswer, (state) => ({ ...state, isLoading: true })),
    on(updateForumAnswerSuccess, (state, {forumAnswerData}) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        forumAnswer: {...forumAnswerData}
    })),
    on(updateForumAnswerError, (state, { error }) => ({ ...state, isLoading: false, isError: true, message: error })),
    on(deleteForumAnswer, (state) => ({ ...state, isLoading: true })),
    on(deleteForumAnswerSuccess, (state, { id }) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        allForumAnswer: state.allForumAnswer.filter(item => item.id !== id)
    })),
    on(deleteForumAnswerError, (state, { error }) => ({ ...state, isLoading: false, isError: true, message: error })),
    on(getForumAnswer, (state) => ({ ...state, isLoading: true })),
    on(getForumAnswerSuccess, (state, { forumAnswerData }) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        forumAnswer: forumAnswerData
    })),
    on(getForumAnswerError, (state, { error }) => ({ ...state, isLoading: false, isError: true, message: error })),
    on(getAllForumAnswer, (state) => ({ ...state, isLoading: true })),
    on(getAllForumAnswerSuccess, (state, { forumAnswerData }) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        allForumAnswer: forumAnswerData
    })),
    on(getAllForumAnswerError, (state, { error }) => ({ ...state, isLoading: false, isError: true, message: error })),
    on(getAllAnswersToQuestion, (state) => ({ ...state, isLoading: true})),
    on(getAllAnswersToQuestionSuccess, (state, {forumAnswerData}) => (
        { ...state, 
            isLoading: false,
            isSuccess:true,
            allAnswersToQuestion: forumAnswerData
        })),
    on(getAllAnswersToQuestionError, (state, {error}) => (
        { ...state, 
            isLoading: false,
            isError:true,
            message: error
        })),
        on(incrementAnswerLikes, (state) => ({
            ...state,
            isLoading: true,
          })),
          on(incrementAnswerLikesSuccess, (state, { id, likes}) => ({
            ...state,
            isLoading:false,
            isSuccess:true,
            allAnswersToQuestion: state.allAnswersToQuestion.map((answer) =>
              answer.id === id ? { ...answer, likes} : answer
            ),
          })),
          on(incrementAnswerLikesError, (state, {error}) => ({
            ...state,
            isLoading: false,
            isError:true,
            message:error
          })),
          on(incrementAnswerDisLikes, (state) => ({
            ...state,
            isLoading: true,
          })),
          // on(incrementAnswerDisLikes, (state, action) => {
          //   console.log('incrementAnswerDisLikes action processed:', action);
          //   return state;
          // }),
          on(incrementAnswerDisLikesSuccess, (state, { id, dislikes}) => ({
            ...state,
            isLoading:false,
            isSuccess:true,
            allAnswersToQuestion: state.allAnswersToQuestion.map((answer) =>
              answer.id === id ? { ...answer, dislikes} : answer
            ),
          })),
          on(incrementAnswerDisLikesError, (state,{error}) => ({
            ...state,
            isLoading: false,
            isError:true,
            message:error
          })),             
          on(hasSolved, (state) => ({
            ...state,
            isLoading: true,
          })),
          on(hasSolvedSuccess, (state, { id, has_solved }) => ({
            ...state,
            isLoading:false,
            isSuccess:true,
            allAnswersToQuestion: state.allAnswersToQuestion.map((answer) =>
              answer.id === id ? { ...answer, has_solved } : answer
            ),
          })),
          on(hasSolvedError, (state,{error}) => ({
            ...state,
            isLoading: false,
            isError:true,
            message:error
          })),   
);
export const forumAnswerReducer = (action:any, data:any)=>{
    return _forumAnswerReducer(action, data)
}
