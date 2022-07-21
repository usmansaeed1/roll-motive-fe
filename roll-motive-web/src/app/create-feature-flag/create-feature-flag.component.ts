import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'create-feature-flag',
  templateUrl: 'create-feature-flag.component.html',
  styleUrls: ['create-feature-flag.component.scss'],
})

export class CreateFeatureFlagComponent implements OnInit {
  public isVisible: boolean = false;
  public formGroup: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }
  
  public show() {
    this.initForm();
    this.isVisible = true;
  }

  public hide() {
    this.isVisible = false;
  }

  public handleCancel() {
    this.hide();
  }

  public handleOk() {
    console.log(this.formGroup.value);
  }

  private initForm() {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      key: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^\S*$/)]],
      description: ['', Validators.maxLength(100)],
      type: ['boolean', Validators.required],
      status: [false],
    });
  }
}