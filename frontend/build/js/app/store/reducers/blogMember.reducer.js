"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports._blogmemberReducer=exports.BlogmemberReducer=void 0;var _store=require("@ngrx/store"),_blogmember=require("../actions/blogmember.actions");const initialState={blogmember:{},allBlogmember:[],isLoading:!1,isSuccess:!1,isError:!1,message:""},_blogmemberReducer=exports._blogmemberReducer=(0,_store.createReducer)(initialState,(0,_store.on)(_blogmember.updateBlogmember,(e=>({...e,isLoading:!0}))),(0,_store.on)(_blogmember.updateBlogmemberSuccess,((e,{blogmemberData:r})=>({...e,isLoading:!1,isSuccess:!0,Blogmember:{...r}}))),(0,_store.on)(_blogmember.updateBlogmemberError,((e,{error:r})=>({...e,isLoading:!1,isError:!0,message:r}))),(0,_store.on)(_blogmember.deleteBlogmember,(e=>({...e,isLoading:!0}))),(0,_store.on)(_blogmember.deleteBlogmemberSuccess,((e,{id:r})=>({...e,isLoading:!1,isSuccess:!0,allBlogmember:e.allBlogmember.filter((e=>e.id!==r))}))),(0,_store.on)(_blogmember.deleteBlogmemberError,((e,{error:r})=>({...e,isLoading:!1,isError:!0,message:r}))),(0,_store.on)(_blogmember.getBlogmember,(e=>({...e,isLoading:!0}))),(0,_store.on)(_blogmember.getBlogmemberSuccess,((e,{blogmemberData:r})=>({...e,isLoading:!1,isSuccess:!0,blogmember:r}))),(0,_store.on)(_blogmember.getBlogmemberError,((e,{error:r})=>({...e,isLoading:!1,isError:!0,message:r}))),(0,_store.on)(_blogmember.getAllBlogmember,(e=>({...e,isLoading:!0}))),(0,_store.on)(_blogmember.getAllBlogmemberSuccess,((e,{data:r})=>({...e,isLoading:!1,isSuccess:!0,allBlogmember:r}))),(0,_store.on)(_blogmember.getAllBlogmemberError,((e,{error:r})=>({...e,isLoading:!1,isError:!0,message:r})))),BlogmemberReducer=(e,r)=>_blogmemberReducer(e,r);exports.BlogmemberReducer=BlogmemberReducer;