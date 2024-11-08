import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable, tap } from 'rxjs';
import { Blog } from '../../../store/reducers/blog.reducer';
import { selectAllBlogData, selectBlogError, selectBlogLoading, selectBlogMessage } from '../../../store/selectors/blog.selectors';
import { createBlog, getAllBlog } from '../../../store/actions/blog.actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-blog-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './blog-dashboard.component.html',
  styleUrl: './blog-dashboard.component.scss'
})
export class BlogDashboardComponent {
  constructor(private store: Store, private toastr: ToastrService){}
  allBlogEntries$: Observable<Blog[]> = this.store.select(selectAllBlogData);
  isLoading$: Observable<boolean> = this.store.select(selectBlogLoading);
  isError$: Observable<boolean> = this.store.select(selectBlogError);
  message$: Observable<string> = this.store.select(selectBlogMessage);

  ngOnInit(): void {
    this.isError$.pipe(
      tap(isError => {
        if (isError) {
          this.message$.subscribe(errorMessage => {
            this.toastr.error(errorMessage);
          });
        }
      })
    ).subscribe();
    this.store.dispatch(getAllBlog())
  }
  blogForm = new FormGroup({
    blog_title: new FormControl('', Validators.required),
    blog_content: new FormControl('', Validators.required),
    blog_theme: new FormControl('', Validators.required),
    blog_author: new FormControl('', Validators.required),
    images: new FormControl<(string | File)[]>([])
  }) 
  onSubmit = ()=>{
    const blogFormData = this.blogForm.value
  //   Object.entries(blogFormData).forEach(([key, value])=>{
  //     const formdata = new FormData()
  //     if(blogFormData.images && blogFormData.images.length){
  //       if(key === 'images' && value && value.length && value instanceof File){
  //         formdata.append( key, value)
  //       } 
  //       else{
  //         formdata.append(key, value as string)
  //       }
  //       this.store.dispatch(createBlog({blogData: formdata}))
  //     }
  //     else{
  //       const blogData = {
  //         blog_title: blogFormData.blog_title!,
  //         blog_theme: blogFormData.blog_theme!,
  //         blog_content: blogFormData.blog_content!,
  //         blog_author: blogFormData.blog_author!,
  //       }
  //       this.store.dispatch({blogData: blogData})
  //     }
  //   })
  }
}

