import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Bibliothek } from '../../../../store/reducers/bibliothek.reducer';
import { updateBibliothek } from '../../../../store/actions/bibliothek.actions';

@Component({
  selector: 'app-bibliothek-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './bibliothek-edit.component.html',
  styleUrl: './bibliothek-edit.component.scss'
})
export class BibliothekEditComponent implements OnInit{
  constructor(private store: Store){}
  @Input() editData: Bibliothek | null = null;
  @Output() closeEdit = new EventEmitter();

  handleClose = ()=>{
    this.closeEdit.emit();
  }
  ngOnInit(): void {
    this.bibliothekEditForm.get('bibliothek_title')?.setValue(this.editData?.bibliothek_title!)
    this.bibliothekEditForm.get('bibliothek_ressort')?.setValue(this.editData?.bibliothek_ressort!)
    this.bibliothekEditForm.get('bibliothek_url')?.setValue(this.editData?.bibliothek_url!)
  }

  bibliothekEditForm = new FormGroup({
    bibliothek_title: new FormControl('', Validators.required),
    bibliothek_ressort: new FormControl('', Validators.required),
    bibliothek_url: new FormControl('', Validators.required)
  })
  onSubmit = ()=>{
    if(this.bibliothekEditForm.valid){
      const {bibliothek_title, bibliothek_ressort, bibliothek_url} = this.bibliothekEditForm.value;

      const bibliothekData = {
        bibliothek_title: bibliothek_title!,
        bibliothek_ressort: bibliothek_ressort!,
        bibliothek_url: bibliothek_url!,
      }
      this.store.dispatch(updateBibliothek({id: this.editData?.id!, bibliothekData: bibliothekData}))
      this.closeEdit.emit();
    }
  }
}
