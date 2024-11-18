import { Component, EventEmitter, Input, OnChanges, OnInit, Output, output, SimpleChanges } from '@angular/core';
import { AuthService } from '../../services_interceptors/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';
import { Store } from '@ngrx/store';
import { createForum } from '../../store/actions/forum.actions';

@Component({
  selector: 'app-question-module',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, QuillModule],
  templateUrl: './question-module.component.html',
  styleUrl: './question-module.component.scss'
})
export class QuestionModuleComponent implements OnChanges{
  constructor(private authService: AuthService, private store: Store){}
  user = this.authService.getUser();
  @Input() questionRessort: string | null = null;
  @Output() closeQuestion = new EventEmitter();
 
  handleClose = ()=>{
    this.closeQuestion.emit()
  }

  questionForm = new FormGroup({
    question_theme: new FormControl('', Validators.required),
    question_ressort: new FormControl('', Validators.required),
    question: new FormControl('', Validators.required),
  })
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['questionRessort'] && changes['questionRessort'].currentValue !== changes['questionRessort'].previousValue) {
      this.questionForm.get('question_ressort')?.setValue(this.questionRessort);
    }
  }

  onSubmit = ()=>{
    if(this.questionForm.valid){
      const newQuestion = this.questionForm.value
      const {question_theme, question_ressort, question} = newQuestion;
      const forumData = {
        username: this.user.username,
        user_id: this.user.id,
        is_admin: this.user.is_admin,
        question_ressort: question_ressort!,
        question_theme: question_theme!,
        question: question!,
      }
      this.store.dispatch(createForum({forumData: forumData}))
      this.closeQuestion.emit()
    }
  }
}
