import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Uebermich } from '../../../../store/reducers/uebermich.reducer';
import { updateUebermich } from '../../../../store/actions/uebermich.actions';

@Component({
  selector: 'app-uebermich-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './uebermich-edit.component.html',
  styleUrl: './uebermich-edit.component.scss'
})
export class UebermichEditComponent  implements OnInit{
  constructor(private store: Store){}
  @Input() editData: Uebermich | null = null;
  @Output() closeEdit = new EventEmitter();
  handleClose = ()=>{
    this.closeEdit.emit();
  }
  ngOnInit(): void {
    this.editUebermichForm.get('my_person')?.setValue(this.editData!.my_person!)
  }
  editUebermichForm = new FormGroup({
    my_person: new FormControl('', Validators.required)
  })
  
  // ngOnChanges(changes: SimpleChanges): void {
  //   if(changes['editData'] && changes['editData'].currentValue !== changes['editData'].previousValue){
  //     this.editUebermichForm.get('my_person')?.setValue(this.editData?.my_person!)
  //   }
  // }
  onSubmit = ()=>{
    if(this.editUebermichForm.valid){
        const my_person = this.editUebermichForm!.value.my_person as string
      const uebermichData = {
        id: this.editData!.id!, 
        my_person: my_person
      }
        this.store.dispatch(updateUebermich({uebermichData: uebermichData}))
        this.closeEdit.emit();
    }
  }
}
