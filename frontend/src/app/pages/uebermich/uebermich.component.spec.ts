import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UebermichComponent } from './uebermich.component';

describe('UebermichComponent', () => {
  let component: UebermichComponent;
  let fixture: ComponentFixture<UebermichComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UebermichComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UebermichComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
