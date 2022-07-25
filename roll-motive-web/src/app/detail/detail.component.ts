import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HeaderService } from '../header.service';
import { DetailService, IFeatureFlag } from './detail.service';

@Component({
  selector: 'flag-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  providers: [DetailService],
})
export class DetailComponent implements OnInit {
  public flagDetail: IFeatureFlag = {
    id: 0,
    name: '',
    status: false,
    key: '',
    createdAt: new Date(),
    createdBy: '',
    updatedAt: new Date(),
    updatedBy: '',
  };
  public ruleAttribute: string = 'company_id';
  public ruleRelation: string = 'is_one_of';
  public defaultRule: string = 'true';
  public defaultRulePercentTrue: number = 0;
  public defaultRulePercentFalse: number = 100;
  public defaultRulePercentTrueBarPx: number = 0;
  public ruleValue: boolean = true;
  public flagId: string = '';
  @ViewChild('inputElement', { static: false }) inputElement?: ElementRef;

  tags = ['160', '140', '424790'];
  inputVisible = false;
  inputValue = '';

  constructor(
    private headerService: HeaderService,
    private activatedRoute: ActivatedRoute,
    private service: DetailService,
    ) {
    const params: any = activatedRoute.snapshot.params;
    this.flagId = params.id;
  }

  ngOnInit(): void {
    this.service.get(this.flagId).subscribe((flagDetail: any) => {
      console.log(flagDetail);
      this.flagDetail = flagDetail;
      this.headerService.updateHeaderText(this.flagDetail.name);
    });
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

  onChangePercentTrue(value: number): void {
    this.defaultRulePercentFalse = 100 - value;
    this.defaultRulePercentTrueBarPx = this.defaultRulePercentTrue * 5;
  }

  onChangePercentFalse(value: number): void {
    this.defaultRulePercentTrue = 100 - value;
    this.defaultRulePercentTrueBarPx = this.defaultRulePercentTrue * 5;
  }
}
