import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliothekComponent } from './bibliothek.component';
import { NgIconsModule, provideIcons } from '@ng-icons/core';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideToastr, ToastrService } from 'ngx-toastr';
import { MemoizedSelector } from '@ngrx/store';
import { Bibliothek, BibliothekState } from '../../store/reducers/bibliothek.reducer';
import { selectAllBibliothekData } from '../../store/selectors/bibliothek.selector';

describe('BibliothekComponent', () => {
  let component: BibliothekComponent;
  let fixture: ComponentFixture<BibliothekComponent>;
  let mockStore: MockStore;
  let memoizedSelector: MemoizedSelector<BibliothekState, Bibliothek[]>
  let toastr: ToastrService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BibliothekComponent,
        NgIconsModule,
      ],
      providers:[
        provideIcons({}),
        provideMockStore(),
        provideToastr(),
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BibliothekComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    memoizedSelector = mockStore.overrideSelector(selectAllBibliothekData, []);
    toastr = TestBed.inject(ToastrService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it("should have all the elements and values", ()=>{
    memoizedSelector.setResult([
      {
        bibliothek_ressort:"HTML",
        bibliothek_title:"Ein HTML Titel",
        bibliothek_url: "https://www.youtube.com/watch?v=NpEaa2P7qZI"
      },
      {
        bibliothek_ressort:"CSS",
        bibliothek_title:"Ein CSS Titel",
        bibliothek_url: "https://www.youtube.com/watch?v=NpEaa2P7qZI"
      },
      {
        bibliothek_ressort:"JavaScript",
        bibliothek_title:"Ein JS Titel",
        bibliothek_url: "https://www.youtube.com/watch?v=NpEaa2P7qZI"
      },
    ])
    mockStore.refreshState();
    fixture.detectChanges();

    const titles = fixture.debugElement.nativeElement.querySelectorAll('.title');
    const ressort = fixture.debugElement.nativeElement.querySelectorAll('.ressort');
    const bibliothek_title = fixture.debugElement.nativeElement.querySelectorAll('#bibliothek_title');

     // Verify HTML slider
     expect(titles[0].textContent.trim()).toEqual('HTML');
     expect(ressort[0].textContent.trim()).toEqual('HTML');
     expect(bibliothek_title[0].textContent.trim()).toEqual('Ein HTML Titel');
 
     // Verify CSS slider
     expect(titles[1].textContent.trim()).toEqual('CSS');
     expect(ressort[1].textContent.trim()).toEqual('CSS');
     expect(bibliothek_title[1].textContent.trim()).toEqual('Ein CSS Titel');
 
     // Verify JavaScript slider
     expect(titles[2].textContent.trim()).toEqual('JavaScript');
     expect(ressort[2].textContent.trim()).toEqual('JavaScript');
     expect(bibliothek_title[2].textContent.trim()).toEqual('Ein JS Titel');
  })
});
