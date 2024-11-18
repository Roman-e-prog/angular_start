import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable, tap } from 'rxjs';
import { ForumTheme } from '../../../store/reducers/forumTheme.reducer';
import { selectAllForumThemeData, selectForumThemeError, selectForumThemeLoading, selectForumThemeMessage } from '../../../store/selectors/forumTheme.selectors';
import { createForumTheme, deleteForumTheme, getAllForumTheme } from '../../../store/actions/forumtheme.actions';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgIconsModule } from '@ng-icons/core';
import { matEditOutline, matDeleteOutline } from '@ng-icons/material-icons/outline';
import { ForumThemesEditComponent } from '../editForms/forum-themes-edit/forum-themes-edit.component';
@Component({
  selector: 'app-forum-theme-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIconsModule, ForumThemesEditComponent],
  templateUrl: './forum-theme-dashboard.component.html',
  styleUrl: './forum-theme-dashboard.component.scss'
})
export class ForumThemeDashboardComponent {
  constructor(private toastr: ToastrService, private store: Store){}
  allForumThemes$: Observable<ForumTheme[]> = this.store.select(selectAllForumThemeData);
  isLoading$: Observable<boolean> = this.store.select(selectForumThemeLoading);
  isError$: Observable<boolean> = this.store.select(selectForumThemeError);
  message$: Observable<string> = this.store.select(selectForumThemeMessage);
 
  ngOnInit(): void {
    this.isError$.pipe(
      tap(isError => {
        if (isError) {
          this.message$.subscribe(errorMessage => {
            this.toastr.error(errorMessage);
          });
        }
      })
    ).subscribe();
    this.store.dispatch(getAllForumTheme())
  }
  forumThemeForm = new FormGroup({
    ressort: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
  }) 
  onSubmit = ()=>{
    const {ressort, title, content} = this.forumThemeForm.value
    const forumThemeData = {
      ressort: ressort!,
      title:title!,
      content:content!,
    }
    this.store.dispatch(createForumTheme({forumThemeData: forumThemeData}))
  }
  // edit und delete
  editModule = false
  editData: ForumTheme | null = null;
  handleEdit = (forumTheme: ForumTheme)=>{
    this.editModule = true;
    this.editData = forumTheme
  }
  handleClose = ()=>{
    this.editModule = false;
  }
  handleDelete = (id: number)=>{
    console.log('i am here')
    this.store.dispatch(deleteForumTheme({id: id}))
  }
}


