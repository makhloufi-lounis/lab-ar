import { Component, Directive, ElementRef, Renderer, ChangeDetectionStrategy, ViewEncapsulation, AfterViewInit, Inject } from '@angular/core';
import { SeoService, MetaDefinition, LinkDefinition, ScriptDefinition } from '../services/seo.service';
import { ApiService } from '../services/api.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { CookieBackendService } from 'angular2-cookie/services/cookies.backend.service';
import { AuthenticationService } from '../services/authentication.service';
import { LocalisationsService } from '../services/localisations.service';
import { SecteurActiviteService } from '../services/secteurs.service';
import { VillesService } from '../services/villes.service';
import { ReplaceAccentsStrategyService } from '../services/chain_filter/replace-accents-strategy.service';
import { UrlStrategy } from '../services/chain_filter/url-strategy.service';

import { DOCUMENT } from '@angular/platform-browser';
import { Room } from '../model/room.model';
import { AppSettings } from './app.settings';
import { CONFIG } from '../config/local';
import { Utilisateur } from '../model/utilisateur.model';
import { Localisation } from '../model/localisation.model';
import { SecteurActivite } from '../model/secteur.model';
import { Ville } from '../model/ville.model';

import 'rxjs/add/operator/retry';
//
/////////////////////////
// ** Example Directive
// Notice we don't touch the Element directly

@Directive({
  selector: '[xLarge]'
})
export class XLargeDirective {
  constructor(element: ElementRef, renderer: Renderer) {
    // ** IMPORTANT **
    // we must interact with the dom through -Renderer-
    // for webworker/server to see the changes
    renderer.setElementStyle(element.nativeElement, 'fontSize', 'x-large');
    // ^^
  }
}

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
 
  selector: 'app',
  styleUrls: [ './app.component.css' ],
  templateUrl: './app.component.html',
})
export class AppComponent /*implements AfterViewInit*/{
 
    rooms : Array<Room> = []  ;

   
    private static META_DESC:                         MetaDefinition = {};
    private static META_KEYWORDS:                     MetaDefinition = {};
    private static META_ROBOTS:                       MetaDefinition = {};

    private static LINK_PREV:                         LinkDefinition = {};
    private static LINK_NEXT:                         LinkDefinition = {};
    private static LINK_STYLE:                        LinkDefinition = {};
    private static LINK_BOOSTRAP_VALIDATOR:           LinkDefinition = {};
    private static LINK_BOOSTRAP_MIN:                 LinkDefinition = {};

    private static SCRIPT_JQUERY_GOOGLE_1_7_0_MIN:    ScriptDefinition = {};
    private static SCRIPT_COOKIE:                     ScriptDefinition = {};
    private static SCRIPT_HEATMAP:                    ScriptDefinition = {};
    private static SCRIPT_BOOSTRAP_MIN:               ScriptDefinition = {};
    private static SCRIPT_BOOSTRAP_VALIDATOR:         ScriptDefinition = {};
    private static SCRIPT_JQUERY_BULLE_PDC:           ScriptDefinition = {};
    
    private _seoService :                             SeoService;
    private _cookieService:                           CookieService;   
    private _authenticationService:                   AuthenticationService;
    private _localisationService:                     LocalisationsService;
    private _secteursActiviteService:                 SecteurActiviteService;
    private _villesService:                           VillesService;
    private _replaceAccentsStrategyService:           ReplaceAccentsStrategyService;
    private _urlStrategy:                             UrlStrategy;
    
    private _utilisateur:                             Utilisateur;
    private _localisation:                            Localisation;
    private _ville:                                   Ville;   

    private _today:                                   number;
    private _isAuth :                                 boolean = false;
    private _t_regions:                               Array<Localisation>; 
    private _t_departements:                          Array<Localisation>;
    private _t_grand_villes:                          Array<Ville>; 
    private _villes:                                  Array<Ville>; 
    private _localisations:                           Array<Localisation>;
    private _secteurs_pere:                           Array<SecteurActivite>;
    private _length_secteurs_pere:                    number;
    private _secteurs:                                Array<SecteurActivite>;
    private _errorMessage:                            string; 
    
    
    private _settings :                               AppSettings;
    private _config:                                  any ;
       
    mode = 'Observable';

    newValue = '';


    constructor(
        seoService: SeoService, 
        cookieService : CookieService,
        authenticationService: AuthenticationService, 
        localisationsService : LocalisationsService, 
        secteursActiviteService: SecteurActiviteService,
        villesService: VillesService,
        replaceAccentsStrategyService :ReplaceAccentsStrategyService,
        urlStrategy: UrlStrategy,
    ) {
       // Initialization of the project environment 
       this._config = CONFIG;
       this._settings = new AppSettings();
       this._cookieService = cookieService;
       this._seoService = seoService;
       this._authenticationService = authenticationService;
       this._localisationService = localisationsService;
       this._secteursActiviteService = secteursActiviteService;
       this._villesService = villesService; 
       this._replaceAccentsStrategyService = replaceAccentsStrategyService;
       this._urlStrategy =  urlStrategy;     
       this._utilisateur = new Utilisateur();
       this._localisation = new Localisation();
       this._today = Date.now();
    }


    ngOnInit():void{
      this._settings.tabPage ='annuairerepreneur';

      if(this._settings.metaDescription === ""){
          AppComponent.META_DESC = {name: 'description', content: 'Achat et vente de commerces, locaux commerciaux et petites entreprises'};
      }else{
          AppComponent.META_DESC = {name: 'description', content: this._settings.metaDescription};
      }

      if(this._settings.metaKeywords === ""){
          AppComponent.META_KEYWORDS = {name: 'keywords', content: 'place des commerces, PDC'};
      }else{
          AppComponent.META_KEYWORDS = {name: 'keywords', content: this._settings.metaDescription};
      }

      if(this._settings.metaRobots === ""){
          AppComponent.META_ROBOTS = {name: 'robots', content: 'noindex,follow'};
      }else{
          AppComponent.META_ROBOTS = {name: 'robots', content: this._settings.metaRobots};
      }
      
      this._seoService.addTagsMeta([AppComponent.META_DESC, AppComponent.META_KEYWORDS, AppComponent.META_ROBOTS ]) ;

      if(this._settings.linkPrev !== ""){
          AppComponent.LINK_PREV = {rel: 'prev' , href: this._settings.linkPrev};
      }
      if(this._settings.linkNext !== ""){
          AppComponent.LINK_NEXT = {rel: 'next' , href: this._settings.linkNext};
      }
      

      AppComponent.LINK_STYLE = {rel: 'stylesheet' , href: this._config.dns_placedescommerces+'/css/style.css'};
      AppComponent.LINK_BOOSTRAP_VALIDATOR = {rel: 'stylesheet' , href: this._config.dns_placedescommerces+'/javascript/bootstrap-validator/bootstrapValidator.min.css'};
      AppComponent.LINK_BOOSTRAP_MIN = {rel: 'stylesheet' , href: this._config.dns_placedescommerces+'/javascript/bootstrap3/css/bootstrap.min.css'};
      
      this._seoService.addTagsLink([AppComponent.LINK_PREV, AppComponent.LINK_NEXT, AppComponent.LINK_STYLE, AppComponent.LINK_BOOSTRAP_VALIDATOR, AppComponent.LINK_BOOSTRAP_MIN]);

      AppComponent.SCRIPT_JQUERY_GOOGLE_1_7_0_MIN = {type:'text/javascript', src:this._config.dns_placedescommerces+'/javascript/jquery/jquery-google.1.7.0.min.js'}  
      AppComponent.SCRIPT_COOKIE = {type:'text/javascript', src:this._config.dns_placedescommerces+'/javascript/cookie.js'}  
      AppComponent.SCRIPT_HEATMAP = {type:'text/javascript', src:this._config.dns_placedescommerces+'/javascript/heatmap.js'}
      AppComponent.SCRIPT_BOOSTRAP_MIN = {type:'text/javascript', src:this._config.dns_placedescommerces+'/javascript/bootstrap3/js/bootstrap.min.js'}
      AppComponent.SCRIPT_BOOSTRAP_VALIDATOR = {type:'text/javascript', src:this._config.dns_placedescommerces+'/javascript/bootstrap-validator/bootstrapValidator.js'}
      AppComponent.SCRIPT_JQUERY_BULLE_PDC = {type:'text/javascript', src:this._config.dns_fusacq+'/javascript/bulles/jquery.bulle_pdc.js'}  
    

      this._seoService.addTagsScript([AppComponent.SCRIPT_JQUERY_GOOGLE_1_7_0_MIN, 
                                          AppComponent.SCRIPT_COOKIE, 
                                          AppComponent.SCRIPT_HEATMAP, 
                                          AppComponent.SCRIPT_BOOSTRAP_MIN,
                                          AppComponent.SCRIPT_BOOSTRAP_VALIDATOR, 
                                          AppComponent.SCRIPT_JQUERY_BULLE_PDC
                                      ]);
     
    
     
     this.isAuthenticated(this._config.dns_placedescommerces);
     
     this.getLocalisationsFrance(this._config.root_url_ws, Localisation.TYPE_LOCALISATION_REGION);
     this.getLocalisationsFrance(this._config.root_url_ws, Localisation.TYPE_LOCALISATION_DEP);
     this.getVillesFrance(this._config.api_commerces.root_url, this._config.api_commerces.key, Ville.TYPE_LOCALISATION_GRAND_VILLE);
     this.getSecteursCommerces(this._config.api_commerces.root_url, this._config.api_commerces.key, SecteurActivite.TYPE_PERE)
    

      //this.roomService.getTopFive().subscribe(rooms => this.rooms)
        /* console.log("teste");
         this.seoService.getTopFive().subscribe(
             r => th(is.rooms = r
         );

        console.log(this.rooms);*/
    }

    isAuthenticated(baseUrl) {
        this._authenticationService.isAuth(baseUrl)
                         .retry(3)
                         .subscribe(
                               res => { 
                                   this._isAuth = res.is_auth,
                                   this._utilisateur = res.utilisateur                               
                               },
                               error =>  this._errorMessage = <any>error
                           );  
    }

    getLocalisationsFrance(webserviceUrl, type){
        this._localisationService.getLocalisations(webserviceUrl)
                    .retry(3)
                    .subscribe(
                        localisations =>{
                             switch(type){
                                 case 'region':
                                     this._t_regions = this._localisationService.getRegionsFrance(localisations);
                                     break;
                                 case 'departement':
                                     this._t_departements = this._localisationService.getDepartementFrance(localisations);
                                     break;
                                 default:
                                     this._localisations = localisations;
                                     break;                                     
                             }
                        }, 
                        error =>  this._errorMessage = <any>error           
                  ); 
    }
      
    getVillesFrance(apiCommercesUrl, key, type){
        this._villesService.getVilles(apiCommercesUrl, key)
                    .retry(3)
                    .subscribe(
                        villes => {
                            switch(type){
                                 case 'grand_ville':
                                    this._t_grand_villes = this._villesService.getListeGrandVilles(villes);
                                    break;
                                default:
                                     this._villes = villes;
                                     break;
                            }
                        },
                        error  =>  this._errorMessage = <any>error           
                  ); 
    }
    
    getSecteursCommerces(apiCommercesUrl, key, type){
            this._secteursActiviteService.getSecteursActivite(apiCommercesUrl, key, type)
                    .retry(3)
                    .subscribe(
                        secteurs =>{
                             switch(type){
                                 case SecteurActivite.TYPE_PERE:
                                     this._secteurs_pere = secteurs;
                                     this._length_secteurs_pere = secteurs.length; 
                                     break;                                
                                 default:
                                     this._secteurs = secteurs;
                                     break;                                     
                             }
                        }, 
                        error =>  this._errorMessage = <any>error           
                  );            
    }
    
    getNomAffiche(denomination_liste, nom_secteur_activite){
        let strReturned = 'Vente ';
        if(denomination_liste == null || denomination_liste == ""){
            strReturned += nom_secteur_activite;
        }else{
            strReturned += denomination_liste;
        }
        
        return strReturned;
    }

    getTermeLocRegion(region){
        let termLocalisation: string = "";
        let idRegion = region.id_localisation;
        let nomLocalisation = this.getNomRegion(idRegion, region.nom_localisation);
        if(idRegion.match(/^33_[0-9]+_99$/)){
            nomLocalisation = Localisation.TYPE_LOCALISATION_CONFIDENTIEL;
        }
        if(idRegion != "" && idRegion.match(/^33_[0-9_AB]+$/)){
            termLocalisation = `${this._localisationService.getPrticuleDansCorrespondantLocalisation(idRegion)} ${nomLocalisation}`;
        }
        return termLocalisation;
    }

    getNomRegion(id_region, nom_region){
        if(id_region == "33_21"){
            return "PACA";
        }else{
            return nom_region;
        }
    }

    getComplementUrl(chain){
       return  this._urlStrategy.filter(chain);
    }
    
    clicked(){
        console.log("test");
    }

    addTodo(){
        console.log(this.newValue);
         console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
         console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
         console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
         console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    }
    

    hack(val) {
        if(val != undefined && val != 'undefined' && val!= null){
          console.log('Before:');
          console.log(val);
          val = Array.from(val);
          console.log('After:');
          console.log(val);
          return val;
        }
    }
    /*constructor(private metaService: MetaService) {
        metaService.setTitle('Product page for ');
        metaService.setTag('author', "Test");
    }*/


    /*constructor(private metaService: Meta) {
        metaService.updateTag('name=description', {name: 'description', content: 'New description'});
    }*/

  /*constructor(@Inject(DOCUMENT) private document: any, private renderer: Renderer) {
      const elem = this.renderer.createElement(this.document.head, 'link');
      renderer.setElementAttribute(elem, "rel", "stylesheet");
      renderer.setElementAttribute(elem, "href", "http://lounis.placedescommerces.com/css/style.css");
  }

  ngAfterViewInit(): void {
        let headChildren = this.document.head.children;
        for (let i = 0; i < headChildren.length; i++) {
          let element = headChildren[i];
          if(element.name === 'title') this.renderer.setText(element, 'App title');
          if(element.name === 'meta' && element.attribs.name === 'description') 
          this.renderer.setElementAttribute(element, 'content', 'I am a translated string');
        }

        // To add new meta
        const elem = this.renderer.createElement(this.document.head, 'meta');
        this.renderer.setElementProperty(elem, 'name', 'foo');
  }*/

}