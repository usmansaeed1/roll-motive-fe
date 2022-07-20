import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
 providedIn: 'root'
})
export class HeaderService {

 private headerText = new BehaviorSubject('');
 currentHeaderText = this.headerText.asObservable();

 constructor() {}
 
 updateHeaderText(message: string) {
    this.headerText.next(message);
 }
}