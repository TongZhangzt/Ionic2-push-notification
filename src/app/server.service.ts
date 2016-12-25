import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ServerService{
  constructor(private http:Http){
    console.log('Server Service Initialized...');
  }

  addToken(newTokenID) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("adding device token to server...");
    return;
   /* return this.http.post('http://', JSON.stringify(newTokenID), {headers: headers})
      .map(res => res.json());*/
  }

}
