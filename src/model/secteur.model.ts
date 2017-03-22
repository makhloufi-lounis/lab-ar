export class SecteurActivite{
   
    static DIMENTION_DEUX = 2;
    private _id_secteur_activite      : number;
    private _id_secteur_activite_pere : number;
    private _nom_secteur_activite     : string;


    get idSecteurActivite(){
        return this._id_secteur_activite;
    }

    get idSecteurActivitePere(){
        return this._id_secteur_activite_pere;
    }

    get nomSecteurActivite(){
        return this._nom_secteur_activite;
    }
   
    set idSecteurActivite(id_secteur_activite){
        this._id_secteur_activite = id_secteur_activite;
    }

    set idSecteurActivitePere(id_secteur_activite_pere){
        this._id_secteur_activite_pere = id_secteur_activite_pere;
    }

    set nomSecteurActivite(nom_secteur_activite){
        this._nom_secteur_activite = nom_secteur_activite;
    }

}