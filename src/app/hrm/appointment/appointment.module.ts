import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonFuncModule } from 'src/app/common/common-func.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AgGridModule } from 'ag-grid-angular';

import { ButtonRendererComponent } from 'src/app/common/grid/renderer/button-renderer.component';
import { DeptTypeComponent } from './component/dept-type/dept-type.component';
import { DeptTypeFormComponent } from './component/dept-type/dept-type-form.component';
import { DeptTypeService } from './service/dept-type.service';
import { JobTypeFormComponent } from './component/dept-type/job-type-form.component';
import { JobTypeService } from './service/job-type.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonFuncModule,
    NgZorroAntdModule,
    AgGridModule.withComponents([ButtonRendererComponent])
  ],
  declarations: [
    DeptTypeComponent,
    DeptTypeFormComponent,
    JobTypeFormComponent
  ],
  providers: [
    DeptTypeService,
    JobTypeService
  ],
  exports: [
    DeptTypeComponent
  ]
})
export class AppointmentModule { }
