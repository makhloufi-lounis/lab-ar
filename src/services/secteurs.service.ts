import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SecteurActivite } from '../model/secteur.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';

@Injectable() 
export class SecteurActiviteService{
    
      
    constructor(private http: Http){}


    getSecteursActivite(webserviceUrl): Observable<SecteurActivite[]>{  
        let localisations:Observable<SecteurActivite[]> = this.http.get(
            `${webserviceUrl}/secteur-activite/commerce`            
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