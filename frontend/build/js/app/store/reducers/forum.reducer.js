"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.forumReducer=exports._forumReducer=void 0;var _store=require("@ngrx/store"),_forum=require("../actions/forum.actions");const initialState={forum:{},allForum:[],allUserQuestions:[],isLoading:!1,isSuccess:!1,isError:!1,message:""},_forumReducer=exports._forumReducer=(0,_store.createReducer)(initialState,(0,_store.on)(_forum.createForum,(r=>({...r,isLoading:!0}))),(0,_store.on)(_forum.createForumSuccess,((r,{forumData:o})=>({...r,isLoading:!1,isSuccess:!0,allForum:[...r.allForum,o]}))),(0,_store.on)(_forum.createForumError,((r,{error:o})=>({...r,isLoading:!1,isError:!0,message:o}))),(0,_store.on)(_forum.updateForum,(r=>({...r,isLoading:!0}))),(0,_store.on)(_forum.updateForumSuccess,((r,{forumData:o})=>({...r,isLoading:!1,isSuccess:!0,forum:{...o}}))),(0,_store.on)(_forum.updateForumError,((r,{error:o})=>({...r,isLoading:!1,isError:!0,message:o}))),(0,_store.on)(_forum.deleteForum,(r=>({...r,isLoading:!0}))),(0,_store.on)(_forum.deleteForumSuccess,((r,{id:o})=>({...r,isLoading:!1,isSuccess:!0,allForum:r.allForum.filter((r=>r.id!==o))}))),(0,_store.on)(_forum.deleteForumError,((r,{error:o})=>({...r,isLoading:!1,isError:!0,message:o}))),(0,_store.on)(_forum.getForum,(r=>({...r,isLoading:!0}))),(0,_store.on)(_forum.getForumSuccess,((r,{forumData:o})=>({...r,isLoading:!1,isSuccess:!0,forum:o}))),(0,_store.on)(_forum.getForumError,((r,{error:o})=>({...r,isLoading:!1,isError:!0,message:o}))),(0,_store.on)(_forum.getAllForum,(r=>({...r,isLoading:!0}))),(0,_store.on)(_forum.getAllForumSuccess,((r,{data:o})=>({...r,isLoading:!1,isSuccess:!0,allForum:o}))),(0,_store.on)(_forum.getAllForumError,((r,{error:o})=>({...r,isLoading:!1,isError:!0,message:o}))),(0,_store.on)(_forum.getAllUserQuestions,(r=>({...r,isLoading:!0}))),(0,_store.on)(_forum.getAllUserQuestionsSuccess,((r,{data:o})=>({...r,isLoading:!1,isSuccess:!0,allUserQuestions:o}))),(0,_store.on)(_forum.getAllUserQuestionsError,((r,{error:o})=>({...r,isLoading:!1,isError:!0,message:o})))),forumReducer=(r,o)=>_forumReducer(r,o);exports.forumReducer=forumReducer;