import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { combineLatest, map, Observable, tap } from 'rxjs';
import { AdminMessage } from '../../../store/reducers/adminMessage.reducer';
import { selectAdminMessageError, selectAdminMessageLoading, selectAdminMessageMessage, selectAllAdminMessageData } from '../../../store/selectors/adminMessage.selector';
import { createAdminMessage, getAllAdminMessage } from '../../../store/actions/adminmessage.actions';
import { selectAllBlogmemberData, selectBlogmemberError, selectBlogmemberLoading, selectBlogmemberMessage } from '../../../store/selectors/blogmember.selector';
import { Blogmember } from '../../../store/reducers/blogMember.reducer';
import { UserMessage } from '../../../store/reducers/userMessage.reducer';
import { selectAllUserMessageData, selectUserMessageError, selectUserMessageLoading, selectUserMessageMessage } from '../../../store/selectors/userMessage.selector';
import { deleteUserMessage, getAllUserMessage } from '../../../store/actions/usermessage.actions';
import { getAllBlogmember } from '../../../store/actions/blogmember.actions';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { matArrowBackOutline } from '@ng-icons/material-icons/outline';
import { NgIconsModule } from '@ng-icons/core';
import { AuthService } from '../../../services_interceptors/auth.service';
@Component({
  selector: 'app-admin-messages-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIconsModule],
  templateUrl: './admin-messages-dashboard.component.html',
  styleUrl: './admin-messages-dashboard.component.scss',
  providers: [DatePipe]
})
export class AdminMessagesDashboardComponent {
  constructor(
              private toastr: ToastrService, 
              private store: Store,
              private datePipe: DatePipe,
              private authService: AuthService,
            ){}
  user: Blogmember = this.authService.getUser();
  allAdminmessages$: Observable<AdminMessage[]> = this.store.select(selectAllAdminMessageData);
  isLoading$: Observable<boolean> = this.store.select(selectAdminMessageLoading);
  isError$: Observable<boolean> = this.store.select(selectAdminMessageError);
  message$: Observable<string> = this.store.select(selectAdminMessageMessage);
  //blogmembers
  allBlogmembers$: Observable<Blogmember[]> = this.store.select(selectAllBlogmemberData);
  isBlogmemberLoading$: Observable<boolean> = this.store.select(selectBlogmemberLoading);
  isBlogmemberError$: Observable<boolean> = this.store.select(selectBlogmemberError);
  messageBlogmember$: Observable<string> = this.store.select(selectBlogmemberMessage);
  //usermessages
  allUsermessages$: Observable<UserMessage[]> = this.store.select(selectAllUserMessageData);
  isUsermessageLoading$: Observable<boolean> = this.store.select(selectUserMessageLoading);
  isUsermessageError$: Observable<boolean> = this.store.select(selectUserMessageError);
  messageUsermessage$: Observable<string> = this.store.select(selectUserMessageMessage);

 sortedBlogmembers$!: Observable<Blogmember[]>;
 ngOnInit(): void {
    combineLatest([this.isError$, this.isBlogmemberError$, this.isUsermessageError$]).subscribe(([isError, isBlogmemberError, isUsermessageError])=>{
      if(isError){
        this.message$.subscribe((message)=>{
          console.log(message, '1')
          this.toastr.error(message)
        })
      }
      else if(isBlogmemberError){
        this.messageBlogmember$.subscribe((blogMemberErrorMessage)=>{
          this.toastr.error(blogMemberErrorMessage)
        })
      }
      else if(isUsermessageError){
        this.messageBlogmember$.subscribe((blogMemberErrorMessage)=>{
          console.log(blogMemberErrorMessage, '3')
          this.toastr.error(blogMemberErrorMessage)
        })
      }
    })
    this.store.dispatch(getAllAdminMessage())
    this.store.dispatch(getAllUserMessage())
    this.store.dispatch(getAllBlogmember())
    this.sortedBlogmembers$ = this.allBlogmembers$.pipe(
      map((blogmember)=>[...blogmember].sort((a,b)=>a.username! > b.username! ? 1 : -1))
    )
  }
  //display blogMember
  allBlogMember = false;
  handleOpenBlogmembers = ()=>{
    if(this.allBlogMember){
      this.allBlogMember = false
    }
    else{
      this.allBlogMember = true;
    }
  }
  //handle Data on userMessage
  handleAnswer = (username:string, userId: number, usermessage_id:number)=>{
    this.adminMessageForm.get('username')?.setValue(username)
    this.adminMessageForm.get('user_id')?.setValue(userId)
    this.adminMessageForm.get('usermessage_id')?.setValue(usermessage_id)

  }
  handleMessage = (userId: number, username:string)=>{
    this.adminMessageForm.get('username')?.setValue(username)
    this.adminMessageForm.get('user_id')?.setValue(userId)
  }
  //send
  adminMessageForm = new FormGroup({
    message: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    user_id: new FormControl<number | null>( null, Validators.required),
    usermessage_id: new FormControl<number | null>(null),
  })
  onSubmit = ()=>{
    const {message, username, user_id, usermessage_id} = this.adminMessageForm.value
    const addminMessageData = {
    adminname:  this.user && this.user.username!,
    admin_id: this.user && this.user.id!,
    message: message!,
    username:username!,
    user_id: user_id!,
    usermessage_id:usermessage_id!,
    }
    this.store.dispatch(createAdminMessage({adminMessageData: addminMessageData}))
    this.adminMessageForm.reset();
  }
  handleQuestionDelete = (id:number)=>{
    this.store.dispatch(deleteUserMessage({id:id}))
  }
}
