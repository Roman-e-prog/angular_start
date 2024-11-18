import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable, tap } from 'rxjs';
import { Blog } from '../../../store/reducers/blog.reducer';
import { selectAllBlogData, selectBlogError, selectBlogLoading, selectBlogMessage } from '../../../store/selectors/blog.selectors';
import { createBlog, deleteBlog, getAllBlog } from '../../../store/actions/blog.actions';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgIconsModule } from '@ng-icons/core';
import { matEditOutline, matDeleteOutline } from '@ng-icons/material-icons/outline';
import { BlogEditComponent } from '../editForms/blog-edit/blog-edit.component';

@Component({
  selector: 'app-blog-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIconsModule, BlogEditComponent],
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
  selectedFiles: File[] = []
  handleFileChange = (e:Event)=>{
    let files = (e.target as HTMLInputElement).files ? (e.target as HTMLInputElement).files! : null;
    if(!files){
      return
    }
    if (files) {
      for (let i = 0; i < files.length; i++) {
        this.selectedFiles.push(files[i]);
      }
  }
  this.blogForm.get('images')?.setValue(this.selectedFiles)
}
  blogForm = new FormGroup({
    blog_title: new FormControl('', Validators.required),
    blog_content: new FormControl('', Validators.required),
    blog_theme: new FormControl('', Validators.required),
    blog_author: new FormControl('', Validators.required),
    images: new FormControl<(File)[]>([])
  }) 
  onSubmit = ()=>{
    if(this.blogForm.valid){
      const blogFormData = this.blogForm!.value!
      if(!blogFormData.images || !blogFormData.images.length){
        const blogData = {
          blog_title: blogFormData.blog_title!,
          blog_theme: blogFormData.blog_theme!,
          blog_content: blogFormData.blog_content!,
          blog_author: blogFormData.blog_author!,
        }
        this.store.dispatch(createBlog({blogData: blogData}))
        this.blogForm.reset();
      }
      else{
        const formData = new FormData();
        Object.entries(blogFormData).forEach(([key, value])=>{
          if(key === 'images' && value && value.length){
            for(let i = 0; i < value.length; i++){
              formData.append(key, value[i])
            }
          }
          else{
            formData.append(key, value as string)
          }
        })
        this.store.dispatch(createBlog({blogData: formData}))
        this.blogForm.reset()
      }
    } 
  }
  //delete & edit
  editModule = false;
  editData: Blog | null = null;
  handleEdit = (editData: Blog)=>{
    this.editModule = true;
    this.editData = editData;
  }
  handleClose = ()=>{
    this.editModule = false;
  }
  handleDelete = (id:number)=>{
    this.store.dispatch(deleteBlog({id:id}))
  }
}

