"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.selectUserMessageMessage=exports.selectUserMessageLoading=exports.selectUserMessageError=exports.selectUserMessageData=exports.selectAllUserMessageData=void 0;var _store=require("@ngrx/store");const selectUserMessage=(0,_store.createFeatureSelector)("userMessage"),selectAllUserMessageData=exports.selectAllUserMessageData=(0,_store.createSelector)(selectUserMessage,(e=>e.allUserMessage)),selectUserMessageData=exports.selectUserMessageData=(0,_store.createSelector)(selectUserMessage,(e=>e.userMessage)),selectUserMessageLoading=exports.selectUserMessageLoading=(0,_store.createSelector)(selectUserMessage,(e=>e.isLoading)),selectUserMessageError=exports.selectUserMessageError=(0,_store.createSelector)(selectUserMessage,(e=>e.isError)),selectUserMessageMessage=exports.selectUserMessageMessage=(0,_store.createSelector)(selectUserMessage,(e=>e.message));