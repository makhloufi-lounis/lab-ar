export class Ville{

    static TYPE_LOCALISATION_GRAND_VILLE = 'grand_ville';

    private _id_ville              :number;
    private _code_insee            :number;
    private _nom_majuscule         :string;
    private _nom_ville             :string;
    private _code_postal           :string;
    private _id_departement        :string;
    private _lattitude             :number;
    private _longitude             :number;
    private _nb_habitants          :number;

   get idVille(){
        return this._id_ville;
   }
   
   get codeInsee(){
       return this._code_insee;
   }

   get nomMajuscule(){
       return this._nom_majuscule;
   }

   get nomVille(){
       return this._nom_ville;
   }

   get codePostal(){
       return this._code_postal;
   }

   get idDepartement(){
       return this._id_departement;
   }

   get lattitude(){
       return this._lattitude;
   }

   get longitude(){
       return this._longitude;
   }

   get nbHabitants(){
       return this._nb_habitants;
   }



   set idVille(id_ville){
       this._id_ville = id_ville;
   }
   
   set codeInsee(code_insee){
       this._code_insee = code_insee;
   }

   set nomMajuscule(nom_majuscule){
       this._nom_majuscule = nom_majuscule;
   }

   set nomVille(nom_ville){
       this._nom_ville = nom_ville;
   }

   set codePostal(code_postal){
       this._code_postal = code_postal;
   }

   set idDepartement(id_departement){
       this._id_departement = id_departement;
   }

   set lattitude(lattitude){
       this._lattitude = lattitude;
   }

   set longitude(longitude){
       this._longitude = longitude;
   }

   set nbHabitants(nb_habitants){
       this._nb_habitants = nb_habitants;
   }


}