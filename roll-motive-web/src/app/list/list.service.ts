import { map } from 'rxjs/operators';

import { Inject, Injectable } from '@angular/core';
import { Params } from '@angular/router';

import { ServerApi } from '../services/server-api';
import forOwn from 'lodash/forOwn';

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
  tags: string[];
  defaultRule?: any;
}

interface IServerFlag {
  id: number;
  name: string;
  status: boolean;
  description: string;
  key: string;
  data_type: string;
  tags: string[];
  default_rule: any;
}


function objectToMap(obj: any) {
  const m = new Map();
  if (!obj) return m;
  forOwn(obj, (val, key) => m.set(key, val));
  return m;
}


@Injectable()
export class ListService {
  constructor(@Inject(ServerApi) private api: any) {}

  public get(params: Params) {
    params = objectToMap(params);
    if (!params) params = new Map();

    const headers = new Map();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');

    return this.api
      .get('feature_flags', params, 'w2', headers)
      .pipe(
        map((response: any) => response.body),
        map(this.transformData.bind(this)),
      )
    ;
  }

  private transformData(res: any): IFeatureFlag[] {
    const serverList: IServerFlag[] = res.feature_flags;

    return serverList.map((featureFlag: any, index: number) => {
      const flagDetail: IServerFlag = featureFlag.feature_flag;
      return {
        id: flagDetail.id,
        name: flagDetail.name,
        key: flagDetail.key,
        targeting: flagDetail.status,
        createdAt: new Date(1658444984000 - (86400000 * index)),  // MOCKED
        createdBy: 'Usman Saeed',  // MOCKED
        updatedAt: new Date(),  // MOCKED
        updatedBy: 'Usman Saeed',  // MOCKED
        status: flagDetail.status,
        tags: flagDetail.tags,
        description: flagDetail.description,
        defaultRule: {
          type: flagDetail.default_rule.type,
          value: flagDetail.default_rule.value,
          percentage: flagDetail.default_rule.percentage,
          distribution: flagDetail.default_rule.distribution,
          key: flagDetail.default_rule.key,
        }
      };
    });


    // return new Array(100).fill(0).map((_, index) => ({
      //   id: index,
      //   name: `Feature flag ${index}`,
      //   key: `feature_flag_${index}`,
      //   targeting: index % 3 === 0,
      //   createdAt: new Date(1658444984000 - (86400000 * index)),
      //   createdBy: 'Usman Saeed',
      //   updatedAt: new Date(),
      //   updatedBy: 'Usman',
      //   status: index % 2 === 0,
      //   tag: index % 2 === 0 ? 'compliance' : 'safety',
      //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id arcu lacinia erat aliquam dignissim vitae vel ligula. Nulla pulvinar sapien vel faucibus dictum.',
      // }));
  }
}
