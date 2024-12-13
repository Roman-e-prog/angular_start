import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogDashboardComponent } from './blog-dashboard.component';
import { NgIconsModule, provideIcons } from '@ng-icons/core';
import { matDeleteOutline, matEditOutline } from '@ng-icons/material-icons/outline';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideToastr, ToastrService } from 'ngx-toastr';
import { MemoizedSelector } from '@ngrx/store';
import { Blog, BlogState } from '../../../store/reducers/blog.reducer';
import { selectAllBlogData, selectBlogError, selectBlogLoading, selectBlogMessage } from '../../../store/selectors/blog.selectors';
import { createBlog, deleteBlog, updateBlog } from '../../../store/actions/blog.actions';

describe('BlogDashboardComponent', () => {
  let component: BlogDashboardComponent;
  let fixture: ComponentFixture<BlogDashboardComponent>;
  let mockStore: MockStore;
  let memoizedSelector: MemoizedSelector<BlogState, Blog[]>;
  let memoizedLoadingSelector: MemoizedSelector<BlogState, boolean>;
  let memoizedErrorSelector: MemoizedSelector<BlogState, boolean>;
  let memoizedMessageSelector: MemoizedSelector<BlogState, string>;
  let toastr: ToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BlogDashboardComponent,
        NgIconsModule,
      ],
      providers:[
        provideIcons({
          matEditOutline,
          matDeleteOutline
        }),
        provideMockStore(),
        provideToastr(),
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogDashboardComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    memoizedSelector = mockStore.overrideSelector(selectAllBlogData,[]);
    memoizedLoadingSelector = mockStore.overrideSelector(selectBlogLoading, false);
    memoizedErrorSelector = mockStore.overrideSelector(selectBlogError, false);
    memoizedMessageSelector = mockStore.overrideSelector(selectBlogMessage, '');
    toastr = TestBed.inject(ToastrService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have all its elements', async ()=>{
    memoizedSelector.setResult([
      {
        id: 1,
        blog_title :"Ein Titel",
        blog_theme:"Ein Thema",
        blog_content:"Lorem Ipsum Ad Dolores",
        blog_author:"Roman"
      }
    ]);
      mockStore.refreshState();
      fixture.detectChanges();
      await fixture.whenStable();
      const blogTitle = fixture.debugElement.nativeElement.querySelector('.blogTitle');
      const blogTheme = fixture.debugElement.nativeElement.querySelector('.blogTheme');
      const blogContent = fixture.debugElement.nativeElement.querySelector('.blogContent');
      const author = fixture.debugElement.nativeElement.querySelector('.author');
      const title = fixture.debugElement.nativeElement.querySelector('.title');
      const blogForm = fixture.debugElement.nativeElement.querySelector('.blogForm');
      const blog_title = fixture.debugElement.nativeElement.querySelector('#blog_title');
      const blog_theme = fixture.debugElement.nativeElement.querySelector('#blog_theme');
      const blog_content = fixture.debugElement.nativeElement.querySelector('#blog_content');
      const blog_author = fixture.debugElement.nativeElement.querySelector('#blog_author');
      const mainButton = fixture.debugElement.nativeElement.querySelector('.mainButton');
  
      expect(blogTitle).toBeTruthy();
      expect(blogTheme).toBeTruthy();
      expect(blogContent).toBeTruthy();
      expect(author).toBeTruthy()
      expect(title).toBeTruthy()
      expect(blogForm).toBeTruthy()
      expect(blog_title).toBeTruthy()
      expect(blog_theme).toBeTruthy()
      expect(blog_content).toBeTruthy()
      expect(blog_author).toBeTruthy()
      expect(mainButton).toBeTruthy()
      expect(blogTitle.textContent.trim()).toEqual('Ein Titel');
      expect(blogTheme.textContent.trim()).toEqual('Ein Thema');
      expect(blogContent.textContent.trim()).toEqual('Lorem Ipsum Ad Dolores');
      expect(author.textContent.trim()).toEqual('Roman');
      expect(title.textContent.trim()).toEqual('Blogpost einpflegen')
  }),
  it('form should get values and send them', ()=>{
    const spyDispatch = spyOn(mockStore, 'dispatch')
    const forumThemeForm = fixture.debugElement.nativeElement.querySelector('.blogForm');
    const titleInput = fixture.debugElement.nativeElement.querySelector('#blog_title');
    const blog_theme = fixture.debugElement.nativeElement.querySelector('#blog_theme');
    const blog_content = fixture.debugElement.nativeElement.querySelector('#blog_content');
    const blog_author = fixture.debugElement.nativeElement.querySelector('#blog_author');
    const mainButton = fixture.debugElement.nativeElement.querySelector('.mainButton');
    component.blogForm.controls['blog_title'].setValue('Ein Blog Titel');
    component.blogForm.controls['blog_theme'].setValue('Ein Blog Thema');
    component.blogForm.controls['blog_content'].setValue('Testinhalt');
    component.blogForm.controls['blog_author'].setValue('Roman Armin');
    expect(titleInput.value).toEqual('Ein Blog Titel');
    expect(blog_theme.value).toEqual('Ein Blog Thema');
    expect(blog_content.value).toEqual('Testinhalt');
    expect(blog_author.value).toEqual('Roman Armin');
    fixture.detectChanges();
    mainButton.click();
    
    expect(spyDispatch).toHaveBeenCalledWith(createBlog(
      {
        blogData:{
                        blog_title:"Ein Blog Titel", 
                        blog_theme:"Ein Blog Thema", 
                        blog_content:"Testinhalt",
                        blog_author:"Roman Armin",
                      }
    }))
  })
  it('should open edit Form on click', async ()=>{
    const spyDispatch = spyOn(mockStore, 'dispatch');
    memoizedSelector.setResult([
      {
        id: 1,
        blog_title :"Ein Titel",
        blog_theme:"Ein Thema",
        blog_content:"Lorem Ipsum Ad Dolores",
        blog_author:"Roman"
      }
    ]);
    mockStore.refreshState();
      fixture.detectChanges();
      await fixture.whenStable();
    const editButton = fixture.debugElement.nativeElement.querySelector('#edit');
    expect(editButton).toBeTruthy();
    editButton.click();
    fixture.detectChanges();
    await fixture.whenStable().then(()=>{
      const title = fixture.debugElement.nativeElement.querySelector('.title');
      expect(title.textContent.trim()).toEqual('Blogpost updaten');
      const editBlogForm = fixture.debugElement.nativeElement.querySelector('.blogEditForm');
      expect(editBlogForm).toBeTruthy();
      const blog_title = fixture.debugElement.nativeElement.querySelector('#blog_title');
      const blog_theme = fixture.debugElement.nativeElement.querySelector('#blog_theme');
      const blog_content = fixture.debugElement.nativeElement.querySelector('#blog_content');
      const blog_author = fixture.debugElement.nativeElement.querySelector('#blog_author');
      expect(blog_title).toBeTruthy();
      expect(blog_theme).toBeTruthy();
      expect(blog_content).toBeTruthy();
      expect(blog_author).toBeTruthy();
      expect(blog_title.value).toEqual('Ein Titel');
      expect(blog_theme.value).toEqual('Ein Thema');
      expect(blog_content.value).toEqual('Lorem Ipsum Ad Dolores');
      expect(blog_author.value).toEqual('Roman');
      const submitButton = fixture.debugElement.nativeElement.querySelector('.mainButton');
      submitButton.click();
      fixture.detectChanges();
      expect(spyDispatch).toHaveBeenCalledWith(updateBlog({id: 1, blogData:{
        blog_title :"Ein Titel",
        blog_theme:"Ein Thema",
        blog_content:"Lorem Ipsum Ad Dolores",
        blog_author:"Roman"
      
      }}))
    })
  });
  it('should delete on click', async ()=>{
    memoizedSelector.setResult([
      {
        id: 1,
        blog_title :"Ein Titel",
        blog_theme:"Ein Thema",
        blog_content:"Lorem Ipsum Ad Dolores",
        blog_author:"Roman"
      }
    ]);
    mockStore.refreshState();
    fixture.detectChanges();
    await fixture.whenStable();
    const dispatchSpy = spyOn(mockStore, 'dispatch');
    const deleteButton = fixture.debugElement.nativeElement.querySelector('#delete');
    expect(deleteButton).toBeTruthy();
    deleteButton.click();
    expect(dispatchSpy).toHaveBeenCalledWith(deleteBlog({id: 1}))
  })
});
