import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonFuncModule } from 'src/app/common/common-func.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AgGridModule } from 'ag-grid-angular';

import { ButtonRendererComponent } from 'src/app/common/grid/renderer/button-renderer.component';
import { CheckboxRendererComponent } from 'src/app/common/grid/renderer/checkbox-renderer.component';

import { DeptTypeComponent } from './component/dept-type/dept-type.component';
import { DeptTypeFormComponent } from './component/dept-type/dept-type-form.component';
import { DeptTypeService } from './service/dept-type.service';
import { JobTypeFormComponent } from './component/dept-type/job-type-form.component';
import { JobTypeService } from './service/job-type.service';
import { AppointmentCodeComponent } from './component/appointment-code/appointment-code.component';
import { AppointmentCodeFormComponent } from './component/appointment-code/appointment-code-form.component';
import { AppointmentCodeService } from './service/appointment-code.service';
import { AppointmentCodeDetailFormComponent } from './component/appointment-code/appointment-code-detail-form.component';
import { AppointmentCodeGridComponent } from './component/appointment-code/appointment-code-grid.component';
import { AppointmentCodeDetailGridComponent } from './component/appointment-code/appointment-code-detail-grid.component';
import { LedgerFormComponent } from './component/ledger/ledger-form.component';
import { LedgerComponent } from './component/ledger/ledger.component';
import { LedgerService } from './service/ledger.service';
import { LedgerListFormComponent } from './component/ledger/ledger-list-form.component';
import { LedgerListDetailGridComponent } from './component/ledger/ledger-list-detail-grid.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonFuncModule,
    NgZorroAntdModule,    
    AgGridModule.withComponents([ButtonRendererComponent, CheckboxRendererComponent]),
  ],
  declarations: [
    DeptTypeComponent,
    DeptTypeFormComponent,
    JobTypeFormComponent,
    
    AppointmentCodeComponent,
    AppointmentCodeFormComponent,
    AppointmentCodeGridComponent,
    AppointmentCodeDetailFormComponent,
    AppointmentCodeDetailGridComponent,

    LedgerFormComponent,
    LedgerListFormComponent,
    LedgerListDetailGridComponent,
    LedgerComponent
  ],
  providers: [
    DeptTypeService,
    JobTypeService,
    AppointmentCodeService,
    LedgerService
  ],
  exports: [
    DeptTypeComponent,
    AppointmentCodeComponent,
    LedgerComponent
  ]
})
export class AppointmentModule { }
