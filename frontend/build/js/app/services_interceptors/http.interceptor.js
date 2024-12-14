"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.JwtInterceptor=void 0;var _dec,_class,_core=require("@angular/core"),_rxjs=require("rxjs"),_operators=require("rxjs/operators"),_jwtDecode=require("jwt-decode");let JwtInterceptor=exports.JwtInterceptor=(_dec=(0,_core.Injectable)({providedIn:"root"}))(_class=class{constructor(e,r,t,s,i){this.authService=e,this.router=r,this.toastr=t,this.navlinksService=s,this.forumLinksService=i,this.isRefreshing=!1,this.refreshTokenSubject=new _rxjs.BehaviorSubject(null)}intercept(e,r){const t=this.authService.getUser(),s=t?t.accessToken:null;if(["assets/"].some((r=>e.url.includes(r))))return r.handle(e);if(e.url.includes("/api/auth/refreshToken"))return r.handle(e);if(s&&"string"==typeof s){const i=(0,_jwtDecode.jwtDecode)(s);if(!(!i||!i.exp)&&i.exp<Date.now()/1e3)return this.isRefreshing?this.refreshTokenSubject.pipe((0,_operators.filter)((e=>null!=e)),(0,_operators.take)(1),(0,_operators.switchMap)((t=>{const s=e.clone({setHeaders:{Authorization:`Bearer ${t}`}});return r.handle(s)}))):(this.isRefreshing=!0,this.refreshTokenSubject.next(null),this.authService.refreshToken().pipe((0,_operators.switchMap)((s=>{this.isRefreshing=!1,this.refreshTokenSubject.next(s.accessToken),t.accessToken=s.accessToken,localStorage.setItem("user",JSON.stringify(t));const i=e.clone({setHeaders:{Authorization:`Bearer ${s.accessToken}`}});return this.navlinksService.getNavlinks(),this.forumLinksService.getForumLinks(),r.handle(i)})),(0,_operators.catchError)((e=>(this.toastr.error("Ein Fehler ist aufgetreten, bitte melden Sie sich neu an"),this.isRefreshing=!1,this.authService.logout(),this.router.navigate(["/login"]),(0,_rxjs.throwError)((()=>e)))))));e=e.clone({setHeaders:{Authorization:`Bearer ${s}`}})}return r.handle(e)}})||_class;