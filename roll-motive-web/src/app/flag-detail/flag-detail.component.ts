import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../header.service';

@Component({
  selector: 'flag-detail',
  templateUrl: './flag-detail.component.html',
  styleUrls: ['./flag-detail.component.scss']
})
export class FlagDetailComponent implements OnInit {
  public flagDetail: any;

  constructor(private headerService: HeaderService) { }

  ngOnInit(): void {
    this.flagDetail = {
      id: 2,
      name: `Compliance Adverse Driving Conditions`,
      key: `compliance-adverse-driving-conditions`,
      targeting: true,
      createdAt: new Date('2022-04-10T20:52:05.549Z'),
      createdBy: 'Anas Siddiqi',
      updatedAt: new Date('2022-06-20T20:52:05.549Z'),
      updatedBy: 'Usman Saeed',
      status: true,
      tag: 'compliance',
    };

    this.headerService.updateHeaderText(this.flagDetail.name);
  }

  public onFlagStatusChanged(value: boolean) {
    console.log(value);
  } 
}
