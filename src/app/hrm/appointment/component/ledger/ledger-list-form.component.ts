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
import { ResponseList } from 'src/app/common/model/response-list';
import { LedgerService } from '../../service/ledger.service';
import { LedgerChangeInfo } from '../../model/ledger-change-info';
import { LedgerList } from '../../model/ledger-list';
import { AppointmentCodeService } from '../../service/appointment-code.service';
import { AppointmentCode } from '../../model/appointment-code';

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
  detailFormControlXs = 20;
  detailFormLabelSm = 3;
  detailFormControlSm = 21;

  appointmentCodeList;

  constructor(private fb: FormBuilder,
              private ledgerService: LedgerService,
              private appointmentCodeService: AppointmentCodeService,
              private appAlarmService: AppAlarmService) { super(); }

  ngOnInit() {
    this.getAppointmentCodeList();
    
    this.newForm(null);
  }

  private createForm(ledgerId: string): FormGroup {
    return this.fb.group({            
              listId              : [ null, [ Validators.required ] ],
              sequence            : [ null, [ Validators.required ] ],
              empId               : [ null ],
              appointmentCode     : [ null ],
              appointmentFromDate : [ null ],
              appointmentToDate   : [ null ],
              ledgerId            : [ ledgerId, [ Validators.required ] ],
              changeInfoList      :  this.fb.array([])
           });
  }

  public newForm(ledgerId: string): void {
    this.formType = FormType.NEW;

    this.fg = this.createForm(ledgerId);
  }

  public modifyForm(formData: LedgerList): void {
    this.formType = FormType.MODIFY;

    this.fg = this.createForm(null);
    this.fg.patchValue(formData);
  }

  public addChangeInfo(changeInfo: LedgerChangeInfo): void {
    const formArray = this.fg.controls.changeInfoList as FormArray;
    
    formArray.push(this.fb.group({
      id: changeInfo.id,
      changeType: new FormControl({value: changeInfo.changeType, disabled:true}),
      changeTypeDetail: new FormControl({value: changeInfo.changeTypeDetail, disabled:true}),
      changeCode: changeInfo.changeCode,
      sequence: changeInfo.sequence
    }));
  }

  public clearChangeInfo(): void {
    const arr = <FormArray>this.fg.controls.changeInfoList;
    arr.controls = [];
  }

  public getForm(ledgerId: string, listId: string): void {    

    this.ledgerService
        .getLedgerList(ledgerId, listId)
        .subscribe(
          (model: ResponseObject<LedgerList>) => {
            this.clearChangeInfo();
            if ( model.total > 0 ) {              
              this.modifyForm(model.data);

              for (const details of model.data.changeInfoList) {
                this.addChangeInfo(details);
              }
            } else {
              this.newForm(null);
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

  public getAppointmentCodeList(): void {
    this.appointmentCodeService
        .getAppointmentCodeList()
        .subscribe(
          (model: ResponseList<AppointmentCode>) => {
              if (model.total > 0) {
                console.log(model.data);
                this.appointmentCodeList = model.data;
              } 
              this.appAlarmService.changeMessage(model.message);
          },
          (err) => {
              console.log(err);
          },
          () => {}
        );
  }

  public appointmentCodeChanged(appointmentCode): void {    
    this.getChangeInfo(appointmentCode);
  }

  public closeForm() {
    this.formClosed.emit(this.fg.getRawValue());
  }

}
