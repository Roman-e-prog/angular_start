"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.ForumThemesEditComponent=void 0;var _dec,_dec2,_dec3,_class,_class2,_descriptor,_descriptor2,_common=require("@angular/common"),_core=require("@angular/core"),_forms=require("@angular/forms"),_forumtheme=require("../../../../store/actions/forumtheme.actions");function _initializerDefineProperty(e,t,r,i){r&&Object.defineProperty(e,t,{enumerable:r.enumerable,configurable:r.configurable,writable:r.writable,value:r.initializer?r.initializer.call(i):void 0})}function _applyDecoratedDescriptor(e,t,r,i,o){var s={};return Object.keys(i).forEach((function(e){s[e]=i[e]})),s.enumerable=!!s.enumerable,s.configurable=!!s.configurable,("value"in s||s.initializer)&&(s.writable=!0),s=r.slice().reverse().reduce((function(r,i){return i(e,t,r)||r}),s),o&&void 0!==s.initializer&&(s.value=s.initializer?s.initializer.call(o):void 0,s.initializer=void 0),void 0===s.initializer?(Object.defineProperty(e,t,s),null):s}function _initializerWarningHelper(e,t){throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform.")}let ForumThemesEditComponent=exports.ForumThemesEditComponent=(_dec=(0,_core.Component)({selector:"app-forum-themes-edit",standalone:!0,imports:[_common.CommonModule,_forms.ReactiveFormsModule],templateUrl: '../../html/app/pages/forum-themes-edit.component.html',styleUrl: '../../css/app/pages/forum-themes-edit.component.css'}),_dec2=(0,_core.Input)(),_dec3=(0,_core.Output)(),_dec((_descriptor=_applyDecoratedDescriptor((_class2=class{constructor(e){this.store=e,_initializerDefineProperty(this,"editData",_descriptor,this),_initializerDefineProperty(this,"closeEdit",_descriptor2,this),this.handleClose=()=>{this.closeEdit.emit()},this.editForumThemeForm=new _forms.FormGroup({title:new _forms.FormControl("",_forms.Validators.required),ressort:new _forms.FormControl("",_forms.Validators.required),content:new _forms.FormControl("",_forms.Validators.required)}),this.onSubmit=()=>{if(this.editForumThemeForm.valid){const{title:e,ressort:t,content:r}=this.editForumThemeForm.value,i={title:e,ressort:t,content:r};this.store.dispatch((0,_forumtheme.updateForumTheme)({id:this.editData?.id,forumThemeData:i})),this.closeEdit.emit()}}}ngOnInit(){this.editForumThemeForm.get("title")?.setValue(this.editData.title),this.editForumThemeForm.get("ressort")?.setValue(this.editData.ressort),this.editForumThemeForm.get("content")?.setValue(this.editData.content)}}).prototype,"editData",[_dec2],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),_descriptor2=_applyDecoratedDescriptor(_class2.prototype,"closeEdit",[_dec3],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return new _core.EventEmitter}}),_class=_class2))||_class);