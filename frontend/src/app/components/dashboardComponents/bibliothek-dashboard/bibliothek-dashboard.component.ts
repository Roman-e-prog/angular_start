import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable, tap } from 'rxjs';
import { Bibliothek } from '../../../store/reducers/bibliothek.reducer';
import { selectAllBibliothekData, selectBibliothekError, selectBibliothekLoading, selectBibliothekMessage } from '../../../store/selectors/bibliothek.selector';
import { createBibliothek, getAllBibliothek } from '../../../store/actions/bibliothek.actions';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bibliothek-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './bibliothek-dashboard.component.html',
  styleUrl: './bibliothek-dashboard.component.scss'
})
export class BibliothekDashboardComponent {
  constructor(private store: Store, private toastr: ToastrService){}
  allBibliothek$: Observable<Bibliothek[]> = this.store.select(selectAllBibliothekData);
  isLoading$: Observable<boolean> = this.store.select(selectBibliothekLoading);
  isError$: Observable<boolean> = this.store.select(selectBibliothekError);
  message$: Observable<string> = this.store.select(selectBibliothekMessage);
  youtubeUrl = ''
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
    this.store.dispatch(getAllBibliothek())
  }
  bibliothekForm = new FormGroup({
    bibliothek_title: new FormControl('', Validators.required),
    bibliothek_ressort: new FormControl('', Validators.required),
    bibliothek_url: new FormControl('', Validators.required),
  })
  onSubmit = ()=>{
    const {bibliothek_title, bibliothek_ressort, bibliothek_url} = this.bibliothekForm.value
    const bibliothekData = {
      bibliothek_title: bibliothek_title!,
      bibliothek_ressort: bibliothek_ressort!,
      bibliothek_url: bibliothek_url!,
    }
    this.store.dispatch(createBibliothek({bibliothekData: bibliothekData}))
  }
}




