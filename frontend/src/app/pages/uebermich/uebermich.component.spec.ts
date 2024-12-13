import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UebermichComponent } from './uebermich.component';
import { NgIconsModule, provideIcons } from '@ng-icons/core';
import {MockStore, provideMockStore} from '@ngrx/store/testing'
import { provideToastr, ToastrService } from 'ngx-toastr';
import { MemoizedSelector } from '@ngrx/store';
import { Uebermich, UebermichState } from '../../store/reducers/uebermich.reducer';
import { selectAllUebermichData } from '../../store/selectors/uebermich.selectors';
import { HttpClient, provideHttpClient } from '@angular/common/http';

describe('UebermichComponent', () => {
  let component: UebermichComponent;
  let fixture: ComponentFixture<UebermichComponent>;
  let mockStore: MockStore;
  let mockUebermichSelector: MemoizedSelector<UebermichState, Uebermich[]>;
  let toastr:ToastrService;
  let httpClient: HttpClient;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UebermichComponent,
        NgIconsModule
      ],
      providers:[
        provideIcons({}),
        provideMockStore(),
        provideToastr(),
        provideHttpClient()
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UebermichComponent);
    mockStore = TestBed.inject(MockStore);
    mockUebermichSelector = mockStore.overrideSelector(selectAllUebermichData,[])
    toastr = TestBed.inject(ToastrService);
    httpClient = TestBed.inject(HttpClient);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have all the components', ()=>{
    mockUebermichSelector.setResult([
      {
        id:1,
        created_at: new Date('2024-10-28T10:00:00Z'),
        my_person:"Lorem Ipsum"
      }
    ])
    mockStore.refreshState();
    fixture.detectChanges();
    fixture.whenStable().then(()=>{
      const photoAndAdress = fixture.debugElement.nativeElement.querySelector('.photoAndAdress')
    const street = fixture.debugElement.nativeElement.querySelector('.street')
    const town = fixture.debugElement.nativeElement.querySelector('.town')
    const tel = fixture.debugElement.nativeElement.querySelector('.tel')
    const img = fixture.debugElement.nativeElement.querySelector('img')
    const content = fixture.debugElement.nativeElement.querySelector('.content')

    expect(photoAndAdress).toBeTruthy();
    expect(street).toBeTruthy();
    expect(town).toBeTruthy();
    expect(tel).toBeTruthy();
    expect(img).toBeTruthy();
    expect(content).toBeTruthy();
    expect(street.textContent.trim()).toEqual('Ludwigstr. 47');
    expect(town.textContent.trim()).toEqual('59846 Sundern');
    expect(tel.textContent.trim()).toEqual('0170/3285419');
    expect(img.src).toContain('/assets/img/roman.jpg');
    expect(content.textContent.trim()).toEqual('Lorem Ipsum');
    })
  })
});
