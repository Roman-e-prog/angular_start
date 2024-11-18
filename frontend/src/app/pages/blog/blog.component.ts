import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription, tap } from 'rxjs';
import { Blog } from '../../store/reducers/blog.reducer';
import { selectAllBlogData, selectBlogError, selectBlogLoading, selectBlogMessage } from '../../store/selectors/blog.selectors';
import { getAllBlog } from '../../store/actions/blog.actions';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { MobileNavbarComponent } from '../../components/mobile-navbar/mobile-navbar.component';
import { ResizeObserverService } from '../../services_interceptors/resize.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, MobileNavbarComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent implements OnInit, OnDestroy{
  constructor(
              private store: Store, 
              private toastr: ToastrService,
              private resizeObserverService: ResizeObserverService,
              private cd: ChangeDetectorRef,
              @Inject(PLATFORM_ID) private platFormId: Object,
            ){}
  allBlogEntries$: Observable<Blog[]> = this.store.select(selectAllBlogData);
  isLoading$: Observable<boolean> = this.store.select(selectBlogLoading);
  isError$: Observable<boolean> = this.store.select(selectBlogError);
  message$: Observable<string> = this.store.select(selectBlogMessage);

  windowWidth!: number;
  private resizeSubscription!: Subscription;
  ngOnInit(): void {
    if(isPlatformBrowser(this.platFormId)){
      this.resizeSubscription = this.resizeObserverService.resize$.subscribe((width)=>{
        this.windowWidth = width;
        this.cd.detectChanges();
      })
    }
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
  ngOnDestroy(): void {
    if(this.resizeSubscription){
      this.resizeSubscription.unsubscribe();
    }
  }
}
