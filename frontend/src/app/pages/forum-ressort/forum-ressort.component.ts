import { Component, OnInit, Inject, PLATFORM_ID, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, Observable, Subscription, tap } from 'rxjs';
import { Forum } from '../../store/reducers/forum.reducer';
import { Store } from '@ngrx/store';
import { selectAllForumData, selectForumError, selectForumLoading, selectForumMessage } from '../../store/selectors/forum.selectors';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { matCheckBoxOutline, matThumbDownOutline, matThumbUpOutline } from '@ng-icons/material-icons/outline';
import { NgIconsModule } from '@ng-icons/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services_interceptors/auth.service';
import { QuestionModuleComponent } from '../../components/question-module/question-module.component';
import { getAllForum} from '../../store/actions/forum.actions';
import { HtmlStripService } from '../../services_interceptors/htmlStrip.service';
import { ResizeObserverService } from '../../services_interceptors/resize.service';
import { MobileNavbarComponent } from '../../components/mobile-navbar/mobile-navbar.component';


@Component({
  selector: 'app-forum-ressort',
  standalone: true,
  imports: [NavbarComponent, CommonModule, RouterLink, QuestionModuleComponent, NgIconsModule, MobileNavbarComponent],
  templateUrl: './forum-ressort.component.html',
  styleUrl: './forum-ressort.component.scss',
})
export class ForumRessortComponent implements OnInit, OnDestroy{
constructor(private route: ActivatedRoute, 
            private store: Store, 
            private toastr: ToastrService, 
            private authService: AuthService,
            private htmlStripService: HtmlStripService,
            private cd: ChangeDetectorRef,
            private resizeObserverService: ResizeObserverService,
            @Inject(PLATFORM_ID) private platformId: Object,
          ){}

user = this.authService.getUser();
windowWidth!:number;
private resizeSubsription!: Subscription;
questionModule = false;
  // stripService
  getProcessedContent(content: string): string {
    return this.htmlStripService.stripHtml(content).trim();
  }
  //no likes
  noLikes = ()=>{
    this.toastr.error('Likes oder Dislikes können nur auf der Seite des Beitrags vergeben werden')
  }
allForum$: Observable<Forum[]> = this.store.select(selectAllForumData);
isLoading$: Observable<boolean> = this.store.select(selectForumLoading);
isError$: Observable<boolean> = this.store.select(selectForumError);
message$: Observable<string> = this.store.select(selectForumMessage);
name = this.route.snapshot.paramMap.get('name')
    filteredForums$ = this.allForum$.pipe(
      map((forum)=>{
        return forum.filter((item)=>item.question_ressort === this.name)})
    )
 
  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)){
     this.resizeSubsription = this.resizeObserverService.resize$.subscribe((width)=>{
        this.windowWidth = width;
        this.cd.detectChanges()
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
    this.store.dispatch(getAllForum())
  }
  ngOnDestroy(): void {
    if(this.resizeSubsription){
      this.resizeSubsription.unsubscribe();
    }
  }
  handleQuestion = ()=>{
    if(!this.user){
      this.toastr.error('Sie müssen sich einloggen, wenn Sie ein Thema eröffnen möchten')
    }
    else{
      this.questionModule = true
    }
  }
  handleClose = ()=>{
    this.questionModule = false;
  }
}
