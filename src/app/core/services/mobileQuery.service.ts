import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable()
export class MobileQueryService {

    public isMobile: Subject<boolean> = new Subject();

    constructor() { }

}
