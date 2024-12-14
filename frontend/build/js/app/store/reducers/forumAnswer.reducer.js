"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.forumAnswerReducer=exports._forumAnswerReducer=void 0;var _store=require("@ngrx/store"),_forumAnswers=require("../actions/forumAnswers.actions");const initialState={forumAnswer:{},allForumAnswer:[],allAnswersToQuestion:[],isLoading:!1,isSuccess:!1,isError:!1,message:""},_forumAnswerReducer=exports._forumAnswerReducer=(0,_store.createReducer)(initialState,(0,_store.on)(_forumAnswers.createForumAnswer,(s=>({...s,isLoading:!0}))),(0,_store.on)(_forumAnswers.createForumAnswerSuccess,((s,{forumAnswerData:r})=>({...s,isLoading:!1,isSuccess:!0,allForumAnswer:[...s.allForumAnswer,r]}))),(0,_store.on)(_forumAnswers.createForumAnswerError,((s,{error:r})=>({...s,isLoading:!1,isError:!0,message:r}))),(0,_store.on)(_forumAnswers.updateForumAnswer,(s=>({...s,isLoading:!0}))),(0,_store.on)(_forumAnswers.updateForumAnswerSuccess,((s,{forumAnswerData:r})=>({...s,isLoading:!1,isSuccess:!0,forumAnswer:{...r}}))),(0,_store.on)(_forumAnswers.updateForumAnswerError,((s,{error:r})=>({...s,isLoading:!1,isError:!0,message:r}))),(0,_store.on)(_forumAnswers.deleteForumAnswer,(s=>({...s,isLoading:!0}))),(0,_store.on)(_forumAnswers.deleteForumAnswerSuccess,((s,{id:r})=>({...s,isLoading:!1,isSuccess:!0,allForumAnswer:s.allForumAnswer.filter((s=>s.id!==r))}))),(0,_store.on)(_forumAnswers.deleteForumAnswerError,((s,{error:r})=>({...s,isLoading:!1,isError:!0,message:r}))),(0,_store.on)(_forumAnswers.getForumAnswer,(s=>({...s,isLoading:!0}))),(0,_store.on)(_forumAnswers.getForumAnswerSuccess,((s,{forumAnswerData:r})=>({...s,isLoading:!1,isSuccess:!0,forumAnswer:r}))),(0,_store.on)(_forumAnswers.getForumAnswerError,((s,{error:r})=>({...s,isLoading:!1,isError:!0,message:r}))),(0,_store.on)(_forumAnswers.getAllForumAnswer,(s=>({...s,isLoading:!0}))),(0,_store.on)(_forumAnswers.getAllForumAnswerSuccess,((s,{forumAnswerData:r})=>({...s,isLoading:!1,isSuccess:!0,allForumAnswer:r}))),(0,_store.on)(_forumAnswers.getAllForumAnswerError,((s,{error:r})=>({...s,isLoading:!1,isError:!0,message:r}))),(0,_store.on)(_forumAnswers.getAllAnswersToQuestion,(s=>({...s,isLoading:!0}))),(0,_store.on)(_forumAnswers.getAllAnswersToQuestionSuccess,((s,{forumAnswerData:r})=>({...s,isLoading:!1,isSuccess:!0,allAnswersToQuestion:r}))),(0,_store.on)(_forumAnswers.getAllAnswersToQuestionError,((s,{error:r})=>({...s,isLoading:!1,isError:!0,message:r}))),(0,_store.on)(_forumAnswers.incrementAnswerLikes,(s=>({...s,isLoading:!0}))),(0,_store.on)(_forumAnswers.incrementAnswerLikesSuccess,((s,{id:r,likes:e})=>({...s,isLoading:!1,isSuccess:!0,allAnswersToQuestion:s.allAnswersToQuestion.map((s=>s.id===r?{...s,likes:e}:s))}))),(0,_store.on)(_forumAnswers.incrementAnswerLikesError,((s,{error:r})=>({...s,isLoading:!1,isError:!0,message:r}))),(0,_store.on)(_forumAnswers.incrementAnswerDisLikes,(s=>({...s,isLoading:!0}))),(0,_store.on)(_forumAnswers.incrementAnswerDisLikesSuccess,((s,{id:r,dislikes:e})=>({...s,isLoading:!1,isSuccess:!0,allAnswersToQuestion:s.allAnswersToQuestion.map((s=>s.id===r?{...s,dislikes:e}:s))}))),(0,_store.on)(_forumAnswers.incrementAnswerDisLikesError,((s,{error:r})=>({...s,isLoading:!1,isError:!0,message:r}))),(0,_store.on)(_forumAnswers.hasSolved,(s=>({...s,isLoading:!0}))),(0,_store.on)(_forumAnswers.hasSolvedSuccess,((s,{id:r,has_solved:e})=>({...s,isLoading:!1,isSuccess:!0,allAnswersToQuestion:s.allAnswersToQuestion.map((s=>s.id===r?{...s,has_solved:e}:s))}))),(0,_store.on)(_forumAnswers.hasSolvedError,((s,{error:r})=>({...s,isLoading:!1,isError:!0,message:r})))),forumAnswerReducer=(s,r)=>_forumAnswerReducer(s,r);exports.forumAnswerReducer=forumAnswerReducer;