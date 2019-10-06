import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { AppointmentCodeService } from '../../service/appointment-code.service';
import { AppAlarmService } from 'src/app/common/service/app-alarm.service';

import { AggridFunction } from 'src/app/common/grid/aggrid-function';
import { ResponseList } from 'src/app/common/model/response-list';
import { AppointmentCodeDetail } from '../../model/appointment-code-detail';

@Component({
  selector: 'app-appointment-code-detail-grid',
  templateUrl: './appointment-code-detail-grid.component.html',
  styleUrls: ['./appointment-code-detail-grid.component.css']
})
export class AppointmentCodeDetailGridComponent extends AggridFunction implements OnInit {

  protected gridList: AppointmentCodeDetail[];

  @Input()
  code;

  @Output()
  rowSelected = new EventEmitter();

  @Output()
  rowDoubleClicked = new EventEmitter();

  @Output()
  editButtonClicked = new EventEmitter();

  constructor(private appAlarmService: AppAlarmService,              
              private appointmentCodeService: AppointmentCodeService) {

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
      { headerName: '코드',     field: 'code',        width: 150 },
      { headerName: '변경유형', field: 'changeType',    width: 200 },
      { headerName: '변경유형상세', field: 'changeTypeDetail',    width: 200 },
      { headerName: '순번',     field: 'sequence',    width: 80 }
    ];

    this.defaultColDef = {
      sortable: true,
      resizable: true
    };

    this.getRowNodeId = function(data) {
        return data.code + data.changeType + data.changeTypeDetail;
    };
  }

  ngOnInit() {
    this.getGridList();
  }

  private onEditButtonClick(e) {
    this.editButtonClicked.emit(e.rowData);
  }

  public getGridList(params?: any): void {
    this.appointmentCodeService
        .getAppointmentCodeDetailList(params)
        .subscribe(
          (model: ResponseList<AppointmentCodeDetail>) => {
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

  private selectionChanged(event) {
    const selectedRows = this.gridApi.getSelectedRows();

    this.rowSelected.emit(selectedRows[0]);
  }

  private rowDbClicked(event) {
    this.rowDoubleClicked.emit(event.data);
  }

}