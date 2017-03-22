export class Localisation{
   
    static TYPE_LOCALISATION_REGION = 'region';
    static TYPE_LOCALISATION_DEP = 'departement';

    private _id_localisation      : string;
    private _id_localisation_pere : string;
    private _nom_localisation     : string;
    private _dept                 : string;


    get idLocalisation(){
        return this._id_localisation;
    }

    get idLocalisationPere(){
        return this._id_localisation_pere;
    }

    get nomLocalisation(){
        return this._nom_localisation;
    }

    get departement(){
        return this._dept;
    }

    set idLocalisation(id_localisation){
        this._id_localisation = id_localisation;
    }

    set idLocalisationPere(id_localisation_pere){
        this._id_localisation_pere = id_localisation_pere;
    }

    set nomLocalisation(nom_localisation){
        this._nom_localisation = nom_localisation;
    }

    set departement(dep){
        this._dept = dep;
    }
}