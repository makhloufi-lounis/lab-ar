import { Component, Directive, ElementRef, Renderer, ChangeDetectionStrategy, ViewEncapsulation, AfterViewInit, Inject } from '@angular/core';
import { SeoService } from '../services/seo.service';
import { MetaDefinition } from '../services/seo.service';
import { LinkDefinition } from '../services/seo.service';
import { MetaService } from 'ng2-meta';
import { Meta } from '../angular2-meta';
import { DOCUMENT } from '@angular/platform-browser';
import { Room } from '../model/room.model';
import { Configuration } from './app.config';
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
  template: `
  <!-- Header : logo, mega-banner -->
        <div id="extra" class="hidden-xs">
            <ul>
                <li class="suivez">Suivez-nous :</li>
                <li class="pic">&nbsp;<img id="follow_fb" src="{{ this._config.dnsPlacedescommerces }}/fr/css/images/facebook-icon.gif" alt="facebook icon" width="16" height="16" style="cursor:pointer;"/></li>
                <li class="pic">&nbsp;<img id="follow_twitter"
                                           src="{{ this._config.dnsPlacedescommerces }}/images/twitter-bird-white-on-blue.gif"
                                           width="16" height="16" style="cursor: pointer;" /></li>
                <li class="pic"><div><a title="Rejoignez Place des commerces sur Google+" href="//plus.google.com/+Placedescommerces_Achat_Vente_Commerces"
                                        rel="publisher" target="_top" style="text-decoration:none;">
                            <img src="{{ this._config.dnsPlacedescommerces }}/fr/css/bouton/gplus-16.png" alt="Place des Commerces - Achat & vente de commerces" style="border:0;width:16px;height:16px;"/>
                        </a></div></li>
                <li class="pic"><div><a title="Rejoignez Place des commerces sur Viadeo" href="http://www.viadeo.com/fr/profile/place.des-commerces"
                                        rel="publisher" target="_top" style="text-decoration:none;">
                            <img src="{{ this._config.dnsPlacedescommerces }}/fr/css/bouton/viadeo.png" alt="Place des Commerces - Achat & vente de commerces" style="border:0;width:16px;height:16px;"/>
                        </a></div></li>

                <li><a title="FUSACQ - Achat &amp; vente d'entreprises" href="{{ this._config.dnsFusacq }}" >FUSACQ - Achat &amp; vente d'entreprises</a></li>
                <li>&#124;</li>
                <li><a title="Place des Franchises - Entreprendre en réseau" href="{{ this._config.dnsPlacedesfranchises }}" >Place des Franchises - Entreprendre en réseau</a></li>
            </ul>
        </div>
       <div id="header" class="hidden-xs">
            <div id="logo">
                <table class="nocell"><tr>
                        <td class="align-right">
                            <a href="/"  class="lien_accueil" title="Place des Commerces"><img src="{{ this._config.dnsPlacedescommerces }}/images/v4_site.jpg" alt="Place des Commerces" title="Place des Commerces" width="216" height="74" class="noborder"/></a></td></tr>
                    <tr>
                        <td class="align-right"><span style="text-align:right;line-height: 10px;font-size: 10px;">Achat &amp; vente de commerces<br/> et locaux commerciaux</span></td>
                    </tr>
                </table>
            </div>
            <!-- FIN logo -->
            <div id="f71dbe52628a3f83a77ab494817525c6">
                   <!--<megabanner></megabanner>-->
                   <script type="text/javascript">
			                    if( ! (window.canRunAds === undefined) ){
				                       $('#f71dbe52628a3f83a77ab494817525c6').empty();
			                     }
			             </script>
				           <div id='4A2BE78608B85DABA4216E0B9362B770' style='height:90px; width:728px;'>
			 	                 <script type='text/javascript'>
				                     googletag.cmd.push(function() { googletag.display('4A2BE78608B85DABA4216E0B9362B770'); });
			                   </script>
				           </div> 
				           <script type="text/javascript">
			        	       if( (window.canRunAds === undefined) ){
				            	       $('#4A2BE78608B85DABA4216E0B9362B770').remove();
				                }
				          </script>
            </div>
        </div>
        <!-- FIN Header -->
        
      <main>
        <router-outlet></router-outlet>
      </main>
  `
})
export class AppComponent /*implements AfterViewInit*/{
 
    rooms : Array<Room> = []  ;
    private static META_DESC:                 MetaDefinition = {};
    private static META_KEYWORDS:             MetaDefinition = {};
    private static META_ROBOTS:               MetaDefinition = {};

    private static LINK_PREV:                 LinkDefinition = {};
    private static LINK_NEXT:                 LinkDefinition = {};
    private static LINK_STYLE:                LinkDefinition = {};
    private static LINK_BOOSTRAP_VALIDATOR:   LinkDefinition = {};
    private static LINK_BOOSTRAP_MIN:         LinkDefinition = {};

    private _seoService : SeoService;
    private _config : Configuration;

    constructor(seoService: SeoService) {
       this._seoService = seoService;
       // Initialization of the project environment
       this._config = new Configuration("local");
    }

    ngOnInit():void{

      if(this._config.metaDescription === ""){
          AppComponent.META_DESC = {name: 'description', content: 'Achat et vente de commerces, locaux commerciaux et petites entreprises'};
      }else{
          AppComponent.META_DESC = {name: 'description', content: this._config.metaDescription};
      }

      if(this._config.metaKeywords === ""){
          AppComponent.META_KEYWORDS = {name: 'keywords', content: 'place des commerces, PDC'};
      }else{
          AppComponent.META_KEYWORDS = {name: 'keywords', content: this._config.metaDescription};
      }

      if(this._config.metaRobots === ""){
          AppComponent.META_ROBOTS = {name: 'robots', content: 'noindex,follow'};
      }else{
          AppComponent.META_ROBOTS = {name: 'robots', content: this._config.metaRobots};
      }
      
      this._seoService.addTagsMeta([AppComponent.META_DESC, AppComponent.META_KEYWORDS, AppComponent.META_ROBOTS ]) ;

      if(this._config.linkPrev !== ""){
          AppComponent.LINK_PREV = {rel: 'prev' , href: this._config.linkPrev};
      }
      if(this._config.linkNext !== ""){
          AppComponent.LINK_NEXT = {rel: 'next' , href: this._config.linkNext};
      }
      
      AppComponent.LINK_STYLE = {rel: 'stylesheet' , href: this._config.dnsPlacedescommerces+'/css/style.css'};
      AppComponent.LINK_BOOSTRAP_VALIDATOR = {rel: 'stylesheet' , href: this._config.dnsPlacedescommerces+'/javascript/bootstrap-validator/bootstrapValidator.min.css'};
      AppComponent.LINK_BOOSTRAP_MIN = {rel: 'stylesheet' , href: this._config.dnsPlacedescommerces+'/javascript/bootstrap3/css/bootstrap.min.css'};
      
      this._seoService.addTagsLink([AppComponent.LINK_PREV, AppComponent.LINK_NEXT, AppComponent.LINK_STYLE, AppComponent.LINK_BOOSTRAP_VALIDATOR, AppComponent.LINK_BOOSTRAP_MIN]);

      //this.roomService.getTopFive().subscribe(rooms => this.rooms)
        /* console.log("teste");
         this.seoService.getTopFive().subscribe(
             r => this.rooms = r
         );

        console.log(this.rooms);*/
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