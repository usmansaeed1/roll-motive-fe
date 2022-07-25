import { Observable, throwError as observableThrowError } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Inject, Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CustomHttpParamCodec } from './custom-http-param-codec';
// import { isArray, clone, extend } from 'lodash';
// import clone from 'lodash/clone';
// import extend from 'lodash/extend';
import * as _ from 'lodash';

import { defaultHeaders } from './server-http';
import { getCookie, setCookie, CookieKey } from './cookies';

import { tap } from 'rxjs/operators';

const API_URL = 'http://3581-119-155-51-81.ngrok.io';
// const API_URL = 'http://p.k2labs.org';

export const W2_API_URL = `${API_URL}/api/w2`;
export const W2_WS_URL = `${API_URL.replace('http', 'ws')}/api/w2`;
export const W2_API = 'w2';
export const W3_API = 'w3';
export const W3_API_URL = `${API_URL}/api/${W3_API}`;

// this is a BE param used to determine if they should check user permissions when retrieving assets, drivers, or vehicles
// necessary as the current permissions should only pertain to fleet view, but not during alerts workflow
export enum CALLER_NAMES {
  fleetview = 'fleetview',
  alertsPage = 'entity-select-modal',
}

const GROUP_IDS_KEY = 'group_ids';
const SUPPORT_SESSION_ALLOWED_URLS: RegExp[] = [
  /^callbacks\/ready/,
  /^callbacks\/pusher\/join/,
  /^orders/,
  /^sessions\/payment_page/,
  /^billing\/address/,
  /^reports\//,
  /^reports_dna\/export/,
];
const DEMO_SESSION_ALLOWED_URLS: RegExp[] = [
  /^callbacks\/pusher\/join/,
  /^driver_performance\/events\/(\d)+\/update_blur/,
];

const HARD_VERSION_COOKIE_NAME: CookieKey = CookieKey.HARD_APP_VERSION;
let currentHardVersion = getCookie(HARD_VERSION_COOKIE_NAME);

@Injectable()
export class ServerApi {
  public API_VER_W2: string = 'w2';
  public API_VER_W3: string = 'w3';
  private readonly requestDeniedErrorMessage: string = 'Cannot make non-GET requests in remote login session';

  constructor(
    private http: HttpClient,
    private zone: NgZone,
    private customHttpParamCodec: CustomHttpParamCodec,
  ) { }

  public get<T>(
    endpointUrl: string,
    params = new Map(),
    apiVer: string = this.API_VER_W2,
    headers = new Map(),
    useBracketsForArrayValues: boolean = true,
  ) {
    return this.http
      .get<T>(
        `${this._getApiUrl(apiVer)}/${endpointUrl}`,
        this._getRequestOptions('get', params, headers, useBracketsForArrayValues),
      )
      .pipe(
        tap(this._checkVersion.bind(this)),
      );
  }

  public getBlob<T>(
    endpointUrl: string,
    params = new Map(),
    apiVer: string = this.API_VER_W2,
    headers = new Map(),
    useBracketsForArrayValues: boolean = true,
  ) {
    const options = this._getRequestOptions('get', params, headers, useBracketsForArrayValues);
    options.responseType = 'blob';
    return this.http
      .get<T>(
        `${this._getApiUrl(apiVer)}/${endpointUrl}`,
        options,
      )
      .pipe(
        tap(this._checkVersion.bind(this)),
      )
      ;
  }

  public getText<T>(
    endpointUrl: string,
    params = new Map(),
    apiVer: string = this.API_VER_W2,
    headers = new Map(),
    useBracketsForArrayValues: boolean = true,
  ) {
    const options = this._getRequestOptions('get', params, headers, useBracketsForArrayValues);
    options.responseType = 'text';
    return this.http
      .get<T>(
        `${this._getApiUrl(apiVer)}/${endpointUrl}`,
        options,
      )
      .pipe(
        tap(this._checkVersion.bind(this)),
      );
  }

  public post<T>(
    endpointUrl: string,
    body: any,
    params = new Map(),
    apiVer: string = this.API_VER_W2,
    observeEvents: boolean = false,
  ): Observable<any> {
    if (!this.isRequestAllowed(endpointUrl)) {
      return this.requestDeniedError();
    }

    return this.http
      .post<T>(
        `${this._getApiUrl(apiVer)}/${endpointUrl}`,
        JSON.stringify(body),
        this._getRequestOptions('post', params, new Map(), true, observeEvents),
      ).pipe(
        tap(this._checkVersion.bind(this)),
      );
  }

  public publicPost<T>(endpointUrl: string, params = new Map(), apiVer: string, headers: any): Observable<any> {
    return this.http
      .post<T>(`${this._getApiUrl(apiVer)}/${endpointUrl}`, {}, this._getRequestOptions('post', params, headers))
      .pipe(
        tap(this._checkVersion.bind(this)),
      )
      ;
  }

  public put<T>(endpointUrl: string, body: any, params = new Map(), apiVer: string = this.API_VER_W2) {
    if (!this.isRequestAllowed(endpointUrl)) {
      return this.requestDeniedError();
    }

    return this.http
      .put<T>(`${this._getApiUrl(apiVer)}/${endpointUrl}`, JSON.stringify(body), this._getRequestOptions('put', params))
      .pipe(
        tap(this._checkVersion.bind(this)),
      )
      ;
  }

  public patch<T>(endpointUrl: string, body: any, params = new Map(), apiVer: string = this.API_VER_W2) {
    if (!this.isRequestAllowed(endpointUrl)) {
      return this.requestDeniedError();
    }

    return this.http
      .patch<T>(`${this._getApiUrl(apiVer)}/${endpointUrl}`, JSON.stringify(body), this._getRequestOptions('patch', params))
      .pipe(
        tap(this._checkVersion.bind(this)),
      )
      ;
  }

  public delete(endpointUrl: string, params: any = null, apiVer: string = this.API_VER_W2) {
    if (!this.isRequestAllowed(endpointUrl)) {
      return this.requestDeniedError();
    }
    return this.http
      .delete(`${this._getApiUrl(apiVer)}/${endpointUrl}`, {
        observe: 'response',
        params: this._getQueryParams(params),
        headers: this._getHeaders(),
      }).pipe(
        tap(this._checkVersion.bind(this)),
      );
  }

  public connectWebSocket(endpointUrl: string): WebSocketSubject<any> {
    const authToken: string | number | boolean | undefined = getCookie(CookieKey.AUTH_TOKEN);
    return webSocket(`${W2_WS_URL + endpointUrl}?authToken=${encodeURIComponent(authToken as string)}`);
  }

  private _getApiUrl(apiVer: string) {
    return `${API_URL}/api/${apiVer}`;
  }

  private isRequestAllowed(url: string): boolean {
    return true;
  }

  private _getHeaders(headers = {}) {
    const defaults = _.clone(defaultHeaders);
    return new HttpHeaders(_.extend(defaults, headers));
  }

  private _getQueryParams(params: any, useBracketsForArrayValues: boolean = true) {
    let searchParams = new HttpParams({ encoder: this.customHttpParamCodec });
    if (!params) return searchParams;
    params.forEach((val: any, key: string) => {
      if (_.isArray(val)) {
        if (useBracketsForArrayValues) key = `${key}[]`;
        for (const v of val) searchParams = searchParams.append(key, v);
      } else searchParams = searchParams.set(key, val);
    });
    return searchParams;
  }

  private _getRequestOptions(
    methodType: string,
    params: any,
    headerParams = new Map(),
    useBracketsForArrayValues: boolean = true,
    observeEvents: boolean = false,
  ): any {
    let headers: any = {};

    if (!params) params = new Map();

    if (methodType === 'post' || methodType === 'put' || methodType === 'patch') {
      headers['Content-Type'] = 'application/json';
    }

    headers = this.setInternalAPIKeyHeader(headers, headerParams);
    headers = this.setAcceptLanguageHeader(headers, headerParams);

    if (!params.has(GROUP_IDS_KEY)) {
      if (methodType === 'get') {
        const groupIds: string[] = [];
        if (groupIds.length) {
          params.set(GROUP_IDS_KEY, groupIds);
        }
      }
    } else {
      if (!params.get(GROUP_IDS_KEY)) {
        params.delete(GROUP_IDS_KEY);
      }
    }

    if (observeEvents) {
      return {
        observe: 'events',
        reportProgress: true,
        headers: this._getHeaders(headers),
        params: this._getQueryParams(params, useBracketsForArrayValues),
      };
    } else {
      return {
        observe: 'response',
        headers: this._getHeaders(headers),
        params: this._getQueryParams(params, useBracketsForArrayValues),
      };
    }
  }

  private setInternalAPIKeyHeader(requestHeaders: any, headerMap: Map<string, string>): any {
    const xInternalApiKey = headerMap.get('X-Internal-Api-Key');
    if (xInternalApiKey) {
      requestHeaders['X-Internal-Api-Key'] = xInternalApiKey;
    }
    return requestHeaders;
  }

  private setAcceptLanguageHeader(requestHeaders: any, headerMap: Map<string, string>): any {
    const language: string | undefined = headerMap.get('Accept-Language');
    if (language) {
      requestHeaders['Accept-Language'] = language;
    }
    return requestHeaders;
  }

  private _checkVersion(res: any) {
    if (!res.headers) return;
    const newHardVersion = res.headers.get('X-Dashboard-Version');
    if (currentHardVersion && newHardVersion > currentHardVersion) {
      setCookie(HARD_VERSION_COOKIE_NAME, newHardVersion);
      // Defer until all microtasks have executed for reload to work correctly for non-GET requests
      const subscription = this.zone.onStable.subscribe(() => {
        subscription.unsubscribe();
        // force reload with cache disabled
        window.location.href = location.protocol + '//' +
          location.host +
          location.pathname +
          '?a=' + (new Date()).getTime() + '/' +
          location.hash
        ;
      });
    } else if (!currentHardVersion) {
      currentHardVersion = newHardVersion;
      setCookie(HARD_VERSION_COOKIE_NAME, newHardVersion);
    }
  }

  private requestDeniedError(): Observable<never> {
    return observableThrowError(new Error(this.requestDeniedErrorMessage));
  }
}
