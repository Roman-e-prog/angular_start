"use strict";var _testing=require("@angular/core/testing"),_blogEdit=require("./blog-edit.component"),_testing2=require("@ngrx/store/testing");describe("BlogEditComponent",(()=>{let e,t,o;beforeEach((async()=>{await _testing.TestBed.configureTestingModule({imports:[_blogEdit.BlogEditComponent],providers:[(0,_testing2.provideMockStore)()]}).compileComponents(),t=_testing.TestBed.createComponent(_blogEdit.BlogEditComponent),e=t.componentInstance,o=_testing.TestBed.inject(_testing2.MockStore),t.detectChanges()})),xit("should create",(()=>{expect(e).toBeTruthy()}))}));