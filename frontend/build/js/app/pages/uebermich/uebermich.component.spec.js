"use strict";var _testing=require("@angular/core/testing"),_uebermich=require("./uebermich.component"),_core=require("@ng-icons/core"),_testing2=require("@ngrx/store/testing"),_ngxToastr=require("ngx-toastr"),_uebermich2=require("../../store/selectors/uebermich.selectors"),_http=require("@angular/common/http");describe("UebermichComponent",(()=>{let e,t,r,n,o,c;beforeEach((async()=>{await _testing.TestBed.configureTestingModule({imports:[_uebermich.UebermichComponent,_core.NgIconsModule],providers:[(0,_core.provideIcons)({}),(0,_testing2.provideMockStore)(),(0,_ngxToastr.provideToastr)(),(0,_http.provideHttpClient)()]}).compileComponents(),t=_testing.TestBed.createComponent(_uebermich.UebermichComponent),r=_testing.TestBed.inject(_testing2.MockStore),n=r.overrideSelector(_uebermich2.selectAllUebermichData,[]),o=_testing.TestBed.inject(_ngxToastr.ToastrService),c=_testing.TestBed.inject(_http.HttpClient),e=t.componentInstance,t.detectChanges()})),it("should create",(()=>{expect(e).toBeTruthy()})),it("should have all the components",(()=>{n.setResult([{id:1,created_at:new Date("2024-10-28T10:00:00Z"),my_person:"Lorem Ipsum"}]),r.refreshState(),t.detectChanges(),t.whenStable().then((()=>{const e=t.debugElement.nativeElement.querySelector(".photoAndAdress"),r=t.debugElement.nativeElement.querySelector(".street"),n=t.debugElement.nativeElement.querySelector(".town"),o=t.debugElement.nativeElement.querySelector(".tel"),c=t.debugElement.nativeElement.querySelector("img"),i=t.debugElement.nativeElement.querySelector(".content");expect(e).toBeTruthy(),expect(r).toBeTruthy(),expect(n).toBeTruthy(),expect(o).toBeTruthy(),expect(c).toBeTruthy(),expect(i).toBeTruthy(),expect(r.textContent.trim()).toEqual("Ludwigstr. 47"),expect(n.textContent.trim()).toEqual("59846 Sundern"),expect(o.textContent.trim()).toEqual("0170/3285419"),expect(c.src).toContain("/assets/img/roman.jpg"),expect(i.textContent.trim()).toEqual("Lorem Ipsum")}))}))}));