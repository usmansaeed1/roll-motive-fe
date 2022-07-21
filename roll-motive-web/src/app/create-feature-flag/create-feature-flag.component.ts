import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'create-feature-flag',
  templateUrl: 'create-feature-flag.component.html',
  styleUrls: ['create-feature-flag.component.scss'],
})

export class CreateFeatureFlagComponent implements OnInit {
  public isVisible: boolean = false;

  constructor() { }

  ngOnInit() { }
  
  public show() {
    this.isVisible = true;
  }

  public hide() {
    this.isVisible = false;
  }

  public handleCancel() {
    this.hide();
  }

  public handleOk() {

  }
}