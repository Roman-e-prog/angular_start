"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.ForumLinksService=void 0;var _dec,_class,_core=require("@angular/core"),_rxjs=require("rxjs");let ForumLinksService=exports.ForumLinksService=(_dec=(0,_core.Injectable)({providedIn:"root"}))(_class=class{constructor(e){this.httpClient=e,this.forumLinksSubject=new _rxjs.BehaviorSubject(null),this.forumLinks$=this.forumLinksSubject.asObservable(),this.fetchForumLinks=()=>this.httpClient.get("assets/forumlinks.json").subscribe({next:e=>this.forumLinksSubject.next(e),error:e=>console.error(e)}),this.getForumLinks=()=>this.forumLinks$}})||_class;