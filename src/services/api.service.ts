import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'; 
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiService{
    
    
   constructor(private http: Http){}

   getAllLocalisation(webserviceUrl): Observable<any[]>{
        let localisations:Observable<any[]> = this.http.get(
            `${webserviceUrl}/localisations/dept`,
        )
        .map(this.extractData)
        return localisations;
    }


    private extractData(res: Response) {
        let body = res.json(); 
        //console.log(body);
        return body || {};
    }
   
}