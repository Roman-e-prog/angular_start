"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.selectUserAdminMessage=exports.selectAllAdminMessageData=exports.selectAdminMessageMessage=exports.selectAdminMessageLoading=exports.selectAdminMessageError=exports.selectAdminMessageData=void 0;var _store=require("@ngrx/store");const selectAdminMessage=(0,_store.createFeatureSelector)("adminMessage"),selectAllAdminMessageData=exports.selectAllAdminMessageData=(0,_store.createSelector)(selectAdminMessage,(e=>e.allAdminMessage)),selectAdminMessageData=exports.selectAdminMessageData=(0,_store.createSelector)(selectAdminMessage,(e=>e.adminMessage)),selectAdminMessageLoading=exports.selectAdminMessageLoading=(0,_store.createSelector)(selectAdminMessage,(e=>e.isLoading)),selectAdminMessageError=exports.selectAdminMessageError=(0,_store.createSelector)(selectAdminMessage,(e=>e.isError)),selectAdminMessageMessage=exports.selectAdminMessageMessage=(0,_store.createSelector)(selectAdminMessage,(e=>e.message)),selectUserAdminMessage=exports.selectUserAdminMessage=(0,_store.createSelector)(selectAdminMessage,(e=>e.allUserAdminMessage));