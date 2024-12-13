"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.QuestionModuleComponent=void 0;var _dec,_dec2,_dec3,_class,_class2,_descriptor,_descriptor2,_core=require("@angular/core"),_forms=require("@angular/forms"),_common=require("@angular/common"),_ngxQuill=require("ngx-quill"),_forum=require("../../store/actions/forum.actions");function _initializerDefineProperty(e,r,i,t){i&&Object.defineProperty(e,r,{enumerable:i.enumerable,configurable:i.configurable,writable:i.writable,value:i.initializer?i.initializer.call(t):void 0})}function _applyDecoratedDescriptor(e,r,i,t,o){var s={};return Object.keys(t).forEach((function(e){s[e]=t[e]})),s.enumerable=!!s.enumerable,s.configurable=!!s.configurable,("value"in s||s.initializer)&&(s.writable=!0),s=i.slice().reverse().reduce((function(i,t){return t(e,r,i)||i}),s),o&&void 0!==s.initializer&&(s.value=s.initializer?s.initializer.call(o):void 0,s.initializer=void 0),void 0===s.initializer?(Object.defineProperty(e,r,s),null):s}function _initializerWarningHelper(e,r){throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform.")}let QuestionModuleComponent=exports.QuestionModuleComponent=(_dec=(0,_core.Component)({selector:"app-question-module",standalone:!0,imports:[_common.CommonModule,_forms.ReactiveFormsModule,_ngxQuill.QuillModule],templateUrl: '../../html/app/pages/question-module.component.html',styleUrl: '../../css/app/pages/question-module.component.css'}),_dec2=(0,_core.Input)(),_dec3=(0,_core.Output)(),_dec((_descriptor=_applyDecoratedDescriptor((_class2=class{constructor(e,r){this.authService=e,this.store=r,this.user=this.authService.getUser(),_initializerDefineProperty(this,"questionRessort",_descriptor,this),_initializerDefineProperty(this,"closeQuestion",_descriptor2,this),this.handleClose=()=>{this.closeQuestion.emit()},this.questionForm=new _forms.FormGroup({question_theme:new _forms.FormControl("",_forms.Validators.required),question_ressort:new _forms.FormControl("",_forms.Validators.required),question:new _forms.FormControl("",_forms.Validators.required)}),this.onSubmit=()=>{if(this.questionForm.valid){const e=this.questionForm.value,{question_theme:r,question_ressort:i,question:t}=e,o={username:this.user.username,user_id:this.user.id,is_admin:this.user.is_admin,question_ressort:i,question_theme:r,question:t};this.store.dispatch((0,_forum.createForum)({forumData:o})),this.closeQuestion.emit()}}}ngOnChanges(e){e.questionRessort&&e.questionRessort.currentValue!==e.questionRessort.previousValue&&this.questionForm.get("question_ressort")?.setValue(this.questionRessort)}}).prototype,"questionRessort",[_dec2],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),_descriptor2=_applyDecoratedDescriptor(_class2.prototype,"closeQuestion",[_dec3],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return new _core.EventEmitter}}),_class=_class2))||_class);