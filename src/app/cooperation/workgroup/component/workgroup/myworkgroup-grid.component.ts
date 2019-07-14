import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AggridFunction } from 'src/app/common/grid/aggrid-function';
import { AppAlarmService } from 'src/app/common/service/app-alarm.service';
import { ResponseList } from 'src/app/common/model/response-list';

import { WorkGroupService } from '../../service/workgroup.service';
import { WorkGroup } from '../../model/workgroup';


@Component({
  selector: 'app-myworkgroup-grid',
  templateUrl: './myworkgroup-grid.component.html',
  styleUrls: ['./myworkgroup-grid.component.css']
})
export class MyWorkGroupGridComponent extends AggridFunction implements OnInit {

  workGroupList: WorkGroup[];

  @Output()
  rowSelected = new EventEmitter();

  @Output()
  rowDoubleClicked = new EventEmitter();

  @Output()
  editButtonClicked = new EventEmitter();

  constructor(private appAlarmService: AppAlarmService,
              private workGroupService: WorkGroupService) {
    super();

    this.columnDefs = [
      {
          headerName: 'No',
          valueGetter: 'node.rowIndex + 1',
          width: 70,
          cellStyle: {'text-align': 'center'},
          suppressSizeToFit: true
      },
      {
          headerName: 'Id',
          field: 'id'
      },
      {
        headerName: '작업그룹명',
        field: 'name'
      }
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
    this.sizeToFit();
  }

  public getMyWorkGroupList(): void {
    this.workGroupService
        .getMyWorkGroupList()
        .subscribe(
          (model: ResponseList<WorkGroup>) => {
              if (model.total > 0) {
                  this.workGroupList = model.data;
              } else {
                  this.workGroupList = null;
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
    console.log(selectedRows[0]);
    this.rowSelected.emit(selectedRows[0]);
  }

  private rowDbClicked(event) {
    this.rowDoubleClicked.emit(event.data);
  }

}
