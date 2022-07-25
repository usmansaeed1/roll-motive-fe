import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateFeatureFlagService } from './create-feature-flag.service';

@Component({
  selector: 'create-feature-flag',
  templateUrl: 'create-feature-flag.component.html',
  styleUrls: ['create-feature-flag.component.scss'],
})

export class CreateFeatureFlagComponent implements OnInit {
  public isVisible: boolean = false;
  public formGroup: FormGroup = new FormGroup({});
  @Output() public onFlagAdded: EventEmitter<void> = new EventEmitter();

  public readonly tagsOptions = [{
    label: 'Compliance',
    value: 'compliance',
  }, {
    label: 'Safety',
    value: 'safety',
  }, {
    label: 'Platform',
    value: 'platform',
  }, {
    label: 'Fleet View',
    value: 'fleetview',
  }, {
    label: 'Fuel',
    value: 'fuel',
  }];

  constructor(private fb: FormBuilder, private createFeatureFlagService: CreateFeatureFlagService) { }

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
    if (!this.formGroup.valid) return alert('Invalid Form');
    const requestBody = { ...this.formGroup.value };
    requestBody.default_rule = {
      type: 'constant',
      value: this.formGroup.value.default_rule,
    };

    this.createFeatureFlagService.save(requestBody)
    .subscribe(response => {
      this.hide();
      this.onFlagAdded.emit();
    })
  }

  private initForm() {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      key: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^\S*$/)]],
      description: ['', Validators.maxLength(100)],
      data_type: ['boolean', Validators.required],
      tags: [[]],
      status: ['active'],
      default_rule: [false],
    });
  }
}