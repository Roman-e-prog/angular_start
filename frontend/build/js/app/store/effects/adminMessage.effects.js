"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.AdminMessagesEffect=void 0;var _dec,_class,_core=require("@angular/core"),_effects=require("@ngrx/effects"),_environment=require("../../environments/environment"),_adminmessage=require("../actions/adminmessage.actions"),_rxjs=require("rxjs");let AdminMessagesEffect=exports.AdminMessagesEffect=(_dec=(0,_core.Injectable)())(_class=class{constructor(e,s,a){this.store=e,this.actions$=s,this.httpClient=a,this.api_url=`${_environment.environment.apiURL}api/adminmessages/`,this.createAdminMessage$=(0,_effects.createEffect)((()=>this.actions$.pipe((0,_effects.ofType)(_adminmessage.createAdminMessage),(0,_rxjs.mergeMap)((e=>this.httpClient.post(this.api_url,e.adminMessageData).pipe((0,_rxjs.map)((e=>(this.store.dispatch((0,_adminmessage.getAllAdminMessage)()),(0,_adminmessage.createAdminMessageSuccess)({adminMessageData:e})))),(0,_rxjs.catchError)((e=>(0,_rxjs.of)((0,_adminmessage.createAdminMessageError)({error:e})))))))))),this.updateAdminMessage$=(0,_effects.createEffect)((()=>this.actions$.pipe((0,_effects.ofType)(_adminmessage.updateAdminMessage),(0,_rxjs.mergeMap)((e=>this.httpClient.put(this.api_url+e.id,e.adminMessageData).pipe((0,_rxjs.map)((e=>(this.store.dispatch((0,_adminmessage.getAllAdminMessage)()),(0,_adminmessage.updateAdminMessageSuccess)({adminMessageData:e})))),(0,_rxjs.catchError)((e=>(0,_rxjs.of)((0,_adminmessage.updateAdminMessageError)({error:e})))))))))),this.deleteAdminMessage$=(0,_effects.createEffect)((()=>this.actions$.pipe((0,_effects.ofType)(_adminmessage.deleteAdminMessage),(0,_rxjs.mergeMap)((e=>this.httpClient.delete(this.api_url+e.id).pipe((0,_rxjs.map)((s=>(this.store.dispatch((0,_adminmessage.getAllAdminMessage)()),(0,_adminmessage.deleteAdminMessageSuccess)({id:e.id})))),(0,_rxjs.catchError)((e=>(0,_rxjs.of)((0,_adminmessage.deleteAdminMessageError)({error:e})))))))))),this.getAdminMessage$=(0,_effects.createEffect)((()=>this.actions$.pipe((0,_effects.ofType)(_adminmessage.getAdminMessage),(0,_rxjs.mergeMap)((e=>this.httpClient.get(this.api_url+"find/"+e.id).pipe((0,_rxjs.map)((e=>(0,_adminmessage.getAdminMessageSuccess)({adminMessageData:e}))),(0,_rxjs.catchError)((e=>(0,_rxjs.of)((0,_adminmessage.getAdminMessageError)({error:e})))))))))),this.getAllAdminMessage$=(0,_effects.createEffect)((()=>this.actions$.pipe((0,_effects.ofType)(_adminmessage.getAllAdminMessage),(0,_rxjs.mergeMap)((e=>this.httpClient.get(this.api_url+"find/").pipe((0,_rxjs.map)((e=>(0,_adminmessage.getAllAdminMessageSuccess)({data:e}))),(0,_rxjs.catchError)((e=>(0,_rxjs.of)((0,_adminmessage.getAllAdminMessageError)({error:e})))))))))),this.getUserAdminMessages$=(0,_effects.createEffect)((()=>this.actions$.pipe((0,_effects.ofType)(_adminmessage.getUserAdminMessages),(0,_rxjs.mergeMap)((e=>this.httpClient.get(this.api_url+"getUserAdminMessages/"+e.id).pipe((0,_rxjs.map)((e=>(0,_adminmessage.getUserAdminMessageSuccess)({data:e}))),(0,_rxjs.catchError)((e=>(0,_rxjs.of)((0,_adminmessage.getUserAdminMessageError)({error:e}))))))))))}})||_class;