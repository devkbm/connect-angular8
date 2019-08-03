import { Component, OnInit, ViewChild } from '@angular/core';
import { WorkScheduleFormComponent } from './work-schedule-form.component';
import { WorkGroupFormComponent } from './workgroup-form.component';
import { MyWorkGroupGridComponent } from './myworkgroup-grid.component';

@Component({
  selector: 'app-workgroup',
  templateUrl: './workgroup.component.html',
  styleUrls: ['./workgroup.component.css']
})
export class WorkgroupComponent implements OnInit {

  scheduleDrawerVisible: boolean = false;
  workGroupDrawerVisible: boolean = false;

  workGroupId;

  @ViewChild('myWorkGroupGrid', {static: false}) myWorkGroupGrid: MyWorkGroupGridComponent;
  @ViewChild('workScheduleForm', {static: false}) workScheduleForm: WorkScheduleFormComponent;
  @ViewChild('workGroupForm', {static: false}) workGroupForm: WorkGroupFormComponent;

  constructor() { }

  ngOnInit() {
    this.getMyWorkGroupList();
  }

  public getMyWorkGroupList(): void {
    this.myWorkGroupGrid.getMyWorkGroupList();
  }
  public openScheduleDrawer(): void {
    this.scheduleDrawerVisible = true;
  }

  public closeScheduleDrawer(): void {
    this.scheduleDrawerVisible = false;
  }

  public openWorkGroupDrawer(): void {
    this.workGroupDrawerVisible = true;
  }

  public closeWorkGroupDrawer(): void {
    this.workGroupDrawerVisible = false;
  }

  public newWorkGroup(): void {
    this.workGroupForm.newForm();
    this.openWorkGroupDrawer();
  }

  public newSchedule(): void {
    this.workScheduleForm.newForm();
    this.openScheduleDrawer();
  }

  public workGroupSelect(ids): void {     
    this.workGroupId = ids;
  }

  itemSelect(id) {
    console.log(id);
    this.workScheduleForm.getWorkGroupSchedule(id);
    this.openScheduleDrawer();
  }



}