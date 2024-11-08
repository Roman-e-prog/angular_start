import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { combineLatest, Observable, tap } from 'rxjs';
import { AdminMessage } from '../../../store/reducers/adminMessage.reducer';
import { selectAdminMessageError, selectAdminMessageLoading, selectAdminMessageMessage, selectAllAdminMessageData } from '../../../store/selectors/adminMessage.selector';
import { getAllAdminMessage } from '../../../store/actions/adminmessage.actions';
import { selectAllBlogmemberData, selectBlogmemberError, selectBlogmemberLoading, selectBlogmemberMessage } from '../../../store/selectors/blogmember.selector';
import { Blogmember } from '../../../store/reducers/blogMember.reducer';
import { UserMessage } from '../../../store/reducers/userMessage.reducer';
import { selectAllUserMessageData, selectUserMessageError, selectUserMessageLoading, selectUserMessageMessage } from '../../../store/selectors/userMessage.selector';
import { getAllUserMessage } from '../../../store/actions/usermessage.actions';
import { getAllBlogmember } from '../../../store/actions/blogmember.actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-messages-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './admin-messages-dashboard.component.html',
  styleUrl: './admin-messages-dashboard.component.scss'
})
export class AdminMessagesDashboardComponent {
  constructor(private toastr: ToastrService, private store: Store){}
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
 
  ngOnInit(): void {
    combineLatest({
      
    })
    this.store.dispatch(getAllAdminMessage())
    this.store.dispatch(getAllUserMessage())
    this.store.dispatch(getAllBlogmember())
  }
  adminMessageForm = new FormGroup({
    message: new FormControl('', Validators.required)
  })
  onSubmit = ()=>{
    const {message} = this.adminMessageForm.value
    const addminMessageData = {
    adminname:"",
    admin_id: "",
    message: message,
    username:"",
    user_id: "",
    usermessage_id:"",
    }
  }
}
