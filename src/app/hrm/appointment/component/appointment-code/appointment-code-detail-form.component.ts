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
import { AppointmentCodeService } from '../../service/appointment-code.service';
import { AppointmentCodeDetail } from '../../model/appointment-code-detail';

@Component({
  selector: 'app-appointment-code-detail-form',
  templateUrl: './appointment-code-detail-form.component.html',
  styleUrls: ['./appointment-code-detail-form.component.css']
})
export class AppointmentCodeDetailFormComponent  extends FormBase implements OnInit {

  fg: FormGroup;

  constructor(private fb:FormBuilder,
              private appointmentCodeService: AppointmentCodeService,
              private appAlarmService: AppAlarmService) { super(); }

  ngOnInit() {
    this.newForm();
  }  

  public newForm(): void {
    this.formType = FormType.NEW;

    this.fg = this.fb.group({      
      code              : [ null, [ Validators.required ] ],
      changeType        : [ null, [ Validators.required ] ],
      changeTypeDetail  : [ null],
      sequence          : [ null]
    });
  }

  public modifyForm(formData: AppointmentCodeDetail): void {
    this.formType = FormType.MODIFY;

    this.fg = this.fb.group({      
      code              : [ null, [ Validators.required ] ],
      changeType        : [ null, [ Validators.required ] ],
      changeTypeDetail  : [ null],
      sequence          : [ null]
    });

    this.fg.patchValue(formData);
  }

  public getForm(): void {
    const id = this.fg.get('code').value;
    const detailId = this.fg.get('code').value + this.fg.get('changeType').value + this.fg.get('changeTypeDetail').value;

    this.appointmentCodeService
        .getAppointmentCodeDetail(id, detailId)
        .subscribe(
          (model: ResponseObject<AppointmentCodeDetail>) => {
            if ( model.total > 0 ) {
              console.log(model.data);
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
    this.appointmentCodeService
        .saveAppointmentCodeDetail(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<AppointmentCodeDetail>) => {
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
    this.appointmentCodeService
        .deleteAppointmentCodeDetail(this.fg.get('code').value)
        .subscribe(
            (model: ResponseObject<AppointmentCodeDetail>) => {
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