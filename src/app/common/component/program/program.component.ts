import { Component, OnInit, ViewChild } from '@angular/core';
import { ProgramGridComponent } from './program-grid.component';
import { ProgramFormComponent } from './program-form.component';
import { NzDrawerService, NzDrawerRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit {

  drawerVisible = false;

  queryKey = 'resourceCode';
  queryValue = '';

  @ViewChild('programGrid', {static: false})
  grid: ProgramGridComponent;

  @ViewChild('programForm', {static: false})
  form: ProgramFormComponent;

  constructor() { }

  ngOnInit() {
  }

  openDrawer(): void {
    this.drawerVisible = true;
  }

  closeDrawer(): void {
    this.drawerVisible = false;
  }

  getProgramList() {
    let params = null;
    if ( this.queryValue !== '') {
      params = new Object();
      params[this.queryKey] = this.queryValue;
    }

    this.closeDrawer();
    this.grid.getProgramList(params);
  }

  initForm() {
    this.form.newForm();
    this.openDrawer();
  }

  saveProgram() {
    this.form.submitProgram();
  }

  deleteProgram() {
    this.form.deleteProgram();
  }

  selectedItem(item) {
    // this.form.programForm.patchValue(item);
  }

  editDrawerOpen(item) {
    this.form.getProgram(item.resourceCode);
    this.openDrawer();
  }

}
