import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HeaderService } from '../header.service';

@Component({
  selector: 'flag-detail',
  templateUrl: './flag-detail.component.html',
  styleUrls: ['./flag-detail.component.scss']
})
export class FlagDetailComponent implements OnInit {
  public flagDetail: any;
  public ruleAttribute: string = 'company_id';
  public ruleRelation: string = 'is_one_of';
  public ruleValue: boolean = true;
  @ViewChild('inputElement', { static: false }) inputElement?: ElementRef;

  tags = ['160', '140', '424790'];
  inputVisible = false;
  inputValue = '';

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
    console.log(this.ruleAttribute);
  }

  handleClose(removedTag: {}): void {
    this.tags = this.tags.filter(tag => tag !== removedTag);
  }

  sliceTagName(tag: string): string {
    const isLongTag = tag.length > 20;
    return isLongTag ? `${tag.slice(0, 20)}...` : tag;
  }

  showInput(): void {
    this.inputVisible = true;
    setTimeout(() => {
      this.inputElement?.nativeElement.focus();
    }, 10);
  }

  handleInputConfirm(): void {
    if (this.inputValue && this.tags.indexOf(this.inputValue) === -1) {
      this.tags = [...this.tags, this.inputValue];
    }
    this.inputValue = '';
    this.inputVisible = false;
  }
}
