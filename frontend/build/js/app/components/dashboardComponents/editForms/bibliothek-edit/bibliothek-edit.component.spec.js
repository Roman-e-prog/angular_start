"use strict";var _testing=require("@angular/core/testing"),_bibliothekEdit=require("./bibliothek-edit.component"),_testing2=require("@ngrx/store/testing");describe("BibliothekEditComponent",(()=>{let e,t,i;beforeEach((async()=>{await _testing.TestBed.configureTestingModule({imports:[_bibliothekEdit.BibliothekEditComponent],providers:[(0,_testing2.provideMockStore)()]}).compileComponents(),t=_testing.TestBed.createComponent(_bibliothekEdit.BibliothekEditComponent),e=t.componentInstance,i=_testing.TestBed.inject(_testing2.MockStore),t.detectChanges()})),xit("should create",(()=>{expect(e).toBeTruthy()}))}));