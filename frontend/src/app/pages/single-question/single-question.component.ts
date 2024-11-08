import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectForumData, selectForumError, selectForumLoading, selectForumMessage } from '../../store/selectors/forum.selectors';
import { combineLatest, map, Observable, tap } from 'rxjs';
import { getForum } from '../../store/actions/forum.actions';
import { ToastrService } from 'ngx-toastr';
import { matCheckBoxOutline, matDeleteOutline, matEditOutline, matReplyOutline, matThumbDownOutline, matThumbUpOutline } from '@ng-icons/material-icons/outline';
import { CommonModule, Location } from '@angular/common';
import { AuthService } from '../../services&interceptors/auth.service';
import { selectAllAnswerToQuestion, selectForumAnswerError, selectForumAnswerLoading, selectForumAnswerMessage } from '../../store/selectors/forumAnswers.selector';
import { getAllAnswersToQuestion } from '../../store/actions/forumAnswers.actions';
import { ForumAnswer } from '../../store/reducers/forumAnswer.reducer';
import { Forum } from '../../store/reducers/forum.reducer';
import { HttpClient } from '@angular/common/http';
import { AnswerModuleComponent } from '../../components/answer-module/answer-module.component';
import { NgIconsModule } from '@ng-icons/core';
import { HtmlStripService } from '../../services&interceptors/htmlStrip.service';
export interface AnswerData{
  username:string,
  user_id: number,
  is_admin?: boolean,
  question_id: number,
  answerername: string,
  answerer_id: number,
}
@Component({
  selector: 'app-single-question',
  standalone: true,
  imports: [CommonModule, AnswerModuleComponent, NgIconsModule],
  templateUrl: './single-question.component.html',
  styleUrl: './single-question.component.scss'
})

export class SingleQuestionComponent implements OnInit {
  constructor(private store: Store, 
              private router: ActivatedRoute,
              private toastr: ToastrService, 
              private authService: AuthService,
              private httpClient: HttpClient,
              private location: Location,
              private htmlStripService: HtmlStripService,
            ){}
  user = this.authService.getUser();
  answerModule = false;

  singleForum$: Observable<Forum> = this.store.select(selectForumData);
  isLoading$: Observable<boolean> = this.store.select(selectForumLoading);
  isError$: Observable<boolean> = this.store.select(selectForumError);
  message$: Observable<string>  = this.store.select(selectForumMessage);

  id = this.router.snapshot.paramMap.get('id');
  getUserId = this.singleForum$.pipe(
    map((forum)=>forum.user_id)
  )
  forumUserId = this.getUserId.subscribe()
  allAnswersToQuestion$: Observable<ForumAnswer[]> = this.store.select(selectAllAnswerToQuestion);
  isAnswerLoading$: Observable<boolean> = this.store.select(selectForumAnswerLoading);
  isAnswerError$: Observable<boolean> = this.store.select(selectForumAnswerError);
  messageAnswer$: Observable<string> = this.store.select(selectForumAnswerMessage);
  ngOnInit(): void {
    if(this.id){
      this.store.dispatch(getForum({id:parseInt(this.id)}));
      console.log(this.id)
      this.store.dispatch(getAllAnswersToQuestion({id:parseInt(this.id)}))
    }
    combineLatest([this.isError$, this.isAnswerError$]).subscribe(([isError ,isAnswerError])=>{
      if(isError){
        this.message$.subscribe((errorMessage)=>{
          this.toastr.error(errorMessage)
        })
      }
      if(isAnswerError){
        this.messageAnswer$.subscribe((errorMessage)=>{
          this.toastr.error(errorMessage)
        })
      }
    })
  }
  // stripService
  getProcessedContent(content: string): string {
    return content ? this.htmlStripService.stripHtml(content).trim() : "";
  }
  //questionLikes
  handleLikes = (id:number, userId:number, dislikes: number[], likes: number[] )=>{
    if(!this.user || this.user.id === userId || dislikes && dislikes.length && dislikes.some((item)=>item === this.user.id)  || likes && likes.length && likes.some((item)=>item === this.user.id)){
      return
    }
    else{
      this.httpClient.post('http://localhost:5000/api/forum/likes',{id:id, user_id: this.user.id}).subscribe({
        next: (response)=>{
          console.log(response)
        }
      })
      this.httpClient.get(`http://localhost:5000/api/forum/find/${id}`).subscribe();
    }
  }
  handleDislikes = (id:number, userId:number, dislikes: number[], likes: number[] )=>{
    if(!this.user || this.user.id === userId || dislikes && dislikes.length && dislikes.some((item)=>item === this.user.id)  || likes && likes.length && likes.some((item)=>item === this.user.id)){
      return
    }
    else{
      this.httpClient.post('http://localhost:5000/api/forum/dislikes',{id:id, user_id: this.user.id}).subscribe({
        next: (response)=>{
          console.log(response)
        }
      })
      this.httpClient.get(`http://localhost:5000/api/forum/find/${id}`).subscribe();
    }
  }

  //answerlikes
  handleAnswerLikes = (id:number, userId:number, dislikes: number[], likes: number[] )=>{
    if(!this.user || this.user.id === userId || dislikes && dislikes.length && dislikes.some((item)=>item === this.user.id)  || likes && likes.length && likes.some((item)=>item === this.user.id)){
      return
    }
    else{
      this.httpClient.post('http://localhost:5000/api/forumAnswers/likes',{id:id, user_id: this.user.id}).subscribe({
        next: (response)=>{
          console.log(response)
        }
      })
      this.httpClient.get(`http://localhost:5000/api/forumAnswers/find/${id}`).subscribe();
    }
  }
  handleAnswerDislikes = (id:number, userId:number, dislikes: number[], likes: number[] )=>{
    if(!this.user || this.user.id === userId || dislikes && dislikes.length && dislikes.some((item)=>item === this.user.id)  || likes && likes.length && likes.some((item)=>item === this.user.id)){
      return
    }
    else{
      this.httpClient.post('http://localhost:5000/api/forumAnswers/dislikes',{id:id, user_id: this.user.id}).subscribe({
        next: (response)=>{
          console.log(response)
        }
      })
      this.httpClient.get(`http://localhost:5000/api/forumAnswers/find/${id}`).subscribe();
    }
  }
  //solve
  handleHasSolved = (id: number, question_id:number)=>{
    if(this.user.id === this.forumUserId){
      this.httpClient.post('http://localhost:5000/api/forumAnswers/hasSolved',{id:id, question_id: question_id}).subscribe({
        next: (response)=>{
          console.log(response)
        }
      })
      this.httpClient.get(`http://localhost:5000/api/forumAnswers/find/${id}`).subscribe();
    }
    else{
      return
    }
  }
  // replies
  handleAnswerClose = ()=>{
    this.answerModule = false;
  }
  answerData: AnswerData | null = null
  handleReply = (id:number)=>{
    this.answerModule = true;
    this.answerData = {
    username:this.user.username,
    user_id: this.user.id,
    is_admin: this.user.is_admin,
    question_id: id,
    answerername: "",
    answerer_id: 0,
    }
  }
  
  handleAnswerReply = (question_id:number, username: string, user_id:number)=>{
    this.answerModule = true;
    this.answerData = {
    username:username,
    user_id: user_id,
    is_admin: this.user.is_admin,
    question_id: question_id,
    answerername: this.user.username,
    answerer_id: this.user.id,
    }
  }
  //goBack
  goBack = ()=>{
    this.location.back()
  }
}
