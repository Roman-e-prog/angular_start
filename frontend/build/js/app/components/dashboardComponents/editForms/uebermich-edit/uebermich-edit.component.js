"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.UebermichEditComponent=void 0;var _dec,_dec2,_dec3,_class,_class2,_descriptor,_descriptor2,_common=require("@angular/common"),_core=require("@angular/core"),_forms=require("@angular/forms"),_uebermich=require("../../../../store/actions/uebermich.actions");function _initializerDefineProperty(e,i,r,t){r&&Object.defineProperty(e,i,{enumerable:r.enumerable,configurable:r.configurable,writable:r.writable,value:r.initializer?r.initializer.call(t):void 0})}function _applyDecoratedDescriptor(e,i,r,t,o){var n={};return Object.keys(t).forEach((function(e){n[e]=t[e]})),n.enumerable=!!n.enumerable,n.configurable=!!n.configurable,("value"in n||n.initializer)&&(n.writable=!0),n=r.slice().reverse().reduce((function(r,t){return t(e,i,r)||r}),n),o&&void 0!==n.initializer&&(n.value=n.initializer?n.initializer.call(o):void 0,n.initializer=void 0),void 0===n.initializer?(Object.defineProperty(e,i,n),null):n}function _initializerWarningHelper(e,i){throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform.")}let UebermichEditComponent=exports.UebermichEditComponent=(_dec=(0,_core.Component)({selector:"app-uebermich-edit",standalone:!0,imports:[_common.CommonModule,_forms.ReactiveFormsModule],templateUrl: '../../html/app/pages/uebermich-edit.component.html',styleUrl: '../../css/app/pages/uebermich-edit.component.css'}),_dec2=(0,_core.Input)(),_dec3=(0,_core.Output)(),_dec((_descriptor=_applyDecoratedDescriptor((_class2=class{constructor(e){this.store=e,_initializerDefineProperty(this,"editData",_descriptor,this),_initializerDefineProperty(this,"closeEdit",_descriptor2,this),this.handleClose=()=>{this.closeEdit.emit()},this.editUebermichForm=new _forms.FormGroup({my_person:new _forms.FormControl("",_forms.Validators.required)}),this.onSubmit=()=>{if(this.editUebermichForm.valid){const e=this.editUebermichForm.value.my_person,i={id:this.editData.id,my_person:e};this.store.dispatch((0,_uebermich.updateUebermich)({uebermichData:i})),this.closeEdit.emit()}}}ngOnInit(){this.editUebermichForm.get("my_person")?.setValue(this.editData.my_person)}}).prototype,"editData",[_dec2],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),_descriptor2=_applyDecoratedDescriptor(_class2.prototype,"closeEdit",[_dec3],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return new _core.EventEmitter}}),_class=_class2))||_class);