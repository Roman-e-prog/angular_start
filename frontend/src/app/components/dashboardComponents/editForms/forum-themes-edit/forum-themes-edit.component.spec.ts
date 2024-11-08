import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumThemesEditComponent } from './forum-themes-edit.component';

describe('ForumThemesEditComponent', () => {
  let component: ForumThemesEditComponent;
  let fixture: ComponentFixture<ForumThemesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForumThemesEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForumThemesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
