import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogComponent } from './blog.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MemoizedSelector } from '@ngrx/store';
import { Blog, BlogState } from '../../store/reducers/blog.reducer';
import { provideToastr, ToastrService } from 'ngx-toastr';
import { NgIconsModule, provideIcons } from '@ng-icons/core';
import { selectAllBlogData } from '../../store/selectors/blog.selectors';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { routes } from '../../app.routes';

describe('BlogComponent', () => {
  let component: BlogComponent;
  let fixture: ComponentFixture<BlogComponent>;
  let mockStore: MockStore;
  let memoizedSelector: MemoizedSelector<BlogState, Blog[]>
  let toastr: ToastrService;
  let activatedRoute: ActivatedRoute;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BlogComponent,
        NgIconsModule,
      ],
        providers:[
        provideIcons({}),
        provideMockStore(),
        provideToastr(),
        provideRouter(routes)
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    memoizedSelector = mockStore.overrideSelector(selectAllBlogData, []);
    toastr = TestBed.inject(ToastrService);
    activatedRoute = TestBed.inject(ActivatedRoute)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have elements and values', ()=>{
    memoizedSelector.setResult([
      {
        id:1,
        blog_title:"Ein Blog Titel",
        blog_theme:"Ein Thema",
        blog_content:"Lorem Ipsum",
        blog_author:"Roman"
      }
    ])
    mockStore.refreshState();
    fixture.detectChanges();
    const blogTitle = fixture.debugElement.nativeElement.querySelector('.blogTitle');
    const blogAuthor = fixture.debugElement.nativeElement.querySelector('.blogAuthor');

    expect(blogTitle.textContent.trim()).toEqual("Ein Blog Titel")
    expect(blogAuthor.textContent.trim()).toEqual("Roman")
  })
});
