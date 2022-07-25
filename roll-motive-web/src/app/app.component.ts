import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'roll-motive-web';
  public headerText: string = '';
  public selectedProject: string = 'preview';

  constructor(private router: Router, private headerService: HeaderService, private cdr: ChangeDetectorRef,) {

  }

  public ngOnInit() {
    this.headerService.currentHeaderText.subscribe((message: string) => {
      this.headerText = message;
      this.cdr.detectChanges();
    });

    this.navigateToList();
  }

  public navigateToList() {
    this.router.navigate(['feature-flags']);
  }
}
