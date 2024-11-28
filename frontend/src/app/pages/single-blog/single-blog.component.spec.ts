import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleBlogComponent } from './single-blog.component';
import { NgIconsModule, provideIcons } from '@ng-icons/core';
import { ActivatedRoute } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectBlogData, selectBlogError, selectBlogLoading, selectBlogMessage } from '../../store/selectors/blog.selectors';
import { Blog } from '../../store/reducers/blog.reducer';
import { provideToastr, ToastrService } from 'ngx-toastr';
import { getBlog } from '../../store/actions/blog.actions';
import { Location } from '@angular/common';
const mockBlogData: Blog = {
  id: 1,
  blog_title: "Ein TestBlog",
  blog_content:"Lorem Ipsum ad Dolores",
  blog_theme: "TestThema",
  blog_author: "Roman",
  images: ['test.jpg'],
}
describe('SingleBlogComponent', () => {
  let component: SingleBlogComponent;
  let fixture: ComponentFixture<SingleBlogComponent>;
  let mockStore: MockStore;
  let toastr: ToastrService;
  let location: Location;
  beforeEach(async () => {
    const activatedRoute = { snapshot: { paramMap: { get: jasmine.createSpy().and.returnValue('1') } } } as any;
    await TestBed.configureTestingModule({
      imports: [
        SingleBlogComponent,
        NgIconsModule,
      ],
      providers:[
        provideIcons({}),
        provideToastr(),
        provideMockStore({
          selectors:[
            {selector: selectBlogData, value: mockBlogData},
            {selector: selectBlogLoading, value: false},
            {selector: selectBlogError, value: false},
            {selector: selectBlogMessage, value: "Error Message"},
          ]
        }),
        {provide: ActivatedRoute, useValue:activatedRoute}
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleBlogComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    toastr = TestBed.inject(ToastrService);
    location = TestBed.inject(Location);
    spyOn(mockStore, 'dispatch');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should dispatch the actions and correct selectors', ()=>{
    const id = parseInt(component.id!);
    component.ngOnInit();
    expect(mockStore.dispatch).toHaveBeenCalledWith(getBlog({id}))
  });
  it('should have all components and values', async()=>{
    fixture.detectChanges();
    await fixture.whenStable();
    
    const title = fixture.debugElement.nativeElement.querySelector('.title');
    const author = fixture.debugElement.nativeElement.querySelector('.author');
    const theme = fixture.debugElement.nativeElement.querySelector('.desc');
    const content = fixture.debugElement.nativeElement.querySelector('.content');
    const image = fixture.debugElement.nativeElement.querySelector('.image');

    expect(title.textContent.trim()).toEqual("Ein TestBlog");
    expect(author.textContent.trim()).toEqual("Von Roman");
    expect(theme.textContent.trim()).toEqual("TestThema");
    expect(content.textContent.trim()).toEqual("Lorem Ipsum ad Dolores");
    expect(image.src).toContain("test.jpg");
  });
  it('should go back on button press', ()=>{
    const backButton = fixture.debugElement.nativeElement.querySelector('.mainButton');
    const spyLocation = spyOn(location, 'back');
    backButton.click();
    fixture.detectChanges();
    expect(spyLocation).toHaveBeenCalled();
  })
});
