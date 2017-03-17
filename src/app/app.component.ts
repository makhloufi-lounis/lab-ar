import { Component, Directive, ElementRef, Renderer, ChangeDetectionStrategy, ViewEncapsulation, AfterViewInit, Inject } from '@angular/core';
import { SeoService, MetaDefinition, LinkDefinition, ScriptDefinition } from '../services/seo.service';
import { AuthenticationService } from '../services/authentication.service';
import { LocalisationsService } from '../services/localisations.service';
import { ApiService } from '../services/api.service';
import { MetaService } from 'ng2-meta';
import { Meta } from '../angular2-meta';
import { DOCUMENT } from '@angular/platform-browser';
import { Room } from '../model/room.model';
import { AppSettings } from './app.settings';
import { CONFIG } from '../config/local';
import { Utilisateur } from '../model/utilisateur.model';


import { CookieService } from 'angular2-cookie/services/cookies.service';
import { CookieBackendService } from 'angular2-cookie/services/cookies.backend.service';

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
    private _authenticationService:                   AuthenticationService;
    private _localisationService:                      LocalisationsService;
    private _settings :                               AppSettings;
    
    private _isAuth :                                 boolean = false;
    private _utilisateur:                             Utilisateur ;
    private _errorMessage:                            string;    
    private _config:                                  any ;

    private _today:                                   number;

    private _t_regions:                               any;                   
    
    private _cookieService:                           CookieService;

    mode = 'Observable';
    constructor(seoService: SeoService, authenticationService: AuthenticationService, apiService : ApiService, localisationsService : LocalisationsService, cookieService : CookieService) {
        this._config = CONFIG;
       this._seoService = seoService;
       this._authenticationService = authenticationService;
       this._localisationService = localisationsService;
       // Initialization of the project environment       
       this._settings = new AppSettings();
       this._utilisateur = new Utilisateur();
       this._today = Date.now();
       this._cookieService = cookieService;

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
     
     this._localisationService.initialize(this._config.root_url_ws);

     this.getRegionsFrance();

      // console.log( this._cookieService.get('PHPSESSID'));
     //console.log('Cookies: ', cookieParser('lounis.placedescommerces.com'));
     //console.log(Zone.current.get('req').cookies);
    // this.getCookie('lounis.placedescommerces.com') ;
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

    getRegionsFrance(){
        this._t_regions = this._localisationService.getAssocRegionsFrance();         
    }
    
    
    clicked(){
        console.log("test");
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