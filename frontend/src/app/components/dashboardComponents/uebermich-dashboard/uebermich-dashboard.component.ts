import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable, tap } from 'rxjs';
import { Uebermich } from '../../../store/reducers/uebermich.reducer';
import { selectAllUebermichData, selectUebermichError, selectUebermichLoading, selectUebermichMessage } from '../../../store/selectors/uebermich.selectors';
import { createUebermich, deleteUebermich, getAllUebermich } from '../../../store/actions/uebermich.actions';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { matEditOutline, matDeleteOutline } from '@ng-icons/material-icons/outline';
import { NgIconsModule } from '@ng-icons/core';
import { UebermichEditComponent } from '../editForms/uebermich-edit/uebermich-edit.component';
@Component({
  selector: 'app-uebermich-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIconsModule, UebermichEditComponent],
  templateUrl: './uebermich-dashboard.component.html',
  styleUrl: './uebermich-dashboard.component.scss'
})
export class UebermichDashboardComponent {
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
  uebermichForm = new FormGroup({
    my_person: new FormControl('', Validators.required),
  }) 
  onSubmit = ()=>{
    const {my_person} = this.uebermichForm.value
    const uebermichData = {
      my_person: my_person!
    }
    this.store.dispatch(createUebermich({uebermichData: uebermichData}))
    this.uebermichForm.reset()
  }
  // edit und delete
  editModule = false
  editData: Uebermich | null = null;
  handleEdit = (uebermich: Uebermich)=>{
    this.editModule = true;
    this.editData = uebermich
  }
  handleClose = ()=>{
    this.editModule = false;
  }
  handleDelete = (id: number)=>{
    this.store.dispatch(deleteUebermich({id: id}))
  }
}
