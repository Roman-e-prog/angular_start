import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectForumData, selectForumError, selectForumLoading, selectForumMessage } from '../../store/selectors/forum.selectors';
import { combineLatest, distinctUntilChanged, filter, map, Observable, Subject, tap } from 'rxjs';
import { deleteForum, getForum, incrementDisLikes, incrementLikes, incrementViews} from '../../store/actions/forum.actions';
import { ToastrService } from 'ngx-toastr';
import { matCheckBoxOutline, matDeleteOutline, matEditOutline, matReplyOutline, matThumbDownOutline, matThumbUpOutline } from '@ng-icons/material-icons/outline';
import { CommonModule, Location } from '@angular/common';
import { AuthService } from '../../services_interceptors/auth.service';
import { selectAllAnswerToQuestion, selectForumAnswerError, selectForumAnswerLoading, selectForumAnswerMessage } from '../../store/selectors/forumAnswers.selector';
import { deleteForumAnswer, getAllAnswersToQuestion, hasSolved, incrementAnswerDisLikes, incrementAnswerLikes } from '../../store/actions/forumAnswers.actions';
import { ForumAnswer } from '../../store/reducers/forumAnswer.reducer';
import { Forum } from '../../store/reducers/forum.reducer';
import { AnswerModuleComponent } from '../../components/answer-module/answer-module.component';
import { NgIconsModule } from '@ng-icons/core';
import { HtmlStripService } from '../../services_interceptors/htmlStrip.service';
import { EditForumQuestionComponent } from '../../components/edit-forum-question/edit-forum-question.component';
import { ForumAnswerEditModuleComponent } from '../../components/forum-answer-edit-module/forum-answer-edit-module.component';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

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
  imports: [
            CommonModule, 
            AnswerModuleComponent, 
            NgIconsModule, 
            EditForumQuestionComponent, 
            ForumAnswerEditModuleComponent],
  templateUrl: './single-question.component.html',
  styleUrl: './single-question.component.scss'
})

export class SingleQuestionComponent implements OnInit {
  constructor(private store: Store, 
              private router: ActivatedRoute,
              private toastr: ToastrService, 
              private authService: AuthService,
              private location: Location,
              private htmlStripService: HtmlStripService,
              private cdr: ChangeDetectorRef,
              @Inject(PLATFORM_ID) private platformId: Object,
            ){}
  user = this.authService.getUser();
  answerModule = false;

  id = this.router.snapshot.paramMap.get('id');
 
  singleForum$: Observable<Forum> = this.store.select(selectForumData);
  isLoading$: Observable<boolean> = this.store.select(selectForumLoading);
  isError$: Observable<boolean> = this.store.select(selectForumError);
  message$: Observable<string>  = this.store.select(selectForumMessage);


  forumUserId!:number | null;
  
  allAnswersToQuestion$: Observable<ForumAnswer[]> = this.store.select(selectAllAnswerToQuestion);
  isAnswerLoading$: Observable<boolean> = this.store.select(selectForumAnswerLoading);
  isAnswerError$: Observable<boolean> = this.store.select(selectForumAnswerError);
  messageAnswer$: Observable<string> = this.store.select(selectForumAnswerMessage);
  ngOnInit(): void {
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
    this.store.dispatch(getForum({ id: parseInt(this.id!)}));
    this.singleForum$
    .pipe( 
      filter((forum): forum is Forum => !!forum), //I filter out the forum to check if its correct there
      map((forum) => forum.user_id), //map in the forum
      distinctUntilChanged() //prevents reemission of the user_id
    )
    .subscribe({
      next: (userId) => {
        this.forumUserId = userId;
      },
      error: (err) => {
        console.error('Error fetching forum user_id:', err);
      }
    });
  }
  // stripService
  getProcessedContent(content: string): string {
    return content ? this.htmlStripService.stripHtml(content).trim() : "";
  }
  //questionLikes
  handleLikes = (id:number, userId:number, dislike_ids: number[], like_ids: number[] )=>{
    if(!this.user || this.user.id === userId || dislike_ids && dislike_ids.length && dislike_ids.some((item)=>item === this.user.id)  || like_ids && like_ids.length && like_ids.some((item)=>item === this.user.id)){
      return
    }
    else{
      this.store.dispatch(incrementLikes({id:id, user_id: this.user.id}))
    }
  }
  handleDislikes = (id:number, userId:number, dislike_ids: number[], like_ids: number[] )=>{
    if(!this.user || this.user.id === userId || dislike_ids && dislike_ids.length && dislike_ids.some((item)=>item === this.user.id)  || like_ids && like_ids.length && like_ids.some((item)=>item === this.user.id)){
      return
    }
    else{
      this.store.dispatch(incrementDisLikes({id:id, user_id: this.user.id}))
    }
  }

  //answerlikes
  handleAnswerLikes = (id:number, userId:number, dislike_ids: number[], like_ids: number[] )=>{
    if(!this.user || this.user.id === userId || dislike_ids && dislike_ids.length && dislike_ids.some((item)=>item === this.user.id)  || like_ids && like_ids.length && like_ids.some((item)=>item === this.user.id)){
      return
    }
    else{
      this.store.dispatch(incrementAnswerLikes({id:id, user_id: this.user.id}))
    }
  }
  handleAnswerDislikes = (id:number, userId:number, dislike_ids: number[], like_ids: number[] )=>{
    if(!this.user || this.user.id === userId || dislike_ids && dislike_ids.length && dislike_ids.some((item)=>item === this.user.id)  || like_ids && like_ids.length && like_ids.some((item)=>item === this.user.id)){
      return
    }
    if (!this.user.id) {
      console.error('User ID is undefined, action aborted');
      return;
    }
    else{
      this.store.dispatch(incrementAnswerDisLikes({id:id, user_id: this.user.id}))
    }
  }
  //solve
  handleHasSolved = (id: number, question_id:number)=>{
    if(this.user.id === this.forumUserId){
      this.store.dispatch(hasSolved({id:id, question_id: question_id}))
      this.store.dispatch(getForum({id:id}))
      this.store.dispatch(getAllAnswersToQuestion({id:id}))
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
  //update and delete question
  handleQuestionDelete = (id:number)=>{
    this.store.dispatch(deleteForum({id:id}))
  }
  editForumModule = false;
  editQuestionData: Forum | null = null;
  handleClose = ()=>{
    this.editForumModule = false;
  }
  handleQuestionEdit = (forum:Forum)=>{
    this.editForumModule = true;
    this.editQuestionData = forum;
  }
  //update and delete answer
  handleAnswerDelete = (id:number, question_id:number)=>{
    this.store.dispatch(deleteForumAnswer({id:id, question_id: question_id}))
  }
  editAnswerModule = false;
  editAnswerData: ForumAnswer | null = null;
  handleAnswerEditClose = ()=>{
    this.editAnswerModule = false;
  }
  handleAnswerEdit = (answer:ForumAnswer)=>{
    this.editAnswerModule = true;
    this.editAnswerData = answer;
  }
}
