export class SearchEmployee {

    constructor(public id: string, public name:string = '') {
        // 설정되지 않은 필드 제거
        /*if (name === undefined)    
            delete this.name;            */
    }
}
