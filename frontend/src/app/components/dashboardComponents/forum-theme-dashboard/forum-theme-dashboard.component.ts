import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable, tap } from 'rxjs';
import { ForumTheme } from '../../../store/reducers/forumTheme.reducer';
import { selectAllForumThemeData, selectForumThemeError, selectForumThemeLoading, selectForumThemeMessage } from '../../../store/selectors/forumTheme.selectors';
import { createForumTheme, getAllForumTheme } from '../../../store/actions/forumtheme.actions';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forum-theme-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
}


