import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UebermichEditComponent } from './uebermich-edit.component';

describe('UebermichEditComponent', () => {
  let component: UebermichEditComponent;
  let fixture: ComponentFixture<UebermichEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UebermichEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UebermichEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
