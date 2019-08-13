import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserSessionService } from '../../service/user-session.service';
import { NzModalRef } from 'ng-zorro-antd';

@Component({
    selector: 'app-user-popup',
    templateUrl: './user-popup.component.html',
    styleUrls: ['./user-popup.component.css']
})
export class UserPopupComponent implements OnInit {

    /**
     * 아바타 이미지 경로
     */
    imgSrc;

    constructor(private sessionService: UserSessionService,
                private modal: NzModalRef) { }

    ngOnInit(): void {        
        this.imgSrc = this.sessionService.getAvartarImageString();
    }


}
  