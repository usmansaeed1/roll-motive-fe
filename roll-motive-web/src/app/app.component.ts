import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'roll-motive-web';

  constructor(private router: Router) {

  }

  public ngOnInit() {
    // this.router.navigate(['feature-flags']);
  }
}
