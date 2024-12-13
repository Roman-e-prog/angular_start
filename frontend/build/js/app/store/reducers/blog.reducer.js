"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.blogReducer=exports._blogReducer=void 0;var _store=require("@ngrx/store"),_blog=require("../actions/blog.actions");const initialState={blog:{},allBlog:[],isLoading:!1,isSuccess:!1,isError:!1,message:""},_blogReducer=exports._blogReducer=(0,_store.createReducer)(initialState,(0,_store.on)(_blog.createBlog,(o=>({...o,isLoading:!0}))),(0,_store.on)(_blog.createBlogSuccess,((o,{blogData:e})=>({...o,isLoading:!1,isSuccess:!0,allBlog:[...o.allBlog,e]}))),(0,_store.on)(_blog.createBlogError,((o,{error:e})=>({...o,isLoading:!1,isError:!0,message:e}))),(0,_store.on)(_blog.updateBlog,(o=>({...o,isLoading:!0}))),(0,_store.on)(_blog.updateBlogSuccess,((o,{blogData:e})=>({...o,isLoading:!1,isSuccess:!0,blog:{...e}}))),(0,_store.on)(_blog.updateBlogError,((o,{error:e})=>({...o,isLoading:!1,isError:!0,message:e}))),(0,_store.on)(_blog.deleteBlog,(o=>({...o,isLoading:!0}))),(0,_store.on)(_blog.deleteBlogSuccess,((o,{id:e})=>({...o,isLoading:!1,isSuccess:!0,allBlog:o.allBlog.filter((o=>o.id!==e))}))),(0,_store.on)(_blog.deleteBlogError,((o,{error:e})=>({...o,isLoading:!1,isError:!0,message:e}))),(0,_store.on)(_blog.getBlog,(o=>({...o,isLoading:!0}))),(0,_store.on)(_blog.getBlogSuccess,((o,{blogData:e})=>({...o,isLoading:!1,isSuccess:!0,blog:e}))),(0,_store.on)(_blog.getBlogError,((o,{error:e})=>({...o,isLoading:!1,isError:!0,message:e}))),(0,_store.on)(_blog.getAllBlog,(o=>({...o,isLoading:!0}))),(0,_store.on)(_blog.getAllBlogSuccess,((o,{data:e})=>({...o,isLoading:!1,isSuccess:!0,allBlog:e}))),(0,_store.on)(_blog.getAllBlogError,((o,{error:e})=>({...o,isLoading:!1,isError:!0,message:e})))),blogReducer=(o,e)=>_blogReducer(o,e);exports.blogReducer=blogReducer;