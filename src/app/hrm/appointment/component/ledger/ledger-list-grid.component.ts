import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { LedgerService } from '../../service/ledger.service';
import { AppAlarmService } from 'src/app/common/service/app-alarm.service';

import { AggridFunction } from 'src/app/common/grid/aggrid-function';
import { ResponseList } from 'src/app/common/model/response-list';
import { LedgerList } from '../../model/ledger-list';

@Component({
  selector: 'app-ledger-list-grid',
  templateUrl: './ledger-list-grid.component.html',
  styleUrls: ['./ledger-list-grid.component.css']
})
export class LedgerListGridComponent extends AggridFunction implements OnInit {

  protected gridList: LedgerList[];

  @Output()
  rowSelected = new EventEmitter();

  @Output()
  rowDoubleClicked = new EventEmitter();

  @Output()
  editButtonClicked = new EventEmitter();

  constructor(private appAlarmService: AppAlarmService,              
              private ledgerService: LedgerService) {

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
      { headerName: '식별자',       field: 'listId',              width: 150 },
      { headerName: '순번',         field: 'sequence',            width: 150 },
      { headerName: '직원번호',     field: 'empId',               width: 150 },
      { headerName: '발령코드',     field: 'appointmentCode',     width: 200 },
      { headerName: '발령일',       field: 'appointmentFromDate', width: 200 },
      { headerName: '발령종료일',   field: 'appointmentToDate',   width: 200 }
    ];

    this.defaultColDef = {
      sortable: true,
      resizable: true
    };

    this.getRowNodeId = function(data) {
        return data.listId;
    };
  }

  ngOnInit() {
    this.getGridList();
  }

  private onEditButtonClick(e) {
    this.editButtonClicked.emit(e.rowData);
  }

  public getGridList(params?: any): void {
    this.ledgerService
        .getLedgerLists(params)
        .subscribe(
          (model: ResponseList<LedgerList>) => {
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


