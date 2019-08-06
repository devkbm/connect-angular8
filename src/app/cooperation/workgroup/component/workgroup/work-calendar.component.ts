import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';

import { ResponseList } from '../../../../common/model/response-list';
import { WorkGroupService } from '../../service/workgroup.service';
import { WorkGroupSchedule } from '../../model/workgroup-schedule';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { DatePipe } from '@angular/common';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { OptionsInput } from '@fullcalendar/core';
import koLocale from '@fullcalendar/core/locales/ko';

@Component({
selector: 'app-work-calendar',
templateUrl: './work-calendar.component.html',
styleUrls: ['./work-calendar.component.css']
})
export class WorkCalendarComponent implements OnInit {

    calEvent = [
        //{ title: 'event 1', start: '2019-06-06T14:13:29Z' }
    ];
    options: OptionsInput;
    @Input() fkWorkGroup: string;

    fromDate: Date;
    toDate: Date;
    locale = koLocale;
    
    calendarPlugins = [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin];
    calendarHeader = {
        left: 'prev,next today',
        center: 'title',
        //right: ''
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    };

    @Output() itemSelected = new EventEmitter();
    @Output() newDateSelected = new EventEmitter();

    @ViewChild('calendar', {static: false}) calendarComponent: FullCalendarComponent;

    constructor(private workGroupService: WorkGroupService, private datePipe: DatePipe) {
        // this.getScheduleList();
    }

    ngOnInit() {        
        this.getScheduleList(this.fkWorkGroup);                
    }

    onChange(result: Date): void {
        //console.log('onChange: ', result.toLocaleString());
        //console.log(this.datePipe.transform(result, 'yyyyMM'));
        console.log(result.toISOString());

        let calendarApi = this.calendarComponent.getApi();
        //calendarApi.next();
        console.log(calendarApi);
        calendarApi.select(result, result);

        this.getScheduleList(this.fkWorkGroup);
    }

    //#region public methods

    public getScheduleList(ids: string): void {
        const param = {
            fkWorkGroup : ids,
            fromDate: this.datePipe.transform(this.fromDate, 'yyyyMMdd'),
            toDate: this.datePipe.transform(this.toDate, 'yyyyMMdd')
        };
        console.log('getScheduleList : '+ids);
        this.workGroupService.getWorkScheduleList(param)
        .subscribe(
            (model: ResponseList<WorkGroupSchedule>) => {
                if (model.data) {
                    this.calEvent = model.data;
                }
            },
            (err) => {},
            () => {}
        );
    }

    onEventClick(param) {
        console.log(param);
        console.log(param.event.id);
        this.itemSelected.emit(param.event.id);
    }

    onDateClick(param) {
        console.log(param);      
        this.newDateSelected.emit(this.fkWorkGroup);
    }

    onDatesRender(param) {
        const endDate: Date = param.view.currentEnd;
        endDate.setDate(endDate.getDate() - 1);

        this.fromDate = param.view.currentStart;
        this.toDate = endDate;
        // console.log(param.view.currentStart);
        // console.log(param.view.currentEnd);
        // console.log(endDate);
        this.getScheduleList(this.fkWorkGroup);
    }

    
    //#endregion

}
