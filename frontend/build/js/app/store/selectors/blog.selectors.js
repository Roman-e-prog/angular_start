"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.selectBlogMessage=exports.selectBlogLoading=exports.selectBlogError=exports.selectBlogData=exports.selectAllBlogData=void 0;var _store=require("@ngrx/store");const selectBlog=(0,_store.createFeatureSelector)("blog"),selectAllBlogData=exports.selectAllBlogData=(0,_store.createSelector)(selectBlog,(e=>e.allBlog)),selectBlogData=exports.selectBlogData=(0,_store.createSelector)(selectBlog,(e=>e.blog)),selectBlogLoading=exports.selectBlogLoading=(0,_store.createSelector)(selectBlog,(e=>e.isLoading)),selectBlogError=exports.selectBlogError=(0,_store.createSelector)(selectBlog,(e=>e.isError)),selectBlogMessage=exports.selectBlogMessage=(0,_store.createSelector)(selectBlog,(e=>e.message));