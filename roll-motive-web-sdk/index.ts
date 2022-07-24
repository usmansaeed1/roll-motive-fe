export class RollMotiveSdk {
  flags = [];
  
  initialize(token: string, ldUser: any) {
    console.log('initialising roll motive');
    let xhr: XMLHttpRequest = new XMLHttpRequest();
    const self = this;
    
    xhr.open('GET', 'http://8658-39-37-165-226.ngrok.io/api/w2/feature_flags_state?company_id=3');
    xhr.setRequestHeader('X-Web-User-Auth', token);
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.responseType = 'json';
    xhr.send()
    xhr.onload = function() {
      self.flags = xhr.response;
      console.log(xhr);
      console.log(self.flags);
    };
    
    xhr.onerror = function(error) { // only triggers if the request couldn't be made at all
      console.log(`Network Error`, error);
    };
  }

  evaluate(key: string): boolean | null {
    if (!this.flags) return null;
    const flag: any = this.flags.find((flag: any) => flag.feature_flag_state.key === key);
    if (flag) return flag.value;
    else return null;
  }
}

// const sdk = new RollMotiveSdk();
// sdk.initialize('MTVhNTE0ZjdkNmM2Nzk2YmYwOGFmNGRjNjhhYjliNmU5MDhlNzdkYzU3ZjgyMDk4YmJkNGRiYmNmYzMwODJkYjE4OTE4MjMxMDEwYmQ2ZTg4Yjc0OWJmMjNmZTJlODM4ZTliZTk0Y2Y4MzdiY2VkMDYy');
// console.log(sdk.evaluate("compliance-hub"));
