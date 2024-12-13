import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription, tap } from 'rxjs';
import { ForumTheme } from '../../store/reducers/forumTheme.reducer';
import { selectAllForumThemeData, selectForumThemeError, selectForumThemeLoading, selectForumThemeMessage } from '../../store/selectors/forumTheme.selectors';
import { getAllForumTheme } from '../../store/actions/forumtheme.actions';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { AuthService } from '../../services_interceptors/auth.service';
import { Blogmember } from '../../store/reducers/blogMember.reducer';
import { ResizeObserverService } from '../../services_interceptors/resize.service';
import { MobileNavbarComponent } from '../../components/mobile-navbar/mobile-navbar.component';
import { ForumLinksService } from '../../services_interceptors/forumlinks.service';
interface ForumLink{
  name: string,
  url: string
}
@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, MobileNavbarComponent],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.scss'
})
export class ForumComponent implements OnInit, OnDestroy{
  constructor(
              private store: Store, 
              private toastr: ToastrService, 
              private forumLinksService: ForumLinksService, 
              private authService: AuthService,
              private cd: ChangeDetectorRef,
              private resizeObserverService: ResizeObserverService,
              @Inject(PLATFORM_ID) private platFormId: Object, 
            ){}
  allForumThemes$: Observable<ForumTheme[]> = this.store.select(selectAllForumThemeData);
  isLoading$: Observable<boolean> = this.store.select(selectForumThemeLoading);
  isError$: Observable<boolean> = this.store.select(selectForumThemeError);
  message$: Observable<string> = this.store.select(selectForumThemeMessage);
  forumLinks:ForumLink[] | null = null;
  user: Blogmember = this.authService.getUser()
  windowWidth!:number;
  private resizeSubscription!:Subscription;
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
    this.store.dispatch(getAllForumTheme())
    this.forumLinksService.getForumLinks().subscribe({
      next:(response)=>{
        this.forumLinks = response
      },
      error: (error)=>{
        this.toastr.error(error)
      }
    })
    this.forumLinksService.fetchForumLinks()
  }
  ngOnDestroy(): void {
    if(this.resizeSubscription){
      this.resizeSubscription.unsubscribe()
    }
  }
}
