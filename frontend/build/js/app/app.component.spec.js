"use strict";var _testing=require("@angular/core/testing"),_app=require("./app.component");describe("AppComponent",(()=>{beforeEach((async()=>{await _testing.TestBed.configureTestingModule({imports:[_app.AppComponent]}).compileComponents()})),xit("should create the app",(()=>{const e=_testing.TestBed.createComponent(_app.AppComponent).componentInstance;expect(e).toBeTruthy()})),xit("should have the 'frontend' title",(()=>{const e=_testing.TestBed.createComponent(_app.AppComponent).componentInstance;expect(e.title).toEqual("frontend")})),xit("should render title",(()=>{const e=_testing.TestBed.createComponent(_app.AppComponent);e.detectChanges();const t=e.nativeElement;expect(t.querySelector("h1")?.textContent).toContain("Hello, frontend")}))}));