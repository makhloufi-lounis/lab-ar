import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/catch';

import { Localisation } from '../model/localisation.model';

@Injectable()
export class ApiService{
    
  
   constructor(private http: Http){}

   getAllLocalisation(webserviceUrl): Observable<Localisation[]>{
       let localisations:Observable<Localisation[]> = this.http.get(
            `${webserviceUrl}/localisations/dept`            
        )
        .map(this.extractData)
        .catch(this.handleError);

        return localisations;
    }


    private extractData(res: Response) {
        let body = res.json(); 
        return body || {};
    }

    private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
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