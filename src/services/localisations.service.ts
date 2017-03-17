import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/retry';

@Injectable() // sert à dire que RoomService à lui mmeme des dépandances
export class LocalisationsService{
    
    private _localisations :         any = {};
    private _errorMessage:          string;  

    constructor(private apiService : ApiService){}

    /*getLocalisations(webserviceUrl) : Observable<any[]>{
        return 
    }*/

    initialize(webserviceUrl){
        this.apiService.getAllLocalisation(webserviceUrl).retry(3)
                         .subscribe(
                               res =>  {
                                   this._localisations = res,
                                   this._localisations = this._localisations
                               },                         
                               error =>  this._errorMessage = <any>error
                         ); 
    }

    getAssocRegionsFrance(){
        if( this._localisations != {}){
            console.log(this._localisations);
           for(let localosation in this._localisations){
                console.log(localosation);
           }
           console.log('pas vide');
           return this._localisations;
        }else{
            console.log('vide');
        }
    }
   
}