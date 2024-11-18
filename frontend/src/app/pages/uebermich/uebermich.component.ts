import { Component, OnDestroy, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, switchMap, tap } from 'rxjs';
import { Uebermich } from '../../store/reducers/uebermich.reducer';
import { selectAllUebermichData, selectUebermichError, selectUebermichLoading, selectUebermichMessage } from '../../store/selectors/uebermich.selectors';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { getAllUebermich } from '../../store/actions/uebermich.actions';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { MobileNavbarComponent } from '../../components/mobile-navbar/mobile-navbar.component';
import { isPlatformBrowser } from '@angular/common';
import { ResizeObserverService } from '../../services_interceptors/resize.service';
@Component({
  selector: 'app-uebermich',
  standalone: true,
  imports: [CommonModule, NavbarComponent, MobileNavbarComponent],
  templateUrl: './uebermich.component.html',
  styleUrl: './uebermich.component.scss'
})
export class UebermichComponent implements OnInit, OnDestroy{
  constructor(
                private store: Store, 
                private toastr: ToastrService,
                private resizeObserverService: ResizeObserverService,
                private cd: ChangeDetectorRef,
                @Inject(PLATFORM_ID) private platformId: Object
              ){}
  allUebermich$: Observable<Uebermich[]> = this.store.select(selectAllUebermichData);
  isLoading$: Observable<boolean> = this.store.select(selectUebermichLoading);
  isError$: Observable<boolean> = this.store.select(selectUebermichError);
  message$: Observable<string> = this.store.select(selectUebermichMessage);

  windowWidth!: number;
  private resizeSubscription!: Subscription;
  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)){
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
    this.store.dispatch(getAllUebermich())
  }
  ngOnDestroy(): void {
    if(this.resizeSubscription){
      this.resizeSubscription.unsubscribe()
    }
  }
}
