"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.bibliothekReducer=exports._bibliothekReducer=void 0;var _store=require("@ngrx/store"),_bibliothek=require("../actions/bibliothek.actions");const initialState={bibliothek:{},allBibliothek:[],isLoading:!1,isSuccess:!1,isError:!1,message:""},_bibliothekReducer=exports._bibliothekReducer=(0,_store.createReducer)(initialState,(0,_store.on)(_bibliothek.createBibliothek,(i=>({...i,isLoading:!0}))),(0,_store.on)(_bibliothek.createBibliothekSuccess,((i,{bibliothekData:e})=>({...i,isLoading:!1,isSuccess:!0,allBibliothek:[...i.allBibliothek,e]}))),(0,_store.on)(_bibliothek.createBibliothekError,((i,{error:e})=>({...i,isLoading:!1,isError:!0,message:e}))),(0,_store.on)(_bibliothek.updateBibliothek,(i=>({...i,isLoading:!0}))),(0,_store.on)(_bibliothek.updateBibliothekSuccess,((i,{bibliothekData:e})=>({...i,isLoading:!1,isSuccess:!0,bibliothek:{...e}}))),(0,_store.on)(_bibliothek.updateBibliothekError,((i,{error:e})=>({...i,isLoading:!1,isError:!0,message:e}))),(0,_store.on)(_bibliothek.deleteBibliothek,(i=>({...i,isLoading:!0}))),(0,_store.on)(_bibliothek.deleteBibliothekSuccess,((i,{id:e})=>({...i,isLoading:!1,isSuccess:!0,allBibliothek:i.allBibliothek.filter((i=>i.id!==e))}))),(0,_store.on)(_bibliothek.deleteBibliothekError,((i,{error:e})=>({...i,isLoading:!1,isError:!0,message:e}))),(0,_store.on)(_bibliothek.getBibliothek,(i=>({...i,isLoading:!0}))),(0,_store.on)(_bibliothek.getBibliothekSuccess,((i,{bibliothekData:e})=>({...i,isLoading:!1,isSuccess:!0,bibliothek:e}))),(0,_store.on)(_bibliothek.getBibliothekError,((i,{error:e})=>({...i,isLoading:!1,isError:!0,message:e}))),(0,_store.on)(_bibliothek.getAllBibliothek,(i=>({...i,isLoading:!0}))),(0,_store.on)(_bibliothek.getAllBibliothekSuccess,((i,{data:e})=>({...i,isLoading:!1,isSuccess:!0,allBibliothek:e}))),(0,_store.on)(_bibliothek.getAllBibliothekError,((i,{error:e})=>({...i,isLoading:!1,isError:!0,message:e})))),bibliothekReducer=(i,e)=>_bibliothekReducer(i,e);exports.bibliothekReducer=bibliothekReducer;