"use strict";var _testing=require("@angular/core/testing"),_bibliothek=require("./bibliothek.component"),_core=require("@ng-icons/core"),_testing2=require("@ngrx/store/testing"),_ngxToastr=require("ngx-toastr"),_bibliothek2=require("../../store/selectors/bibliothek.selector");describe("BibliothekComponent",(()=>{let t,e,i,o,r;beforeEach((async()=>{await _testing.TestBed.configureTestingModule({imports:[_bibliothek.BibliothekComponent,_core.NgIconsModule],providers:[(0,_core.provideIcons)({}),(0,_testing2.provideMockStore)(),(0,_ngxToastr.provideToastr)()]}).compileComponents(),e=_testing.TestBed.createComponent(_bibliothek.BibliothekComponent),t=e.componentInstance,i=_testing.TestBed.inject(_testing2.MockStore),o=i.overrideSelector(_bibliothek2.selectAllBibliothekData,[]),r=_testing.TestBed.inject(_ngxToastr.ToastrService),e.detectChanges()})),it("should create",(()=>{expect(t).toBeTruthy()})),it("should have all the elements and values",(()=>{o.setResult([{bibliothek_ressort:"HTML",bibliothek_title:"Ein HTML Titel",bibliothek_url:"https://www.youtube.com/watch?v=NpEaa2P7qZI"},{bibliothek_ressort:"CSS",bibliothek_title:"Ein CSS Titel",bibliothek_url:"https://www.youtube.com/watch?v=NpEaa2P7qZI"},{bibliothek_ressort:"JavaScript",bibliothek_title:"Ein JS Titel",bibliothek_url:"https://www.youtube.com/watch?v=NpEaa2P7qZI"}]),i.refreshState(),e.detectChanges();const t=e.debugElement.nativeElement.querySelectorAll(".title"),r=e.debugElement.nativeElement.querySelectorAll(".ressort"),n=e.debugElement.nativeElement.querySelectorAll("#bibliothek_title");expect(t[0].textContent.trim()).toEqual("HTML"),expect(r[0].textContent.trim()).toEqual("HTML"),expect(n[0].textContent.trim()).toEqual("Ein HTML Titel"),expect(t[1].textContent.trim()).toEqual("CSS"),expect(r[1].textContent.trim()).toEqual("CSS"),expect(n[1].textContent.trim()).toEqual("Ein CSS Titel"),expect(t[2].textContent.trim()).toEqual("JavaScript"),expect(r[2].textContent.trim()).toEqual("JavaScript"),expect(n[2].textContent.trim()).toEqual("Ein JS Titel")}))}));