import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SecteurActivite } from '../model/secteur.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';

@Injectable() 
export class SecteurActiviteService{
    
    private _headers        :Headers;
    private _options        :RequestOptions ;
    private _searchParams   :URLSearchParams;
      
    constructor(private http: Http){}


    getSecteursActivite(apiCommercesUrl, key, type): Observable<SecteurActivite[]>{  
        this._headers = new Headers();
        this._headers.append('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
        this._headers.append('Accept','application/json');
        this._headers.append('authorization',`Basic ${key}`); 
        this._searchParams = new URLSearchParams('');
        this._searchParams.append('type', type);
        this._options =  new RequestOptions({headers: this._headers, search: this._searchParams});
        let localisations:Observable<SecteurActivite[]> = this.http.get(
            `${apiCommercesUrl}/secteur-activite`,
            this._options            
        )
        .map(this.extractData)
        .catch(this.handleError);     
        return localisations;
    }

    private extractData(res: Response){
          let body = res.json(); 
          return body || {};          
    }

    public getArray2DimSecteursCommerce(secteurs){  
         

         if(secteurs.length != 0){             
              
              console.log('Before:');
              console.log(secteurs);
              let val = Array.from(secteurs);
              console.log('After:');
              console.log(val);
              return val;
        }
       
         
         //return t_secteurs_commerces;

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