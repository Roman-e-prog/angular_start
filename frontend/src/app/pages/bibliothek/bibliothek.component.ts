import { ChangeDetectorRef, Component, OnDestroy, OnInit, PLATFORM_ID, Inject} from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, Subscription, tap } from 'rxjs';
import { Bibliothek } from '../../store/reducers/bibliothek.reducer';
import { selectAllBibliothekData, selectBibliothekError, selectBibliothekLoading, selectBibliothekMessage } from '../../store/selectors/bibliothek.selector';
import { getAllBibliothek } from '../../store/actions/bibliothek.actions';
import { CommonModule, isPlatformBrowser} from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { NgIconsModule } from '@ng-icons/core';
import { matArrowCircleLeftOutline, matArrowCircleRightOutline } from '@ng-icons/material-icons/outline';
import { ResizeObserverService } from '../../services_interceptors/resize.service';
import { YouTubePlayer } from '@angular/youtube-player';
import { MobileNavbarComponent } from '../../components/mobile-navbar/mobile-navbar.component';

@Component({
  selector: 'app-bibliothek',
  standalone: true,
  imports: [CommonModule, NavbarComponent, NgIconsModule, YouTubePlayer, MobileNavbarComponent],
  templateUrl: './bibliothek.component.html',
  styleUrl: './bibliothek.component.scss'
})
export class BibliothekComponent implements OnInit, OnDestroy {
  constructor(
              private store: Store, 
              private toastr: ToastrService,
              private resizeObserverService: ResizeObserverService,
              private cd : ChangeDetectorRef,
              @Inject(PLATFORM_ID) private platformId: Object //code runs only in the browser
            ){}
  allBibliothek$: Observable<Bibliothek[]> = this.store.select(selectAllBibliothekData);
  isLoading$: Observable<boolean> = this.store.select(selectBibliothekLoading);
  isError$: Observable<boolean> = this.store.select(selectBibliothekError);
  message$: Observable<string> = this.store.select(selectBibliothekMessage);

  splitUrl = (bibliothekUrl: string)=>{
    const videoId = bibliothekUrl.split('=')[1];
    return videoId;
  }
 
  private resizeSubscription!: Subscription;
  htmlVideos$!: Observable<Bibliothek[]>
  cssVideos$!: Observable<Bibliothek[]>
  javaScriptVideos$!: Observable<Bibliothek[]>
  windowWidth!: number;
  //videos width
  one!: number;
  two!: number; 
  three!: number;
  //video sliderindex
  htmlSlideIndex: number = 0;
  cssSlideIndex: number = 0;
  javaScriptSlideIndex: number = 0;
  //styles
  
  htmlStyle:any;
  cssStyle:any;
  javaScriptStyle:any;
  playerWidth!:number;
  playerHight:number = 260;
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) { 
      this.resizeSubscription = this.resizeObserverService.resize$.subscribe(width => { 
      this.windowWidth = width; 
      this.one = this.windowWidth; 
      this.two = this.windowWidth / 2; 
      this.three = this.windowWidth / 3; 
      this.updateStyles(); 
      this.cd.detectChanges(); 
    }); }
    this.isError$.pipe(
      tap(isError => {
        if (isError) {
          this.message$.subscribe(errorMessage => {
            this.toastr.error(errorMessage);
          });
        }
      })
    ).subscribe();
    this.store.dispatch(getAllBibliothek())
   
    this.filterVideos();
  }
  ngOnDestroy(): void { 
    if (this.resizeSubscription){ 
      this.resizeSubscription.unsubscribe(); 
    } 
  }
 //filtering
 filterVideos = ()=>{
    this.htmlVideos$ = this.filterByRessort('HTML');
    this.cssVideos$ = this.filterByRessort('CSS');
    this.javaScriptVideos$ = this.filterByRessort('JavaScript');
 }
 filterByRessort = (ressort:string)=>{
  return this.allBibliothek$.pipe(
    map((bibliothek)=>bibliothek.filter((item)=>item.bibliothek_ressort === ressort))
  )
 }
  //set styles
  updateStyles = ()=>{
    this.htmlStyle = this.getStyles(this.htmlSlideIndex, this.one, this.two, this.three);
    this.cssStyle = this.getStyles(this.cssSlideIndex, this.one, this.two, this.three);
    this.javaScriptStyle = this.getStyles(this.javaScriptSlideIndex, this.one, this.two, this.three);

  }
  getStyles = (slideIndex:number, one:number, two:number, three: number)=>{
    const fullWidth = {
      minWidth:`${three}px`,
      transform:`translateX(${slideIndex * - three}px)`,
    }
    const middleWidth = {
      minWidth:`${two}px`,
      transform:`translateX(${slideIndex * - two}px)`,
    }
    const smallWidth = {
      minWidth:`${one}px`,
      transform:`translateX(${slideIndex * - one}px)`,
    }
    if(this.windowWidth > 760){
      this.playerWidth = parseInt(fullWidth.minWidth.split('p')[0])
      return fullWidth
    }
    else if(this.windowWidth > 560){
      this.playerWidth = parseInt(middleWidth.minWidth.split('p')[0])
      return middleWidth
    }
    else{
      this.playerWidth = parseInt(smallWidth.minWidth.split('p')[0])
      return smallWidth
    }
  }
//handleSlide
handleHtmlSlide = (direction: string)=>{
  console.log(this.htmlSlideIndex)
  this.htmlVideos$.subscribe(videos=>{
    if(direction === 'left'){
      this.htmlSlideIndex > 0 ? this.htmlSlideIndex -=1 : 0
    }
    else if(direction === 'right' && this.windowWidth > 760){
      this.htmlSlideIndex < videos.length -3 ? this.htmlSlideIndex += 1 : videos.length - 3;
    }
    else if(direction === 'right' && this.windowWidth > 560){
      this.htmlSlideIndex < videos.length -2 ? this.htmlSlideIndex += 1 : videos.length - 2;
    }
    else{
      this.htmlSlideIndex < videos.length -1 ? this.htmlSlideIndex += 1 : videos.length - 1;
    }
    
    this.updateStyles();
  })
}
handleCssSlide = (direction: string)=>{
  this.cssVideos$.subscribe(videos=>{
    if(direction === 'left'){
    this.cssSlideIndex > 0 ? this.cssSlideIndex -=1 : 0
    }
    else if(direction === 'right' && this.windowWidth > 760){
      this.cssSlideIndex < videos.length -3 ? this.cssSlideIndex += 1 : videos.length - 3;
    }
    else if(direction === 'right' && this.windowWidth > 560){
      this.cssSlideIndex < videos.length -2 ? this.cssSlideIndex += 1 : videos.length - 2;
    }
    else{
      this.cssSlideIndex < videos.length -1 ? this.cssSlideIndex += 1 : videos.length - 1;
    }
    this.updateStyles();
  })
}
handleJavaScriptSlide = (direction: string)=>{
  this.javaScriptVideos$.subscribe(videos=>{
    if(direction === 'left'){
      this.javaScriptSlideIndex > 0 ? this.javaScriptSlideIndex -=1 : 0
      }
      else if(direction === 'right' && this.windowWidth > 760){
        this.javaScriptSlideIndex < videos.length -3 ? this.javaScriptSlideIndex += 1 : videos.length - 3;
      }
      else if(direction === 'right' && this.windowWidth > 560){
        this.javaScriptSlideIndex < videos.length -2 ? this.javaScriptSlideIndex += 1 : videos.length - 2;
      }
      else{
        this.javaScriptSlideIndex < videos.length -1 ? this.javaScriptSlideIndex += 1 : videos.length - 1;
      }
      this.updateStyles();
    })
  }
}
