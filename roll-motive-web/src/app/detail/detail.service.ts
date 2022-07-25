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
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  tags?: string[];
}

interface IServerFlag {
  id: number;
  name: string;
  status: boolean;
  description: string;
  key: string;
  data_type: string;
  tags: string[];
  default_rule: {
    type: string;
    value: boolean;
  };
}


function objectToMap(obj: any) {
  const m = new Map();
  if (!obj) return m;
  forOwn(obj, (val, key) => m.set(key, val));
  return m;
}


@Injectable()
export class DetailService {
  constructor(@Inject(ServerApi) private api: any) {}

  public get(id: string) {
    // params = objectToMap(params);
    const params = new Map();

    const headers = new Map();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');

    return this.api
      .get(`feature_flags/${id}`, params, 'w2', headers)
      // .get('compliance/v1/carriers', params, 'w2', headers)
      .pipe(
        map((response: any) => response.body),
        map(this.transformData.bind(this)),
      )
    ;
  }

  public put(id: string, data: any) {
    const headers = new Map();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');

    return this.api.put(`feature_flags/${id}`, data);
  }

  private transformData(res: any): IFeatureFlag {
    // res = {"feature_flag":{"id":1,"name":"Compliance Hub","description":"Compliance hub","key":"compliance-hub","data_type":"boolean","status":"active","tags":["compliance","beta"],"default_rule":{"type":"constant","value":true}}};

    const flagDetail: IServerFlag = res.feature_flag;
    console.log(flagDetail);

    return {
      id: flagDetail.id,
      name: flagDetail.name,
      key: flagDetail.key,
      description: flagDetail.description,
      status: flagDetail.status,
      createdAt: new Date(1658444984000 - (86400000 * 5)),  // MOCKED
      createdBy: 'Usman Saeed',  // MOCKED
      updatedAt: new Date(),  // MOCKED
      updatedBy: 'Usman',  // MOCKED
      tags: flagDetail.tags,
    };
  }
}