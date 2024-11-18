import { ChangeDetectorRef, Component, OnDestroy, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ResizeObserverService } from '../../services_interceptors/resize.service';
import { Subscription } from 'rxjs';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MobileNavbarComponent } from '../../components/mobile-navbar/mobile-navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, CommonModule, MobileNavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent  implements OnInit, OnDestroy{
  constructor(
    private resizeObserverService: ResizeObserverService, 
              private cd: ChangeDetectorRef,
              @Inject(PLATFORM_ID) private platformId: Object //code runs only in the browser
            ){}
  windowWidth!: number;
  private resizeSubscription!: Subscription;
  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)){
      this.resizeSubscription = this.resizeObserverService.resize$.subscribe((width)=>{
        this.windowWidth = width;
        this.cd.detectChanges(); 
      })
    }
  }
  ngOnDestroy(): void {
    if(this.resizeSubscription){
      this.resizeSubscription.unsubscribe()
    }
  }
}
