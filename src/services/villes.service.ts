import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Ville } from '../model/ville.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';

@Injectable() 
export class VillesService{
    
    private _headers        :Headers;
    private _options        :RequestOptions ;
    private _searchParams   :URLSearchParams;
      
    constructor(private http: Http){}

   
    getVilles(apiCommercesUrl, key): Observable<Ville[]>{ 
        this._headers = new Headers();
        this._headers.append('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
        this._headers.append('Accept','application/json');
        this._headers.append('authorization',`Basic ${key}`);        
        this._options =  new RequestOptions({headers: this._headers, search: this._searchParams});
        let villes:Observable<Ville[]> = this.http.get(
            `${apiCommercesUrl}/ville`,
             this._options            
        )
        .map(this.extractData)
        .catch(this.handleError);     
        return villes;
    }

    

    private extractData(res: Response){
          let body = res.json(); 
          return body || {};          
    } 

    public getListeGrandVilles(villes){
        let grandVilles : Array<Ville> = []                      ;
        if(villes.length != 0){
            for(let ville of villes){
                if(ville.id_ville != "0" && ville.id_ville.length != 0){
                    let nom_majuscule = ville.nom_majuscule;
                    let len = nom_majuscule.length;
                    if(nom_majuscule.substring(len - 3, len) != 'EME' && nom_majuscule.substring(len - 3, len) != '1ER'){
                        grandVilles.push(ville);
                    }
                }
            }
        } 
        return grandVilles
    }
  

    private handleError (error: Response | any) {
        console.error(error);
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