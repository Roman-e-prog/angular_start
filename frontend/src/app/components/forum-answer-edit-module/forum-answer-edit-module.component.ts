import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { QuillModule } from 'ngx-quill';
import { ForumAnswer } from '../../store/reducers/forumAnswer.reducer';
import { updateForumAnswer } from '../../store/actions/forumAnswers.actions';
export interface ForumAnswerUpdateData{
  answer:string,
  question_id:number,
}
@Component({
  selector: 'app-forum-answer-edit-module',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, QuillModule],
  templateUrl: './forum-answer-edit-module.component.html',
  styleUrl: './forum-answer-edit-module.component.scss'
})
export class ForumAnswerEditModuleComponent {
  constructor(private store: Store){}
  @Input() editAnswerData: ForumAnswer | null = null;
  @Output() closeAnswerEdit = new EventEmitter();
 
  handleClose = ()=>{
    this.closeAnswerEdit.emit()
  }
ngOnInit(): void {
  this.answerEditForm.get('answer')?.setValue(this.editAnswerData?.answer!)
  
}
  answerEditForm = new FormGroup({
    answer: new FormControl('', Validators.required),
  })

  onSubmit = ()=>{
    if(this.answerEditForm.valid){
      const {answer} = this.answerEditForm.value;
      const forumAnswerUpdateData:ForumAnswerUpdateData = {
        answer: answer!,
        question_id: this.editAnswerData?.question_id!
      }
      this.store.dispatch(updateForumAnswer({forumAnswerData: forumAnswerUpdateData, id: this.editAnswerData!.id!}))
      this.closeAnswerEdit.emit()
    }
  }

}
