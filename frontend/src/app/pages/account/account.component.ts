import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services_interceptors/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { Blogmember } from '../../store/reducers/blogMember.reducer';
import { Store } from '@ngrx/store';
import { createUserMessage } from '../../store/actions/usermessage.actions';
import { deleteBlogmember, updateBlogmember } from '../../store/actions/blogmember.actions';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { selectAdminMessageError, selectAdminMessageLoading, selectAdminMessageMessage, selectUserAdminMessage } from '../../store/selectors/adminMessage.selector';
import { combineLatest, Observable } from 'rxjs';
import { AdminMessage } from '../../store/reducers/adminMessage.reducer';
import { Forum } from '../../store/reducers/forum.reducer';
import { selectAllUserQuestions, selectForumError, selectForumLoading, selectForumMessage } from '../../store/selectors/forum.selectors';
import { ToastrService } from 'ngx-toastr';
import { getUserAdminMessages } from '../../store/actions/adminmessage.actions';
import { getAllUserQuestions } from '../../store/actions/forum.actions';
import { HtmlStripService } from '../../services_interceptors/htmlStrip.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit {
  constructor(
    private authService: AuthService, 
    private location:Location,
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private htmlStripService: HtmlStripService,
  ){}
  //adminMessage catch
  id = this.route.snapshot.paramMap.get('id')
  userAdminMessage$: Observable<AdminMessage[]> = this.store.select(selectUserAdminMessage);
  isError$: Observable<boolean> = this.store.select(selectAdminMessageError);
  isLoading$: Observable<boolean> = this.store.select(selectAdminMessageLoading);
  message$: Observable<string> = this.store.select(selectAdminMessageMessage);
  //userQuestionsFetch
  allUserQuestions$: Observable<Forum[]> = this.store.select(selectAllUserQuestions);
  isErrorUserQuestions$: Observable<boolean> = this.store.select(selectForumError);
  isLoadingUserQuestions$: Observable<boolean> = this.store.select(selectForumLoading);
  messageUserQuestions$: Observable<string> = this.store.select(selectForumMessage);
  ngOnInit(): void {
    combineLatest([this.isError$, this.isErrorUserQuestions$]).subscribe(([isError, isErrorUserQuestions])=>{
      if(isError){
        this.message$.subscribe((message)=>{
          this.toastr.error(message)
        })
      }
      if(isErrorUserQuestions){
        this.message$.subscribe((messageUserQuestions)=>{
          this.toastr.error(messageUserQuestions)
        })
      }
    })
    this.store.dispatch(getUserAdminMessages({id: parseInt(this.id!)}))
    this.store.dispatch(getAllUserQuestions({id: parseInt(this.id!)}))
    this.updateUserForm.get('vorname')?.setValue(this.user &&this.user.vorname)
    this.updateUserForm.get('nachname')?.setValue(this.user &&this.user.nachname)
  }
  //user
  user: Blogmember = this.authService.getUser();
  //goBack
  goBack = ()=>{
    this.location.back()
  }
  //handleAccount
  accountModule = false;
  handleAccount = ()=>{
    this.accountModule = true;
  }
  closeModule = ()=>{
    this.messageModule = false;
    this.deleteWarn = false;
    this.accountModule = false;
  }
  messageModule = false;
  openMessageForm = ()=>{
    this.messageModule = true;
  }
  deleteWarn = false;
  openDeleteWarn = ()=>{
    this.deleteWarn = true;
  }
  handleDelete = ()=>{
    this.store.dispatch(deleteBlogmember({id: this.user.id!}));
    this.router.navigate(['/']);
  }
  //forms
  usermessageForm = new FormGroup({
    message: new FormControl('', Validators.required)
  })
  onMessageSubmit = ()=>{
    if(this.usermessageForm.valid){
      const {message} = this.usermessageForm.value;
      const userMessageData = {
        username: this.user.username!,
        user_id: this.user.id!,
        message: message as string,
      }
      this.store.dispatch(createUserMessage({userMessageData: userMessageData}))
      this.usermessageForm.reset
    }
  }
  updateUserForm = new FormGroup({
    vorname: new FormControl('', Validators.required),
    nachname: new FormControl('', Validators.required),
  })
  onSubmit = ()=>{
    if(this.updateUserForm.valid){
      const {vorname, nachname} = this.updateUserForm.value;
      const updateData = {
        vorname: vorname!,
        nachname: nachname!
      }
      this.store.dispatch(updateBlogmember({id: parseInt(this.id!), blogmemberData: updateData}))
    }
  }
   // stripService
   getProcessedContent(content: string): string {
    return this.htmlStripService.stripHtml(content).trim();
  }
}
