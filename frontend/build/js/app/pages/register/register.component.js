"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.RegisterComponent=void 0;var _dec,_class,_core=require("@angular/core"),_forms=require("@angular/forms"),_navbar=require("../../components/navbar/navbar.component"),_http=require("@angular/common/http"),_common=require("@angular/common"),_router=require("@angular/router"),_uniqueUsername=require("../../validators/uniqueUsername"),_uniqueEmail=require("../../validators/uniqueEmail"),_mobileNavbar=require("../../components/mobile-navbar/mobile-navbar.component");let RegisterComponent=exports.RegisterComponent=(_dec=(0,_core.Component)({selector:"app-register",standalone:!0,imports:[_forms.ReactiveFormsModule,_forms.FormsModule,_navbar.NavbarComponent,_common.CommonModule,_router.RouterLink,_http.HttpClientModule,_mobileNavbar.MobileNavbarComponent],templateUrl: '../../html/app/pages/register.component.html',styleUrls: ['../../css/app/pages/register.component.css']}))(_class=class{constructor(r,e,o,s,t,i,a){this.toastr=r,this.httpClient=e,this.router=o,this.registerService=s,this.resizeObserverService=t,this.cd=i,this.platFormId=a,this.registerForm=_forms.FormGroup,this.usernameValidator=void 0,this.emailValidator=void 0,this.windowWidth=void 0,this.resizeSubscription=void 0,this.usernameValidator=new _uniqueUsername.UsernameValidator(this.httpClient),this.emailValidator=new _uniqueEmail.EmailValidator(this.httpClient)}ngOnInit(){this.registerForm=new _forms.FormGroup({vorname:new _forms.FormControl("",_forms.Validators.required),nachname:new _forms.FormControl("",_forms.Validators.required),username:new _forms.FormControl(null,{validators:[_forms.Validators.required],asyncValidators:[this.usernameValidator.uniqueUsernameValidator()],updateOn:"blur"}),email:new _forms.FormControl(null,{validators:[_forms.Validators.required,_forms.Validators.email],asyncValidators:[this.emailValidator.uniqueEmailValidator()],updateOn:"blur"}),password:new _forms.FormControl("",[_forms.Validators.required,_forms.Validators.minLength(6)]),passwordConfirm:new _forms.FormControl("",_forms.Validators.required)},{validators:this.passwordMatchValidator,updateOn:"blur"}),(0,_common.isPlatformBrowser)(this.platFormId)&&(this.resizeSubscription=this.resizeObserverService.resize$.subscribe((r=>{this.windowWidth=r,this.cd.detectChanges()})))}passwordMatchValidator(r){const e=r.get("password")?.value,o=r.get("passwordConfirm")?.value;return e===o?null:{passwordsMismatch:!0}}onSubmit(){if(this.registerForm.valid){const{vorname:r,nachname:e,username:o,email:s,password:t}=this.registerForm.value;console.log(r,e,o,s,t,"after test"),console.log(this.registerForm.valid),this.registerService.registerUser(r,e,o,s,t).subscribe({next:r=>{this.router.navigate(["/login"])},error:r=>{this.toastr.error(r.message)}})}}ngOnDestroy(){this.resizeSubscription&&this.resizeSubscription.unsubscribe()}})||_class;