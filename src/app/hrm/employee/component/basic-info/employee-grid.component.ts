import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { AppAlarmService } from 'src/app/common/service/app-alarm.service';
import { AggridFunction } from 'src/app/common/grid/aggrid-function';
import { ResponseList } from 'src/app/common/model/response-list';
import { Employee } from '../../model/Employee';
import { EmployeeService } from '../../service/employee.service';
import { SearchEmployee } from '../../model/search-employee';

@Component({
  selector: 'app-employee-grid',
  templateUrl: './employee-grid.component.html',
  styleUrls: ['./employee-grid.component.css']
})
export class EmployeeGridComponent extends AggridFunction implements OnInit {

  @Input()
  gridList: Employee[];

  @Output()
  rowSelected = new EventEmitter();

  @Output()
  rowDoubleClicked = new EventEmitter();

  @Output()
  editButtonClicked = new EventEmitter();

  constructor(private employeeService: EmployeeService,
              private appAlarmService: AppAlarmService) {

    super();

    this.columnDefs = [
      {
        headerName: '',
        width: 34,
        cellStyle: {'text-align': 'center', 'padding': '0px'},
        cellRenderer: 'buttonRenderer',
        cellRendererParams: {
          onClick: this.onEditButtonClick.bind(this),
          label: '',
          iconType: 'form'
        }
      },
      {
        headerName: 'No',
        valueGetter: 'node.rowIndex + 1',
        width: 70,
        cellStyle: {'text-align': 'center'}
      },
      { headerName: '사번',     field: 'id',      width: 150 },
      { headerName: '이름',     field: 'name',    width: 150 },
      { headerName: '주민번호', field: 'residentRegistrationNumber',    width: 150 },
      { headerName: '생일',     field: 'birthday',    width: 150 }
    ];

    this.defaultColDef = {
      sortable: true,
      resizable: true
    };

    this.getRowNodeId = function(data) {
        return data.id;
    };
  }

  ngOnInit() {
    //this.setWidthAndHeight('100%','500px');

    const param = new SearchEmployee('');
    this.getGridList(param);
  }

  private onEditButtonClick(e) {
    this.editButtonClicked.emit(e.rowData);
  }

  private selectionChanged(event) {
    const selectedRows = this.gridApi.getSelectedRows();

    this.rowSelected.emit(selectedRows[0]);
  }

  private rowDbClicked(event) {
    this.rowDoubleClicked.emit(event.data);
  }  

  public getGridList(params?: SearchEmployee): void {

    this.employeeService
        .getEmployeeList(params)
        .subscribe(
          (model: ResponseList<Employee>) => {
              if (model.total > 0) {
                  this.gridList = model.data;
              } else {
                  this.gridList = null;
              }
              this.appAlarmService.changeMessage(model.message);
          },
          (err) => {
              console.log(err);
          },
          () => {}
        );
  }

}
