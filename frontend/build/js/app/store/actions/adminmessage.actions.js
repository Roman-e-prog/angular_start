"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.updateAdminMessageSuccess=exports.updateAdminMessageError=exports.updateAdminMessage=exports.getUserAdminMessages=exports.getUserAdminMessageSuccess=exports.getUserAdminMessageError=exports.getAllAdminMessageSuccess=exports.getAllAdminMessageError=exports.getAllAdminMessage=exports.getAdminMessageSuccess=exports.getAdminMessageError=exports.getAdminMessage=exports.deleteAdminMessageSuccess=exports.deleteAdminMessageError=exports.deleteAdminMessage=exports.createAdminMessageSuccess=exports.createAdminMessageError=exports.createAdminMessage=void 0;var _store=require("@ngrx/store");const createAdminMessage=exports.createAdminMessage=(0,_store.createAction)("[adminMessage] Create AdminMessage",(0,_store.props)()),createAdminMessageSuccess=exports.createAdminMessageSuccess=(0,_store.createAction)("[adminMessage] Create AdminMessage Success",(0,_store.props)()),createAdminMessageError=exports.createAdminMessageError=(0,_store.createAction)("[adminMessage] Create AdminMessage Error",(0,_store.props)()),updateAdminMessage=exports.updateAdminMessage=(0,_store.createAction)("[adminMessage]  Update AdminMessage",(0,_store.props)()),updateAdminMessageSuccess=exports.updateAdminMessageSuccess=(0,_store.createAction)("[adminMessage] Update AdminMessage Success",(0,_store.props)()),updateAdminMessageError=exports.updateAdminMessageError=(0,_store.createAction)("[adminMessage] Update AdminMessage Error",(0,_store.props)()),deleteAdminMessage=exports.deleteAdminMessage=(0,_store.createAction)("[adminMessage] Delete AdminMessage",(0,_store.props)()),deleteAdminMessageSuccess=exports.deleteAdminMessageSuccess=(0,_store.createAction)("[adminMessage] Delete AdminMessage Success",(0,_store.props)()),deleteAdminMessageError=exports.deleteAdminMessageError=(0,_store.createAction)("[adminMessage] Delete AdminMessage Error",(0,_store.props)()),getAdminMessage=exports.getAdminMessage=(0,_store.createAction)("[adminMessage] Get AdminMessage",(0,_store.props)()),getAdminMessageSuccess=exports.getAdminMessageSuccess=(0,_store.createAction)("[adminMessage] Get AdminMessage Success",(0,_store.props)()),getAdminMessageError=exports.getAdminMessageError=(0,_store.createAction)("[adminMessage] Get AdminMessage Error",(0,_store.props)()),getAllAdminMessage=exports.getAllAdminMessage=(0,_store.createAction)("[adminMessage] Getall AdminMessage"),getAllAdminMessageSuccess=exports.getAllAdminMessageSuccess=(0,_store.createAction)("[adminMessage] Getall AdminMessage Success",(0,_store.props)()),getAllAdminMessageError=exports.getAllAdminMessageError=(0,_store.createAction)("[adminMessage] Getall AdminMessage Error",(0,_store.props)()),getUserAdminMessages=exports.getUserAdminMessages=(0,_store.createAction)("[adminMessage] Getall UserAdminMessage",(0,_store.props)()),getUserAdminMessageSuccess=exports.getUserAdminMessageSuccess=(0,_store.createAction)("[adminMessage] Getall UserAdminMessage Success",(0,_store.props)()),getUserAdminMessageError=exports.getUserAdminMessageError=(0,_store.createAction)("[adminMessage] Getall UserAdminMessage Error",(0,_store.props)());