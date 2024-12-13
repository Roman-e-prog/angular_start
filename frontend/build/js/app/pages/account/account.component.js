"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.AccountComponent=void 0;var _dec,_class,_core=require("@angular/core"),_forms=require("@angular/forms"),_common=require("@angular/common"),_usermessage=require("../../store/actions/usermessage.actions"),_blogmember=require("../../store/actions/blogmember.actions"),_router=require("@angular/router"),_adminMessage=require("../../store/selectors/adminMessage.selector"),_rxjs=require("rxjs"),_forum=require("../../store/selectors/forum.selectors"),_adminmessage=require("../../store/actions/adminmessage.actions"),_forum2=require("../../store/actions/forum.actions");let AccountComponent=exports.AccountComponent=(_dec=(0,_core.Component)({selector:"app-account",standalone:!0,imports:[_common.CommonModule,_forms.ReactiveFormsModule,_router.RouterLink],templateUrl: '../../html/app/pages/account.component.html',styleUrl: '../../css/app/pages/account.component.css'}))(_class=class{constructor(e,s,t,r,o,i,a){this.authService=e,this.location=s,this.store=t,this.router=r,this.route=o,this.toastr=i,this.htmlStripService=a,this.id=this.route.snapshot.paramMap.get("id"),this.userAdminMessage$=this.store.select(_adminMessage.selectUserAdminMessage),this.isError$=this.store.select(_adminMessage.selectAdminMessageError),this.isLoading$=this.store.select(_adminMessage.selectAdminMessageLoading),this.message$=this.store.select(_adminMessage.selectAdminMessageMessage),this.allUserQuestions$=this.store.select(_forum.selectAllUserQuestions),this.isErrorUserQuestions$=this.store.select(_forum.selectForumError),this.isLoadingUserQuestions$=this.store.select(_forum.selectForumLoading),this.messageUserQuestions$=this.store.select(_forum.selectForumMessage),this.user=this.authService.getUser(),this.goBack=()=>{this.location.back()},this.accountModule=!1,this.handleAccount=()=>{this.accountModule=!0},this.closeModule=()=>{this.messageModule=!1,this.deleteWarn=!1,this.accountModule=!1},this.messageModule=!1,this.openMessageForm=()=>{this.messageModule=!0},this.deleteWarn=!1,this.openDeleteWarn=()=>{this.deleteWarn=!0},this.handleDelete=()=>{this.store.dispatch((0,_blogmember.deleteBlogmember)({id:this.user.id})),this.router.navigate(["/"])},this.usermessageForm=new _forms.FormGroup({message:new _forms.FormControl("",_forms.Validators.required)}),this.onMessageSubmit=()=>{if(this.usermessageForm.valid){const{message:e}=this.usermessageForm.value,s={username:this.user.username,user_id:this.user.id,message:e};this.store.dispatch((0,_usermessage.createUserMessage)({userMessageData:s})),this.usermessageForm.reset}},this.updateUserForm=new _forms.FormGroup({vorname:new _forms.FormControl("",_forms.Validators.required),nachname:new _forms.FormControl("",_forms.Validators.required)}),this.onSubmit=()=>{if(this.updateUserForm.valid){const{vorname:e,nachname:s}=this.updateUserForm.value,t={vorname:e,nachname:s};this.store.dispatch((0,_blogmember.updateBlogmember)({id:parseInt(this.id),blogmemberData:t}))}}}ngOnInit(){(0,_rxjs.combineLatest)([this.isError$,this.isErrorUserQuestions$]).subscribe((([e,s])=>{e&&this.message$.subscribe((e=>{this.toastr.error(e)})),s&&this.message$.subscribe((e=>{this.toastr.error(e)}))})),this.store.dispatch((0,_adminmessage.getUserAdminMessages)({id:parseInt(this.id)})),this.store.dispatch((0,_forum2.getAllUserQuestions)({id:parseInt(this.id)})),this.updateUserForm.get("vorname")?.setValue(this.user&&this.user.vorname),this.updateUserForm.get("nachname")?.setValue(this.user&&this.user.nachname)}getProcessedContent(e){return this.htmlStripService.stripHtml(e).trim()}})||_class;