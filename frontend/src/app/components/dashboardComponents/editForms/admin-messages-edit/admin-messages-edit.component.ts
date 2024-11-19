import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminMessage } from '../../../../store/reducers/adminMessage.reducer';
import { Store } from '@ngrx/store';
import { updateAdminMessage } from '../../../../store/actions/adminmessage.actions';
export interface UpdateData{
  message:string,
}
@Component({
  selector: 'app-admin-messages-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-messages-edit.component.html',
  styleUrl: './admin-messages-edit.component.scss'
})
export class AdminMessagesEditComponent implements OnInit{
  @Input() editData: AdminMessage | null = null;
  @Output() closeEdit = new EventEmitter();
  constructor(
    private store: Store
  ){}
  handleClose = ()=>{
    this.closeEdit.emit()
  }
  ngOnInit(): void {
    if(this.editData){
      this.editAdminMessageForm.get('message')?.setValue(this.editData.message)
    }
  }
  editAdminMessageForm = new FormGroup({
    message: new FormControl('', Validators.required)
  })
  onSubmit = ()=>{
    const {message} = this.editAdminMessageForm.value
    const updateData:UpdateData = {
      message:message!
    }
    this.store.dispatch(updateAdminMessage({adminMessageData: updateData, id: this.editData!.id!}))
    this.closeEdit.emit();
  }
}
