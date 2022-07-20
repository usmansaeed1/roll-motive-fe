import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../header.service';

@Component({
  selector: 'app-flag-detail',
  templateUrl: './flag-detail.component.html',
  styleUrls: ['./flag-detail.component.scss']
})
export class FlagDetailComponent implements OnInit {

  constructor(private headerService: HeaderService) { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    this.headerService.updateHeaderText('Flag 1');
  }

}
