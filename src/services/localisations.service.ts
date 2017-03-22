import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Localisation } from '../model/localisation.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';

@Injectable() 
export class LocalisationsService{
    
      
    constructor(private http: Http){}

   
    getLocalisations(webserviceUrl): Observable<Localisation[]>{ 
        let localisations:Observable<Localisation[]> = this.http.get(
            `${webserviceUrl}/localisations/dept`            
        )
        .retry(3)
        .map(this.extractData)
        .catch(this.handleError);     
        return localisations;
    }

    

    private extractData(res: Response){
          let body = res.json(); 
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