import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { LedgerService } from '../../service/ledger.service';
import { AppAlarmService } from 'src/app/common/service/app-alarm.service';

import { AggridFunction } from 'src/app/common/grid/aggrid-function';
import { ResponseList } from 'src/app/common/model/response-list';
import { Ledger } from '../../model/ledger';


@Component({
  selector: 'app-ledger-grid',
  templateUrl: './ledger-grid.component.html',
  styleUrls: ['./ledger-grid.component.css']
})
export class LedgerGridComponent extends AggridFunction implements OnInit {

  protected gridList: Ledger[];

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
      { headerName: '코드',     field: 'code',        width: 150 },
      { headerName: '코드명',   field: 'codeName',    width: 200 },
      {
        headerName: '사용여부',
        field: 'useYn',
        width: 80,
        cellStyle: {'text-align': 'center', padding: '0px'},
        cellRenderer: 'checkboxRenderer',
        cellRendererParams: {
          label: '',
          disabled: true
        }
      },
      { headerName: '순번',     field: 'sequence',    width: 80 },      
      { headerName: '설명',     field: 'comment',     width: 300 }
    ];

    this.defaultColDef = {
      sortable: true,
      resizable: true
    };

    this.getRowNodeId = function(data) {
        return data.code;
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
        .getLedgers(params)
        .subscribe(
          (model: ResponseList<Ledger>) => {
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


