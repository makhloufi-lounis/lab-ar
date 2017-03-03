import { Injectable } from '@angular/core';
import { Room } from '../model/room.model';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'; //ici parceque on importe une fonction
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiService{
    //http://lounis.pdc_zf2.com
    private url = "http://lounis.pdc_zf2.com";

    private headers = new Headers({'Content-type' : 'application/json'});
    constructor(private http: Http){}

    getRooms(): Observable<Room[]>{
        this.headers.append('Autorization', 'token');
        let obj:Observable<Room[]> = this.http.get(
            this.url + '/rooms',
            {'headers' : this.headers}
        )
        .map(this.extractData)
        //.catch(this.handleError);
        //.map( (resp:Response) => resp.json() );
        //console.log(resp);
        return obj;
    }


private extractData(res: Response) {
    let body = res.json();
    console.log(body.rooms);
    console.log(body.data);
    return body.rooms || { };
  }
    /*getRooms(id:number): Observable<Room[]>{
        
        let obj:Observable<Room[]> = this.http.get(
            this.url + '/rooms/' + id,
            {'headers' : this.headers}
        )
       
        .map( (resp:Response) => resp.json() );
         console.log(this.url);
        return obj;
    }*/

   /* insertRoom(room : Room){
        this.http.post()
    }*/
}