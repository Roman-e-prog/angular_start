import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIconsModule } from '@ng-icons/core';
import { Store } from '@ngrx/store';
import { Blog } from '../../../../store/reducers/blog.reducer';
import { updateBlog } from '../../../../store/actions/blog.actions';

@Component({
  selector: 'app-blog-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIconsModule],
  templateUrl: './blog-edit.component.html',
  styleUrl: './blog-edit.component.scss'
})
export class BlogEditComponent implements OnInit{
  constructor(private store: Store){}
  @Input() editData: Blog | null = null 
  @Output() closeEdit = new EventEmitter();

  handleClose = ()=>{
    this.closeEdit.emit()
  }
  fileData:(string | File)[] = [];
  ngOnInit(): void {
    if(this.editData){
      this.blogEditForm.get('blog_title')?.setValue(this.editData?.blog_title)
      this.blogEditForm.get('blog_theme')?.setValue(this.editData?.blog_theme)
      this.blogEditForm.get('blog_content')?.setValue(this.editData?.blog_content)
      this.blogEditForm.get('blog_author')?.setValue(this.editData?.blog_author)
      this.fileData = this.editData.images ? [...this.editData.images] : [];
    }
  }
   
  handleImages = (index:number, event: Event)=>{
    let file = (event.target as HTMLInputElement).files ? (event.target as HTMLInputElement).files![0] : null;
    console.log(file, 'hier file')
    if(!file){
      return
    }
    const newImages = [...this.fileData]
    newImages[index] = file;
    this.fileData = [...newImages]
    console.log(this.fileData)
  }
  blogEditForm = new FormGroup({
    blog_title: new FormControl('', Validators.required),
    blog_content: new FormControl('', Validators.required),
    blog_theme: new FormControl('', Validators.required),
    blog_author: new FormControl('', Validators.required),

  })
onSubmit = ()=>{
  if(this.blogEditForm.valid){
    const {blog_title, blog_theme, blog_content, blog_author} = this.blogEditForm.value;
    if(!this.fileData || !this.fileData.length){
        const blogData = {
            blog_title: blog_title!,
            blog_theme: blog_theme!,
            blog_content: blog_content!,
            blog_author: blog_author!
          }
        
        this.store.dispatch(updateBlog({id: this.editData?.id!, blogData: blogData as unknown as  Blog}))
        this.closeEdit.emit();
      }
      else{
        const formdata = new FormData;
          this.fileData.forEach((image, index)=>{
            console.log(this.fileData, 'here files', index);
            if(image instanceof File){
              formdata.append('images', image);
              formdata.append('index', index.toString())
            }
          })
            formdata.append('blog_title', this.blogEditForm!.value.blog_title!)
            formdata.append('blog_theme', this.blogEditForm!.value.blog_theme!)
            formdata.append('blog_content', this.blogEditForm!.value.blog_content!)
            formdata.append('blog_author', this.blogEditForm!.value.blog_author!)
          this.store.dispatch(updateBlog({id:this.editData?.id!, blogData: formdata as unknown as Blog}))
          this.closeEdit.emit();
      }
    }
  }
}
