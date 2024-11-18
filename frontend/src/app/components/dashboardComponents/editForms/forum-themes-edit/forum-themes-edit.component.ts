import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ForumTheme } from '../../../../store/reducers/forumTheme.reducer';
import { updateForumTheme } from '../../../../store/actions/forumtheme.actions';
@Component({
  selector: 'app-forum-themes-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forum-themes-edit.component.html',
  styleUrl: './forum-themes-edit.component.scss'
})
export class ForumThemesEditComponent {
  constructor(private store: Store){}
  @Input() editData: ForumTheme | null = null;
  @Output() closeEdit = new EventEmitter();

  handleClose = ()=>{
    this.closeEdit.emit();
  }
  ngOnInit(): void {
    this.editForumThemeForm.get('title')?.setValue(this.editData!.title!)
    this.editForumThemeForm.get('ressort')?.setValue(this.editData!.ressort!)
    this.editForumThemeForm.get('content')?.setValue(this.editData!.content!)
  }
  editForumThemeForm = new FormGroup({
    title: new FormControl('', Validators.required),
    ressort: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
  })
  
  onSubmit = ()=>{
    if(this.editForumThemeForm.valid){
        const {title, ressort, content} = this.editForumThemeForm!.value
      const editForumThemeData = {
        title: title!,
        ressort:ressort!,
        content:content!
      }
        this.store.dispatch(updateForumTheme({id: this.editData?.id!, forumThemeData: editForumThemeData}))
        this.closeEdit.emit();
    }
  }
}
