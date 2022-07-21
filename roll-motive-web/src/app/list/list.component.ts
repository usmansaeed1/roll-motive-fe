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
  public filteredFlags: IFeatureFlag[] = [];

  public searchQuery: string = '';
  
  constructor(private router: Router, private headerService: HeaderService) { }

  ngOnInit(): void {
    this.headerService.updateHeaderText('');
    this.flags = new Array(100).fill(0).map((_, index) => ({
      id: index,
      name: `Feature flag ${index}`,
      key: `feature_flag_${index}`,
      targeting: index % 3 === 0,
      createdAt: new Date(index * 100000),
      createdBy: 'Usman Saeed',
      updatedAt: new Date(),
      updatedBy: 'Usman',
      status: index % 2 === 0,
      tag: index % 2 === 0 ? 'compliance' : 'safety',
    }));
    this.filteredFlags = [...this.flags];
    this.sortByCreated('descend');
  }

  public onSearchChanged(text: string) {
    this.filteredFlags = [...this.flags.filter(flag => flag.name.toLowerCase().includes(text.toLowerCase()))];
  }

  public onFlagStatusChanged(value: boolean, flagId: number) {
    console.log(value, flagId);
  }

  public create() {
    this.router.navigate(['flag-detail']);
  }
  
  public sortByCreated(direction: string | null) {
    console.log(direction);
    if (!direction) return;
    if (direction === 'ascend') {
      this.filteredFlags = [...this.filteredFlags.sort((a, b) => (a.createdAt as any) - (b.createdAt as any))];
    }
    if (direction === 'descend') {
      this.filteredFlags = [...this.filteredFlags.sort((a, b) => (b.createdAt as any) - (a.createdAt as any))];
    }
  }

  public sortByUpdated(direction: string | null) {
    console.log(direction);
    if (!direction) return;
    if (direction === 'ascend') {
      this.filteredFlags = [...this.filteredFlags.sort((a, b) => (a.updatedAt as any) - (b.updatedAt as any))];
    }
    if (direction === 'descend') {
      this.filteredFlags = [...this.filteredFlags.sort((a, b) => (b.updatedAt as any) - (a.updatedAt as any))];
    }
  }

  public sortByName(direction: string | null) {
    console.log(direction);
    if (!direction) return;
    if (direction === 'ascend') {
      this.filteredFlags = [...this.filteredFlags.sort((a, b) => (a.name > b.name ? 1 : (a.name === b.name ? 0 : -1)))];
    }
    if (direction === 'descend') {
      this.filteredFlags = [...this.filteredFlags.sort((a, b) => (a.name > b.name ? -1 : (a.name === b.name ? 0 : 1)))];
    }
  }
}