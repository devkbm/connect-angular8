import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormArray
} from '@angular/forms';

import { FormBase, FormType } from 'src/app/common/form/form-base';
import { ResponseObject } from 'src/app/common/model/response-object';
import { AppAlarmService } from 'src/app/common/service/app-alarm.service';
import { AppointmentCodeDetail } from '../../model/appointment-code-detail';
import { ResponseList } from 'src/app/common/model/response-list';
import { LedgerService } from '../../service/ledger.service';
import { Ledger } from '../../model/ledger';
import { LedgerChangeInfo } from '../../model/ledger-change-info';
import { LedgerList } from '../../model/ledger-list';

@Component({
  selector: 'app-ledger-list-form',
  templateUrl: './ledger-list-form.component.html',
  styleUrls: ['./ledger-list-form.component.css']
})
export class LedgerListFormComponent extends FormBase implements OnInit {

  fg: FormGroup;

  formControlXs = 4;
  formLabelXs = 4;
  formControlSm = 4;
  formLabelSm = 4;

  detailFormLabelXs = 4;
  detailFormControlXs = 4;

  constructor(private fb: FormBuilder,
              private ledgerService: LedgerService,
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
      changeInfoList      :  this.fb.array([])
    });
  }

  public modifyForm(formData: LedgerList): void {
    this.formType = FormType.MODIFY;

    this.fg = this.fb.group({
      listId              : [ null, [ Validators.required ] ],
      sequence            : [ null, [ Validators.required ] ],
      empId               : [ null ],
      appointmentCode     : [ null ],
      appointmentFromDate : [ null ],
      appointmentToDate   : [ null ],
      ledgerId            : [ null, [ Validators.required ] ],
      changeInfoList      : this.fb.array([])
    });

    this.fg.patchValue(formData);
  }

  public addChangeInfo(changeInfo: LedgerChangeInfo): void {
    const formArray = this.fg.controls.changeInfoList as FormArray;
    
    formArray.push(this.fb.group({
      id: changeInfo.id,
      changeType: changeInfo.changeType,
      changeTypeDetail: changeInfo.changeTypeDetail,
      changeCode: changeInfo.changeCode,
      sequence: changeInfo.sequence
    }));
  }

  public clearChangeInfo(): void {
    const arr = <FormArray>this.fg.controls.changeInfoList;
    arr.controls = [];
  }

  public getForm(ledgerId: string, listId: string): void {
    const params = {
      ledgerId: ledgerId,
      listId: listId
    };

    this.ledgerService
        .getLedgerList(params)
        .subscribe(
          (model: ResponseObject<LedgerList>) => {
            if ( model.total > 0 ) {
              this.modifyForm(model.data);

              for (const details of model.data.changeInfoList) {
                this.addChangeInfo(details);
              }
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
    this.ledgerService
        .saveLedgerList(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<LedgerList>) => {
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
    this.ledgerService
        .deleteLedgerList(this.fg.get('ledgerId').value, this.fg.get('listId').value)
        .subscribe(
            (model: ResponseObject<LedgerList>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formDeleted.emit(this.fg.getRawValue());
            },
            (err) => {
            console.log(err);
            },
            () => {}
        );
  }

  public getChangeInfo(appointmentCode: string): void {
    
    this.ledgerService
        .getChangeInfo(appointmentCode)
        .subscribe(
          (model: ResponseList<LedgerChangeInfo>) => {
              if (model.total > 0) {
                this.clearChangeInfo();
                for (const details of model.data) {
                  this.addChangeInfo(details);
                }
              } 
              this.appAlarmService.changeMessage(model.message);
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
