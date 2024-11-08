import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumRessortComponent } from './forum-ressort.component';

describe('ForumRessortComponent', () => {
  let component: ForumRessortComponent;
  let fixture: ComponentFixture<ForumRessortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForumRessortComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForumRessortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
