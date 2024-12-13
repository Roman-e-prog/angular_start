"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.EditForumQuestionComponent=void 0;var _dec,_dec2,_dec3,_class,_class2,_descriptor,_descriptor2,_core=require("@angular/core"),_forms=require("@angular/forms"),_forum=require("../../store/actions/forum.actions"),_common=require("@angular/common"),_ngxQuill=require("ngx-quill");function _initializerDefineProperty(e,i,t,r){t&&Object.defineProperty(e,i,{enumerable:t.enumerable,configurable:t.configurable,writable:t.writable,value:t.initializer?t.initializer.call(r):void 0})}function _applyDecoratedDescriptor(e,i,t,r,o){var n={};return Object.keys(r).forEach((function(e){n[e]=r[e]})),n.enumerable=!!n.enumerable,n.configurable=!!n.configurable,("value"in n||n.initializer)&&(n.writable=!0),n=t.slice().reverse().reduce((function(t,r){return r(e,i,t)||t}),n),o&&void 0!==n.initializer&&(n.value=n.initializer?n.initializer.call(o):void 0,n.initializer=void 0),void 0===n.initializer?(Object.defineProperty(e,i,n),null):n}function _initializerWarningHelper(e,i){throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform.")}let EditForumQuestionComponent=exports.EditForumQuestionComponent=(_dec=(0,_core.Component)({selector:"app-edit-forum-question",standalone:!0,imports:[_common.CommonModule,_forms.ReactiveFormsModule,_ngxQuill.QuillModule],templateUrl: '../../html/app/pages/edit-forum-question.component.html',styleUrl: '../../css/app/pages/edit-forum-question.component.css'}),_dec2=(0,_core.Input)(),_dec3=(0,_core.Output)(),_dec((_descriptor=_applyDecoratedDescriptor((_class2=class{constructor(e){this.store=e,_initializerDefineProperty(this,"editQuestionData",_descriptor,this),_initializerDefineProperty(this,"closeEdit",_descriptor2,this),this.handleClose=()=>{this.closeEdit.emit()},this.questionEditForm=new _forms.FormGroup({question_theme:new _forms.FormControl("",_forms.Validators.required),question:new _forms.FormControl("",_forms.Validators.required)}),this.onSubmit=()=>{if(this.questionEditForm.valid){const{question_theme:e,question:i}=this.questionEditForm.value,t={question_theme:e,question:i};this.store.dispatch((0,_forum.updateForum)({forumData:t,id:this.editQuestionData.id})),this.closeEdit.emit()}}}ngOnInit(){console.log(this.editQuestionData,"here edit"),this.questionEditForm.get("question_theme")?.setValue(this.editQuestionData?.question_theme),this.questionEditForm.get("question")?.setValue(this.editQuestionData?.question)}}).prototype,"editQuestionData",[_dec2],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),_descriptor2=_applyDecoratedDescriptor(_class2.prototype,"closeEdit",[_dec3],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return new _core.EventEmitter}}),_class=_class2))||_class);