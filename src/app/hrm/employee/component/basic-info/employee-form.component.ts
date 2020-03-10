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
import { EmployeeService } from '../../service/employee.service';
import { Employee } from '../../model/employee';
import { ResponseList } from 'src/app/common/model/response-list';
import { NewEmployee } from '../../model/new-employee';
import { GlobalProperty } from 'src/app/global-property';
import { UploadFile } from 'ng-zorro-antd';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent extends FormBase implements OnInit {

  fg: FormGroup;  
  formModel: Employee;  
  imageUrl;
  imageUploadParam;

  constructor(private fb:FormBuilder,
              private employeeService: EmployeeService,
              private appAlarmService: AppAlarmService) { super(); }

  ngOnInit() {    
    this.newForm();
  }  

  public newForm(): void {
    this.formModel = new Employee();
    this.formType = FormType.NEW;

    this.fg = this.fb.group({      
      id                          : [ null, [ Validators.required ] ],
      name                        : [ null, [ Validators.required ] ],
      nameEng                     : [ null ],
      nameChi                     : [ null ],
      residentRegistrationNumber  : [ null ],
      gender                      : [ null ],
      birthday                    : [ null ],
      workCondition               : [ null ],
      imagePath                   : [ null ]
    });
  }

  public modifyForm(formData: Employee): void {
    this.formModel = formData;
    this.formType = FormType.MODIFY;

    this.fg = this.fb.group({      
      id                          : [ null, [ Validators.required ] ],
      name                        : [ null, [ Validators.required ] ],
      nameEng                     : [ null ],
      nameChi                     : [ null ],
      residentRegistrationNumber  : [ null ],
      gender                      : [ null ],
      birthday                    : [ null ],
      workCondition               : [ null ],
      imagePath                   : [ null ]
    });
    
    this.fg.patchValue(formData);

    this.imageUrl = GlobalProperty.serverUrl + '/static/' + this.fg.get('imagePath').value;
  }
  
  public getForm(empId: string): void {
    //const empId = this.fg.get('id').value;    
    
    this.employeeService
        .getEmployee(empId)
        .subscribe(
          (model: ResponseObject<Employee>) => {
            if ( model.total > 0 ) {                            
              this.modifyForm(model.data);

              this.imageUploadParam = {employeeId: model.data.id};
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
    this.employeeService
        .saveEmployee(this.fg.getRawValue())        
        .subscribe(
          (model: ResponseObject<NewEmployee>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.fg.getRawValue());
          },
          (err) => {
            console.log(err);
          },
          () => {}
        );
  }

  public newEmployee(): void {
    let obj = new NewEmployee();
    obj.name = this.fg.get('name').value;
    obj.residentRegistrationNumber = this.fg.get('residentRegistrationNumber').value;

    this.employeeService
        .createEmployee(obj)        
        .subscribe(
          (model: ResponseObject<NewEmployee>) => {
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
    /*this.appointmentCodeService
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
        );*/
  }

  public closeForm() {
    this.formClosed.emit(this.fg.getRawValue());
  }

  handleChange(info: { file: UploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        //this.loading = true;
        break;
      case 'done':        
        console.log('image upload done');
        this.getForm(this.fg.get('id').value);
        // Get this url from response in real world.
        /*
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
          this.avatarUrl = img;
        });*/

        break;
      case 'error':
        //this.msg.error('Network error');
        //this.loading = false;
        break;
    }
  }

  public downloadImage(): void {

    this.employeeService
        .downloadEmployeeImage(this.fg.get('id').value)        
        .subscribe(
          (model: Blob) => {
            //this.appAlarmService.changeMessage(model.message);                                          
            const blob = new Blob([model], { type: 'application/octet-stream' });            
            saveAs(blob, this.fg.get('id').value+".jpg");            

          },
          (err) => {
            console.log(err);
          },
          () => {}
        );    
  }
  
}
