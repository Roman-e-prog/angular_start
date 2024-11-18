import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable, tap } from 'rxjs';
import { Bibliothek } from '../../../store/reducers/bibliothek.reducer';
import { selectAllBibliothekData, selectBibliothekError, selectBibliothekLoading, selectBibliothekMessage } from '../../../store/selectors/bibliothek.selector';
import { createBibliothek, deleteBibliothek, getAllBibliothek } from '../../../store/actions/bibliothek.actions';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {matEditOutline, matDeleteOutline} from '@ng-icons/material-icons/outline'
import { NgIconsModule } from '@ng-icons/core';
import { BibliothekEditComponent } from '../editForms/bibliothek-edit/bibliothek-edit.component';
@Component({
  selector: 'app-bibliothek-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIconsModule, BibliothekEditComponent],
  templateUrl: './bibliothek-dashboard.component.html',
  styleUrl: './bibliothek-dashboard.component.scss'
})
export class BibliothekDashboardComponent {
  constructor(
              private store: Store, 
              private toastr: ToastrService, 
              private sanitizer: DomSanitizer
  ){}
  allBibliothek$: Observable<Bibliothek[]> = this.store.select(selectAllBibliothekData);
  isLoading$: Observable<boolean> = this.store.select(selectBibliothekLoading);
  isError$: Observable<boolean> = this.store.select(selectBibliothekError);
  message$: Observable<string> = this.store.select(selectBibliothekMessage);
  youtubeUrl = 'https://www.youtube.com/embed/'
  getSafeUrl(bibliothekUrl: string){
    const videoId = bibliothekUrl.split('=')[1];
    const embedUrl = this.youtubeUrl + videoId;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }
  
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
    this.bibliothekForm.reset()
  }
  //edit & delete
  handleDelete = (id:number)=>{
    console.log('here delete')
    this.store.dispatch(deleteBibliothek({id: id}))
  }
  editModule = false;
  editData: Bibliothek | null = null
  handleEdit = (bibliothek: Bibliothek)=>{
    this.editModule = true;
    this.editData = bibliothek;
  }
  handleClose = ()=>{
    this.editModule = false;
  }
}




