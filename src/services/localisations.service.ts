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
        .map(this.extractData)
        .catch(this.handleError);     
        return localisations;
    }

    

    private extractData(res: Response){
          let body = res.json(); 
          return body || {};          
    } 

    public getRegionsFrance(localisations){
             let regionFrance : Array<Localisation> = []                      ;
                if(localisations.length != 0){
                        for(let localisation of localisations){
                            let idRegion = localisation.id_localisation; 
                            let len = idRegion.length;
                            if(localisation.id_localisation_pere == "33" && (idRegion.substring(len - 3, len) != "_99")){
                                regionFrance.push(localisation);
                            }
                        }
                }
                return regionFrance
    }

    public getDepartementFrance(localisations){  
        let departementFrance : Array<Localisation> = []; 
        let t_id_region = [];
        if(localisations.length != 0){
                for(let localisation of localisations){
                    if(localisation.id_localisation_pere == "33"){
                        let idRegion = localisation.id_localisation;
                        t_id_region.push(idRegion);
                    }
                }
                for(let idRegion of t_id_region){
                     for(let localisation of localisations){
                         let idLocalisationPere = localisation.id_localisation_pere;
                         let idDep = localisation.id_localisation
                         let len = localisation.id_localisation.length;
                         if(( idLocalisationPere == idRegion) && (idDep.substring(len - 3, len) != "_99")){
                                 departementFrance.push(localisation);
                         }
                     }
                }
        }        
        return departementFrance
    }

    public getPrticuleDansCorrespondantLocalisation(idLocalisation){
        let particule ='';

		let len=idLocalisation.length;
		
		//Pays
		if(len <= 3){
			if(idLocalisation=='31' || idLocalisation=='44' ||  idLocalisation=='971' || idLocalisation=='999'){
				particule="aux";
			}else if (idLocalisation=='1' || idLocalisation=='212' || idLocalisation=='237' || idLocalisation=='351' || idLocalisation=='352'
					|| idLocalisation=='423' || idLocalisation=='45' || idLocalisation=='52' || idLocalisation=='55' || idLocalisation=='56'
					|| idLocalisation=='81' || idLocalisation=='84' || idLocalisation=='84'){
						particule="au";
			}else if (idLocalisation=='377' || idLocalisation=='65'){
				particule="à";
			}else{
				particule="en";
			}
		}
		//REGION
		else if(len==5){
			if(idLocalisation=='33_23')particule="dans les";
			else if(idLocalisation=="33_07" || idLocalisation=="33_17" || idLocalisation=="33_14") particule="dans le";
			else particule="en";
		}
		//DEPARTEMENT
		else if(len>=8){
            
			let num=idLocalisation.substring(6);
			let motif=`,${num},`;
            
			if((',03,61,89,36,10,27,91,11,34,02,60,01,').indexOf(motif) != -1){
				particule="dans l'";
			}
			else if((',50,58,51,23,72,80,86,26,42,').indexOf(motif) != -1){
				particule="dans la";
			}
			else if(((',40,64,22,08,78,92,66,88,65,79,04,05,06,13,').indexOf(motif)!=-1)){
				particule="dans les";
			}
			else if((',75,974,975,976,96,').indexOf(motif)!=-1){
				particule="à";
			}
			else if((',67,68,15,63,14,29,56,18,41,45,25,39,90,94,95,30,32,46,81,82,59,62,49,83,69,').indexOf(motif)!=-1){
				particule="dans le";
			}
			else{
				particule="en";
			}
		}

		return particule;
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