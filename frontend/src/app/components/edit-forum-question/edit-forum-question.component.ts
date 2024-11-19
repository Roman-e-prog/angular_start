import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Forum } from '../../store/reducers/forum.reducer';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { updateForum } from '../../store/actions/forum.actions';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';
export interface ForumUpdateData{
  question_theme: string,
  question: string,
}
@Component({
  selector: 'app-edit-forum-question',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, QuillModule],
  templateUrl: './edit-forum-question.component.html',
  styleUrl: './edit-forum-question.component.scss'
})
export class EditForumQuestionComponent implements OnInit{
  constructor(private store: Store){}
  @Input() editQuestionData: Forum | null = null;
  @Output() closeEdit = new EventEmitter();
 
  handleClose = ()=>{
    this.closeEdit.emit()
  }
ngOnInit(): void {
  console.log(this.editQuestionData, 'here edit')
  this.questionEditForm.get('question_theme')?.setValue(this.editQuestionData?.question_theme!)
  this.questionEditForm.get('question')?.setValue(this.editQuestionData?.question!)
  
}
  questionEditForm = new FormGroup({
    question_theme: new FormControl('', Validators.required),
    question: new FormControl('', Validators.required),
  })

  onSubmit = ()=>{
    if(this.questionEditForm.valid){
      const {question_theme, question} = this.questionEditForm.value;
      const forumUpdateData:ForumUpdateData = {
        question_theme: question_theme!,
        question: question!,
      }
      this.store.dispatch(updateForum({forumData: forumUpdateData, id: this.editQuestionData!.id!}))
      this.closeEdit.emit()
    }
  }
}
