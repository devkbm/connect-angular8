export class SearchEmployee {

    constructor(public id: string,
                public name: string = '',
                public dept_code: string = ''
                ) {
        // 설정되지 않은 필드 제거
        /*if (name === undefined)
            delete this.name;            */
    }
}
