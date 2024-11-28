import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { UebermichDashboardComponent } from '../../components/dashboardComponents/uebermich-dashboard/uebermich-dashboard.component';
import { BlogDashboardComponent } from '../../components/dashboardComponents/blog-dashboard/blog-dashboard.component';
import { AdminMessagesDashboardComponent } from '../../components/dashboardComponents/admin-messages-dashboard/admin-messages-dashboard.component';
import { BibliothekDashboardComponent } from '../../components/dashboardComponents/bibliothek-dashboard/bibliothek-dashboard.component';
import { ForumThemeDashboardComponent } from '../../components/dashboardComponents/forum-theme-dashboard/forum-theme-dashboard.component';
import { MobileNavbarComponent } from '../../components/mobile-navbar/mobile-navbar.component';
import { ResizeObserverService } from '../../services_interceptors/resize.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services_interceptors/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
          NavbarComponent, 
          UebermichDashboardComponent, 
          BlogDashboardComponent, 
          AdminMessagesDashboardComponent, 
          BibliothekDashboardComponent, 
          ForumThemeDashboardComponent, 
          MobileNavbarComponent,
          CommonModule,
        ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AuthService,
    private router: Router,
    private resizeObserverService: ResizeObserverService,
    private cd: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platFormId: Object,
  ){}
  user = this.authService.getUser()
  windowWidth!:number;
  private resizeSubscription!: Subscription;
  
  ngOnInit(): void {
    if(!this.user && !this.user.is_admin){
      this.router.navigate(['/'])
    }
    if(isPlatformBrowser(this.platFormId)){
      this. resizeSubscription = this.resizeObserverService.resize$.subscribe((width)=>{
        this.windowWidth = width;
        this.cd.detectChanges()
      })
    }
  }
  ngOnDestroy(): void {
    if(this.resizeSubscription){
      this.resizeSubscription.unsubscribe()
    }
  }
}
