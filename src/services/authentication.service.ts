import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Room } from '../model/room.model';
import { Utilisateur } from '../model/utilisateur.model';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map'; 

@Injectable()
export class AuthenticationService{
   
    private _headers        :Headers;
    private _options        :RequestOptions ;
    private _searchParams   :URLSearchParams;


    constructor(private http: Http){

    }
    
    isAuth(baseUrl): Observable<any>{
      
       
       // this.headers = new Headers({'Cookie' : 'ca='+Zone.current.get('req').cookies.ca});
        this._searchParams = new URLSearchParams('');
        this._searchParams.set('test_si_deja_connecte', 'oui');
        this._options =  new RequestOptions({headers: this._headers, search: this._searchParams});
        let obj :Observable<any> = this.http.get(
            `${baseUrl}/verif.html`,
             this._options             
        )
        .map(this.extractData)
        .catch(this.handleError);
        return obj;
    }

  private extractData(res: Response) {
    let body = res.json();
    //console.log(body);
    /*let headers: Headers = res.headers;
    console.log(body);
    console.log(headers);*/
    return body || {};
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      console.error(body);
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
  