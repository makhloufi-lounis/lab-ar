import {Injectable,Inject,  Renderer } from '@angular/core';
//import { DOCUMENT } from '@angular/platform/common_dom';
import {DOCUMENT} from '@angular/platform-browser';

@Injectable()
export class SeoService {

    private _renderer: Renderer;

    private _document: any;
    /**
     * Angular 2 Title Service
     */
    //private titleService: Title;
    /**
     * <head> Element of the HTML document
     */
    private headElement: any;//HTMLElement;
    /**
    <meta property="og:title" content="Title Here" />
    */
    private ogTitle: HTMLElement;
    /**
    <meta property="og:type" content="article" />
    */
    private ogType: HTMLElement;
    /**
    <meta property="og:url" content="http://www.example.com/" />
    */
    private ogUrl: HTMLElement;
    /**
    <meta property="og:image" content="http://example.com/image.jpg" />
    */
    private ogImage: HTMLElement;
    /**
    <meta property="og:description" content="Description Here" />
    */
    private ogDescription: HTMLElement;

    /**
     * Inject the Angular 2 Title Service
     * @param titleService
     */
    constructor(@Inject(DOCUMENT) private document: any, private renderer: Renderer) {

        this._renderer = renderer;
        //super();
        this._document = document;
        this.headElement = this._document.head;

       /* this.ogTitle = this.getOrCreateMetaElement('og:title','property');
        this.ogType = this.getOrCreateMetaElement('og:type','property');
        this.ogUrl = this.getOrCreateMetaElement('og:url','property');
        this.ogImage = this.getOrCreateMetaElement('og:image','property');
        this.ogDescription = this.getOrCreateMetaElement('og:description','property');*/
        
    }
    public setTitle(siteTitle = '',pageTitle ='',separator = ' / '){
        let title = siteTitle;
        if(pageTitle != '') title += separator + pageTitle;
        this._document.title = title;
    }
    /*
    *  Open graph
    */
    public setOgTitle(value: string) {
        this._renderer.setElementAttribute(this.ogTitle,'content',value);
    }
    public setOgType(value: string) {
        this._renderer.setElementAttribute(this.ogType,'content',value);
    }
    public setOgUrl(value: string) {
        this._renderer.setElementAttribute(this.ogUrl,'content',value);
    }
    public setOgImage(value: string) {
        this._renderer.setElementAttribute(this.ogImage,'content',value);
    }
    public setOgDescription(value: string) {
        this._renderer.setElementAttribute(this.ogDescription,'content',value);
    }

    public createLinkElement(url: string): HTMLLinkElement {
      let el: HTMLLinkElement ;       
      el = this.renderer.createElement(this.headElement,'link', null);
      this.renderer.setElementAttribute(el, "rel", "stylesheet");
      this.renderer.setElementAttribute(el, "href", url);
     
      return el;
  }
    /**
     * get the HTML Element when it is in the markup, or create it.
     * @param name
     * @returns {HTMLElement}
     */
    private getOrCreateMetaElement(name: string,attr: string): HTMLElement {

        let el: HTMLElement;
        var prop = ((attr != null)? attr : 'name');
        el = this._renderer.createElement(this.headElement,'meta',null);
        this._renderer.setElementAttribute(el,prop,name);
        
        return el;
    }
}