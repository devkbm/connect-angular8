import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { FormBase, FormType } from 'src/app/common/form/form-base';
import { ResponseObject } from 'src/app/common/model/response-object';
import { AppAlarmService } from 'src/app/common/service/app-alarm.service';
import { AppointmentCodeDetail } from '../../model/appointment-code-detail';
import { ResponseList } from 'src/app/common/model/response-list';
import { LegderService } from '../../service/ledger.service';
import { Ledger } from '../../model/ledger';

@Component({
  selector: 'app-ledger-list-form',
  templateUrl: './ledger-list-form.component.html',
  styleUrls: ['./ledger-list-form.component.css']
})
export class LedgerListFormComponent extends FormBase implements OnInit {

  fg: FormGroup;

  constructor(private fb:FormBuilder,
              private legderService: LegderService,
              private appAlarmService: AppAlarmService) { super(); }

  ngOnInit() {  
    this.newForm();
  }  

  public newForm(): void {
    this.formType = FormType.NEW;

    this.fg = this.fb.group({      
      listId              : [ null, [ Validators.required ] ],
      sequence            : [ null, [ Validators.required ] ],
      empId               : [ null ],
      appointmentCode     : [ null ],
      appointmentFromDate : [ null ],
      appointmentToDate   : [ null ],
      ledgerId            : [ null, [ Validators.required ] ],
    });
  }

  public modifyForm(formData: Ledger): void {
    this.formType = FormType.MODIFY;

    this.fg = this.fb.group({      
      listId              : [ null, [ Validators.required ] ],
      sequence            : [ null, [ Validators.required ] ],
      empId               : [ null ],
      appointmentCode     : [ null ],
      appointmentFromDate : [ null ],
      appointmentToDate   : [ null ],
      ledgerId            : [ null, [ Validators.required ] ],
    });

    this.fg.patchValue(formData);
  }

  public getForm(ledgerId: string): void {        
    this.legderService
        .getLedger(ledgerId)
        .subscribe(
          (model: ResponseObject<Ledger>) => {
            if ( model.total > 0 ) {              
              this.modifyForm(model.data);
            } else {
              this.newForm();
            }
            this.appAlarmService.changeMessage(model.message);
          },
          (err) => {
            console.log(err);
          },
          () => {}
      );
  }

  public submitForm(): void {
    this.legderService
        .saveLedger(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<Ledger>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.fg.getRawValue());
          },
          (err) => {
            console.log(err);
          },
          () => {}
        );
  }

  public deleteForm(): void {
    this.legderService
        .deleteLedger(this.fg.get('ledgerId').value)
        .subscribe(
            (model: ResponseObject<Ledger>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formDeleted.emit(this.fg.getRawValue());
            },
            (err) => {
            console.log(err);
            },
            () => {}
        );
  }

  public closeForm() {
    this.formClosed.emit(this.fg.getRawValue());
  }

}
