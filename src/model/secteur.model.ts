export class SecteurActivite{
   
    static TYPE_PERE = 'father';
    static TYPE_ENFANTS = 'children';
    private _id_secteur_activite       : number;
    private _id_secteur_activite_pere  : number;
    private _nom_secteur_activite      : string;
    private _ciblage_adserveur_pdc     : string;
    private _nom_majuscule             : string;
    private _synonymes                 : string;
    private _mots_cles                 : string;
    private _code_naf                  : string;
    private _nom_code_naf              : string;
    private _denomination_liste        : string;
    private _denomination_annonce      : string;


    get idSecteurActivite(){
        return this._id_secteur_activite;
    }

    get idSecteurActivitePere(){
        return this._id_secteur_activite_pere;
    }

    get nomSecteurActivite(){
        return this._nom_secteur_activite;
    }

    get ciblageAdserveurPdc(){
        return this._ciblage_adserveur_pdc;
    }

    get nomMmajuscule(){
        return this._nom_majuscule;
    }

    get synonymes(){
        return this._synonymes;
    }

    get motsCles(){
        return this._mots_cles;
    }

    get codeNaf(){
        return this._code_naf;
    }   

    get nomCodeNaf(){
        return this._nom_code_naf;
    }

     get denominationListe(){
        return this._denomination_liste;
    }

    get denominationAnnonce(){
        return this._denomination_annonce;
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

    set ciblageAdserveurPdc(ciblage_adserveur_pdc){
        this._ciblage_adserveur_pdc = ciblage_adserveur_pdc;
    }

    set nomMmajuscule(nom_majuscule){
        this._nom_majuscule = nom_majuscule;
    }

    set synonymes(synonymes){
        this._synonymes = synonymes;
    }

    set motsCles(mots_cles){
        this._mots_cles = mots_cles;
    }

    set codeNaf(code_naf){
        this._code_naf = code_naf;
    }   

    set nomCodeNaf(nom_code_naf){
        this._nom_code_naf = nom_code_naf;
    }

     set denominationListe(denomination_liste){
        this._denomination_liste = denomination_liste;
    }

    set denominationAnnonce(denomination_annonce){
        this._denomination_annonce = denomination_annonce;
    }

}