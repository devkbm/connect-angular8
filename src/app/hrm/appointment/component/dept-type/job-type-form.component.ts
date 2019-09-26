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

import { DeptType } from '../../model/dept-type';
import { JobTypeService } from '../../service/job-type.service';
import { JobType } from '../../model/job-type';

@Component({
  selector: 'app-job-type-form',
  templateUrl: './job-type-form.component.html',
  styleUrls: ['./job-type-form.component.css']
})
export class JobTypeFormComponent extends FormBase implements OnInit {

  fg: FormGroup;

  constructor(private fb:FormBuilder,
              private jobTypeService: JobTypeService,
              private appAlarmService: AppAlarmService) { super(); }

  ngOnInit() {
    this.newForm();
  }  

  public newForm(): void {
    this.formType = FormType.NEW;

    this.fg = this.fb.group({
      id        : [ null, [ Validators.required ] ], //new FormControl(fkBoard, {validators: Validators.required}),
      code      : [ null, [ Validators.required ] ],
      codeName  : [ null, [ Validators.required ] ],
      useYn     : [ null],
      sequence  : [ null],
      comment   : [ null]
    });
  }

  public modifyForm(formData: DeptType): void {
    this.formType = FormType.MODIFY;

    this.fg = this.fb.group({
      id        : [ null, [ Validators.required ] ], //new FormControl(fkBoard, {validators: Validators.required}),
      code      : [ null, [ Validators.required ] ],
      codeName  : [ null, [ Validators.required ] ],
      useYn     : [ null],
      sequence  : [ null],
      comment   : [ null]
    });

    this.fg.patchValue(formData);
  }

  public select(param) {    
    this.getJobType(param.value['code']);
  }

  public getJobType(id: string): void {
    this.jobTypeService
        .getJobType(id)
        .subscribe(
          (model: ResponseObject<JobType>) => {
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
    this.jobTypeService
        .saveJobType(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<JobType>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.fg.getRawValue());
          },
          (err) => {
            console.log(err);
          },
          () => {}
        );
  }

  public deleteJobType(): void {
    this.jobTypeService
        .deleteJobType(this.fg.get('code').value)
        .subscribe(
            (model: ResponseObject<JobType>) => {
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

