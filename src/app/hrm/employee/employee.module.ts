import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonFuncModule } from 'src/app/common/common-func.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AgGridModule } from 'ag-grid-angular';

import { ButtonRendererComponent } from 'src/app/common/grid/renderer/button-renderer.component';
import { CheckboxRendererComponent } from 'src/app/common/grid/renderer/checkbox-renderer.component';

import { EmployeeFormComponent } from './component/basic-info/employee-form.component';
import { DeptChangeHistoryGridComponent } from './component/basic-info/dept-change-history-grid.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonFuncModule,
    NgZorroAntdModule,    
    AgGridModule.withComponents([ButtonRendererComponent, CheckboxRendererComponent])
  ],
  declarations: [
    EmployeeFormComponent,
    DeptChangeHistoryGridComponent
  ],
  providers: [
  ],
  exports: [
    EmployeeFormComponent
  ]
})
export class EmployeeModule { }
