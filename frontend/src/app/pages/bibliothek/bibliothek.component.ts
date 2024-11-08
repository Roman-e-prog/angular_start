import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable, tap } from 'rxjs';
import { Bibliothek } from '../../store/reducers/bibliothek.reducer';
import { selectAllBibliothekData, selectBibliothekError, selectBibliothekLoading, selectBibliothekMessage } from '../../store/selectors/bibliothek.selector';
import { getAllBibliothek } from '../../store/actions/bibliothek.actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bibliothek',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bibliothek.component.html',
  styleUrl: './bibliothek.component.scss'
})
export class BibliothekComponent {
  constructor(private store: Store, private toastr: ToastrService){}
  allBlogEntries$: Observable<Bibliothek[]> = this.store.select(selectAllBibliothekData);
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
}


