import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from '../header.service';
import { ListService, IFeatureFlag } from './list.service';


@Component({
  selector: 'feature-flags-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [ListService],
})

export class FeatureFlagsListComponent implements OnInit {
  public loading = false;
  public flags: IFeatureFlag[] = [];
  public filteredFlags: IFeatureFlag[] = [];

  public searchQuery: string = '';
  
  constructor(
    private router: Router,
    private headerService: HeaderService,
    private service: ListService,
  ) { }

  ngOnInit(): void {
    this.headerService.updateHeaderText('');

    this.service.get({}).subscribe((featureFlags: IFeatureFlag[]) => {
      this.flags = featureFlags;
      this.filteredFlags = [...this.flags];
      this.sortByCreated('descend');
    });
  }

  public onSearchChanged(text: string) {
    this.filteredFlags = [...this.flags.filter(flag => flag.name.toLowerCase().includes(text.toLowerCase()))];
  }

  public onFlagStatusChanged(value: boolean, flagId: number) {
    console.log(value, flagId);
  }

  public navigateToDetail(featureFlag: IFeatureFlag) {
    this.router.navigate(['flag-detail', featureFlag.id]);
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