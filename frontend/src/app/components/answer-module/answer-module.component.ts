import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { QuillModule } from 'ngx-quill';
import { AnswerData } from '../../pages/single-question/single-question.component';
import { createForumAnswer } from '../../store/actions/forumAnswers.actions';


@Component({
  selector: 'app-answer-module',
  standalone: true,
  imports: [QuillModule, CommonModule, ReactiveFormsModule],
  templateUrl: './answer-module.component.html',
  styleUrl: './answer-module.component.scss',
})
export class AnswerModuleComponent {
  constructor(private store: Store){}
  @Input() answerData: AnswerData | null = null;
  @Output() closeAnswer = new EventEmitter();
 

  handleClose = ()=>{
    this.closeAnswer.emit()
  }

  forumAnswerForm = new FormGroup({
    answer: new FormControl('', Validators.required)
  })
  onSubmit = ()=>{
    if(this.forumAnswerForm.valid){
      const forumAnswerData = {
        username: this.answerData!.username,
        user_id: this.answerData?.user_id!,
        is_admin: this.answerData?.is_admin!,
        question_id: this.answerData!.question_id,
        answer: this.forumAnswerForm.value.answer!
        }
        this.store.dispatch(createForumAnswer({forumAnswerData: forumAnswerData}))
        this.closeAnswer.emit();
    }
  }
  onAnswerOnAnswerSubmit = ()=>{
    if(this.forumAnswerForm.valid){
      const forumAnswerData = {
        username: this.answerData!.username!,
        user_id: this.answerData?.user_id!,
        is_admin: this.answerData?.is_admin!,
        question_id: this.answerData!.question_id,
        answerername: this.answerData!.answerername,
        answerer_id: this.answerData?.answerer_id,
        answer: this.forumAnswerForm.value.answer!
      }
      this.store.dispatch(createForumAnswer({forumAnswerData: forumAnswerData}))
      this.closeAnswer.emit();
    }
  }
}
