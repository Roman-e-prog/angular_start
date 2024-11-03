import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable, tap } from 'rxjs';
import { ForumTheme } from '../../store/reducers/forumTheme.reducer';
import { selectAllForumThemeData, selectForumThemeError, selectForumThemeLoading, selectForumThemeMessage } from '../../store/selectors/forumTheme.selectors';
import { getAllForumTheme } from '../../store/actions/forumtheme.actions';
import { HttpClient } from '@angular/common/http';
interface ForumLink{
  name: string,
  url: string
}
@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.scss'
})
export class ForumComponent {
  constructor(private store: Store, private toastr: ToastrService, private httpClient: HttpClient){}
  allUebermich$: Observable<ForumTheme[]> = this.store.select(selectAllForumThemeData);
  isLoading$: Observable<boolean> = this.store.select(selectForumThemeLoading);
  isError$: Observable<boolean> = this.store.select(selectForumThemeError);
  message$: Observable<string> = this.store.select(selectForumThemeMessage);
  forumLinks:ForumLink[] | null = null;
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
    this.httpClient.get<ForumLink[]>('assets/forumlinks.json').subscribe({
      next:(response)=>{
        this.forumLinks = response
      },
      error: (error)=>{
        this.toastr.error(error)
      }
    })
  }
  
}
