"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.BlogComponent=void 0;var _dec,_class,_core=require("@angular/core"),_rxjs=require("rxjs"),_blog=require("../../store/selectors/blog.selectors"),_blog2=require("../../store/actions/blog.actions"),_common=require("@angular/common"),_router=require("@angular/router"),_navbar=require("../../components/navbar/navbar.component"),_mobileNavbar=require("../../components/mobile-navbar/mobile-navbar.component");let BlogComponent=exports.BlogComponent=(_dec=(0,_core.Component)({selector:"app-blog",standalone:!0,imports:[_common.CommonModule,_router.RouterLink,_navbar.NavbarComponent,_mobileNavbar.MobileNavbarComponent],templateUrl: '../../html/app/pages/blog.component.html',styleUrl: '../../css/app/pages/blog.component.css'}))(_class=class{constructor(e,s,o,r,t){this.store=e,this.toastr=s,this.resizeObserverService=o,this.cd=r,this.platFormId=t,this.allBlogEntries$=this.store.select(_blog.selectAllBlogData),this.isLoading$=this.store.select(_blog.selectBlogLoading),this.isError$=this.store.select(_blog.selectBlogError),this.message$=this.store.select(_blog.selectBlogMessage),this.windowWidth=void 0,this.resizeSubscription=void 0}ngOnInit(){(0,_common.isPlatformBrowser)(this.platFormId)&&(this.resizeSubscription=this.resizeObserverService.resize$.subscribe((e=>{this.windowWidth=e,this.cd.detectChanges()}))),this.isError$.pipe((0,_rxjs.tap)((e=>{e&&this.message$.subscribe((e=>{this.toastr.error(e)}))}))).subscribe(),this.store.dispatch((0,_blog2.getAllBlog)())}ngOnDestroy(){this.resizeSubscription&&this.resizeSubscription.unsubscribe()}})||_class;