import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, switchMap, tap } from 'rxjs';
import { Uebermich } from '../../store/reducers/uebermich.reducer';
import { selectAllUebermichData, selectUebermichError, selectUebermichLoading, selectUebermichMessage } from '../../store/selectors/uebermich.selectors';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { getAllUebermich } from '../../store/actions/uebermich.actions';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-uebermich',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './uebermich.component.html',
  styleUrl: './uebermich.component.scss'
})
export class UebermichComponent implements OnInit{
  constructor(private store: Store, private toastr: ToastrService){}
  allUebermich$: Observable<Uebermich[]> = this.store.select(selectAllUebermichData);
  isLoading$: Observable<boolean> = this.store.select(selectUebermichLoading);
  isError$: Observable<boolean> = this.store.select(selectUebermichError);
  message$: Observable<string> = this.store.select(selectUebermichMessage);

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
    this.store.dispatch(getAllUebermich())
  }
}
