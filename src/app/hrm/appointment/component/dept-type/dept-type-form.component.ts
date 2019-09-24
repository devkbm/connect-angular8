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

import { DeptTypeService } from '../../service/dept-type.service';
import { DeptType } from '../../model/dept-type';

@Component({
  selector: 'app-dept-type-form',
  templateUrl: './dept-type-form.component.html',
  styleUrls: ['./dept-type-form.component.css']
})
export class DeptTypeFormComponent extends FormBase implements OnInit {

  fg: FormGroup;

  constructor(private fb:FormBuilder,
              private deptTypeService: DeptTypeService,
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

  public getDeptType(id: string): void {
    this.deptTypeService
        .getDeptType(id)
        .subscribe(
          (model: ResponseObject<DeptType>) => {
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

  public submitForm() {
    this.deptTypeService
        .saveDeptType(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<DeptType>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.fg.getRawValue());
          },
          (err) => {
            console.log(err);
          },
          () => {}
        );
  }

  public closeForm() {
    //this.formClosed.emit(this.fg.getRawValue());
  }
}
