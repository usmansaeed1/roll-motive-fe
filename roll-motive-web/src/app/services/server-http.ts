import { getCookie, setCookie, CookieKey } from './cookies';

const AUTH_TOKEN: string = 'MTVhNTE0ZjdkNmM2Nzk2YmYwOGFmNGRjNjhhYjliNmU5MDhlNzdkYzU3ZjgyMDk4YmJkNGRiYmNmYzMwODJkYjE4OTE4MjMxMDEwYmQ2ZTg4Yjc0OWJmMjNmZTJlODM4ZTliZTk0Y2Y4MzdiY2VkMDYy';
//driver  'nwWlDSE9EdTC3QHlEQC0aUc2L5LCrnlh6+EUOznfIfQYl67sordjRtEEKULB3rB5';
// getCookie(CookieKey.AUTH_TOKEN);

let basicHeaders;
let supportModeHeaders = {};
let demoModeHeaders = {};

if (AUTH_TOKEN) {
  basicHeaders = {
    'X-Web-User-Auth': AUTH_TOKEN,
  };
}

export const defaultHeaders = Object.assign({}, basicHeaders, supportModeHeaders, demoModeHeaders);

export function overrideAuthToken(authToken: string) {
  setCookie(CookieKey.AUTH_TOKEN, authToken);
  defaultHeaders['X-Web-User-Auth'] = authToken;
}
