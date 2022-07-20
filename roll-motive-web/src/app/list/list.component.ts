import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from '../header.service';

export interface IFeatureFlag {
  id: number;
  name: string;
  key: string;
  description?: string;
  status: boolean;
  targeting: boolean;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  tag?: string;
}

@Component({
  selector: 'feature-flags-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})

export class FeatureFlagsListComponent implements OnInit {
  public loading = false;
  public flags: IFeatureFlag[] = [];
  public listOfCurrentPageFlags: readonly IFeatureFlag[] = [];
  
  constructor(private router: Router, private headerService: HeaderService) { }

  ngOnInit(): void {
    this.headerService.updateHeaderText('');
    this.flags = new Array(100).fill(0).map((_, index) => ({
      id: index,
      name: `Feature flag ${index}`,
      key: `feature_flag_${index}`,
      targeting: index % 3 === 0,
      createdAt: new Date(),
      createdBy: 'Usman Saeed',
      updatedAt: new Date(),
      updatedBy: 'Usman',
      status: index % 2 === 0,
      tag: index % 2 === 0 ? 'compliance' : 'safety',
    }));
  }

  public onFlagStatusChanged(value: boolean, flagId: number) {
    console.log(value, flagId);
  }

  public create() {
    this.router.navigate(['flag-detail']);
  }
}