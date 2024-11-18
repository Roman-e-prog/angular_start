import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Blog } from '../../store/reducers/blog.reducer';
import { selectBlogData, selectBlogError, selectBlogLoading, selectBlogMessage } from '../../store/selectors/blog.selectors';
import { ToastrService } from 'ngx-toastr';
import { getBlog } from '../../store/actions/blog.actions';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-single-blog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single-blog.component.html',
  styleUrl: './single-blog.component.scss'
})
export class SingleBlogComponent implements OnInit{
  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private location: Location,
    private toastr: ToastrService,
  ){}
  id = this.route.snapshot.paramMap.get('id')
  blogEntrie$: Observable<Blog> = this.store.select(selectBlogData);
  isLoading$: Observable<boolean> = this.store.select(selectBlogLoading);
  isError$: Observable<boolean> = this.store.select(selectBlogError);
  message$: Observable<string> = this.store.select(selectBlogMessage);

  ngOnInit(): void {
    this.isError$.pipe(
      map((isError)=>{
        if(isError){
          this.message$.subscribe((message)=>{
            this.toastr.error(message)
          })
        }
      })
    )
    this.store.dispatch(getBlog({id:parseInt(this.id!)}))
  }
  goBack = ()=>{
    this.location.back()
  }
}
