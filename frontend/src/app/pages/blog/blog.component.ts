import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable, tap } from 'rxjs';
import { Blog } from '../../store/reducers/blog.reducer';
import { selectAllBlogData, selectBlogError, selectBlogLoading, selectBlogMessage } from '../../store/selectors/blog.selectors';
import { getAllBlog } from '../../store/actions/blog.actions';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {
  constructor(private store: Store, private toastr: ToastrService){}
  allBlogEntries$: Observable<Blog[]> = this.store.select(selectAllBlogData);
  isLoading$: Observable<boolean> = this.store.select(selectBlogLoading);
  isError$: Observable<boolean> = this.store.select(selectBlogError);
  message$: Observable<string> = this.store.select(selectBlogMessage);

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
    this.store.dispatch(getAllBlog())
  }
}
