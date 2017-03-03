/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Injectable, Inject} from '@angular/core';

import {DomAdapter, getDOM} from '@angular/platform-browser/src/dom/dom_adapter';

import { DOCUMENT } from '@angular/platform-browser';


import { Room } from './../model/room.model';
import { ApiService } from './api.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/retry';

export interface MetaDefinition {
  charset?: string;
  content?: string;
  httpEquiv?: string;
  id?: string;
  itemprop?: string;
  name?: string;
  property?: string;
  scheme?: string;
  url?: string;
  [prop: string]: string;
}

export interface LinkDefinition {
  rel?: string;
  href?: string;
}


@Injectable()
export class SeoService {
  
  private _dom: DomAdapter = getDOM();

  constructor(@Inject(DOCUMENT) private _document: any, private apiService : ApiService) {
  }
  /**
   * Adds a new link tag to the dom.
   * Example
   * const style: LinkDefinition = {rel: 'stylesheet' , href: 'url to css'};
   * this.seoService.addTagsLink([style]);
   * 
   * @param tags
   * @returns {HTMLLinkElement[]}
   */
  public addTagsLink(...tags: Array<LinkDefinition|LinkDefinition[]>): void {
    const presentTags = this._flattenArray(tags);
    if (presentTags.length !== 0){ 
      presentTags.map((tag: LinkDefinition) => this._addTagLink(tag));
    }
  }

  /**
   * Adds a new meta tag to the dom.
   * Example
   * const name: MetaDefinition = {name: 'application-name', content: 'Name of my application'};
   * this.seoService.addTagsLink([name]);
   * 
   * @param tags
   * @returns {HTMLMetaElement[]}
   */
  public addTagsMeta(...tags: Array<MetaDefinition|MetaDefinition[]>): void {
    const presentTags = this._flattenArray(tags);
    if (presentTags.length !== 0){
      presentTags.map((tag: MetaDefinition) => this._addInternal(tag));
    }
  }

  /**
   * Gets the meta tag by the given selector. Returns element or null
   * if there's no such meta element.
   *  Example
   * const meta: HTMLMetaElement = this.seoService.getTagMeta('name=description');
   * 
   * @param selector
   * @returns {HTMLMetaElement}
   */
  public getTagMeta(selector: string): HTMLMetaElement {
    if (!selector) return null;
    return this._dom.query(`meta[${selector}]`);
  }

  /**
   * Gets the link tag by the given selector. Returns element or null
   * if there's no such link element.
   * Example
   * const link: HTMLMetaElement = this.seoService.getTagLink('href=url');
   * 
   * @param selector
   * @returns {HTMLLinkElement}
   */
  public getTagLink(selector: string): HTMLLinkElement {
    if (!selector) return null;
    return this._dom.query(`link[${selector}]`);
  }

  /**
   * Updates the meta tag with the given selector.
   * Example
   * const meta: HTMLMetaElement = this.seoService.updateTagMeta('name=description', {name: 'description', content: 'New description'});
   * 
   * @param selector
   * @param tag updated tag definition
   * @returns {HTMLMetaElement}
   */
  public updateTagMeta(selector: string, tag: MetaDefinition): HTMLMetaElement {
    const meta: HTMLMetaElement = this.getTagMeta(selector);
    if (!meta) {
      // create element if it doesn't exist
      return this._addInternal(tag);
    }
    return this._prepareMetaElement(tag, meta);
  }

  /**
   * Updates the link tag with the given selector.
   * Example
   * const link: HTMLLinkElement = this.seoService.updateTagLink('href=url', {href: 'new url'});
   * 
   * @param selector
   * @param tag updated tag definition
   * @returns {HTMLMetaElement}
   */
  public updateTagLink(selector: string, tag: LinkDefinition): HTMLLinkElement {
    const link: HTMLLinkElement = this.getTagLink(selector);
    if (!link) {
      // create element if it doesn't exist
      return this._addTagLink(tag);
    }
    return this._prepareLinkElement(tag, link);
  }


  /**
   * Removes meta tag with the given selector from the dom.
   * Example
   * this.seoService.removeTagMetaBySelector('name=description');
   * 
   * @param selector
   */
  public removeTagMetaBySelector(selector: string): void {
    const meta: HTMLMetaElement = this.getTagMeta(selector);
    this.removeTagMetaElement(meta);
  }


  /**
   * Removes link tag with the given selector from the dom.
   * Example
   * this.seoService.removeTagLinkBySelector('href=url');
   * 
   * @param selector
   */
  public removeTagLinkBySelector(selector: string): void {
    const link: HTMLLinkElement = this.getTagLink(selector);
    this.removeTagLinkElement(link);
  }

  /**
   * Removes given meta element from the dom.
   * Example
   * const elem: HTMLMetaElement = this.seoService.getTagMeta('name=description');
   * this.seoService.removeTagElement(elem);
   * 
   * @param meta meta element
   */
  public removeTagMetaElement(meta: HTMLMetaElement): void {
    if (meta) {
      this._removeMetaElement(meta);
    }
  }

  /**
   * Removes given link element from the dom.
   * Example
   * const elem: HTMLLinkElement = this.seoService.getTagLink('href=url');
   * this.seoService.removeTagLinkElement(elem);
   * 
   * @param meta meta element
   */
  public removeTagLinkElement(link: HTMLLinkElement): void {
    if (link) {
      this._removeLinkElement(link);
    }
  }




  private _addTagLink(tag : LinkDefinition): HTMLLinkElement {
     const link: HTMLLinkElement = this._createLinkElement();
     this._prepareLinkElement(tag, link);
     this._appendLinkElement(link);
     return link;
  }

  private _addInternal(tag: MetaDefinition): HTMLMetaElement {
    const meta: HTMLMetaElement = this._createMetaElement();
    this._prepareMetaElement(tag, meta);
    this._appendMetaElement(meta);
    return meta;
  }

  private _createLinkElement(): HTMLLinkElement {
    return this._dom.createElement('link') as HTMLLinkElement;
  }

  private _createMetaElement(): HTMLMetaElement {
    return this._dom.createElement('meta') as HTMLMetaElement;
  }

  private _prepareLinkElement(tag: LinkDefinition, el: HTMLLinkElement): HTMLLinkElement {
    Object.keys(tag).forEach((prop: string) => this._dom.setAttribute(el, prop, tag[prop]));
    return el;
  }

  private _prepareMetaElement(tag: MetaDefinition, el: HTMLMetaElement): HTMLMetaElement {
    Object.keys(tag).forEach((prop: string) => this._dom.setAttribute(el, prop, tag[prop]));
    return el;
  }

  private _appendLinkElement(link: HTMLLinkElement): void {
    //const head = this._dom.getElementsByTagName(this._dom.defaultDoc(), 'head')[0];
    const head = this._document.head;
    this._dom.appendChild(head, link);
  }

  private _appendMetaElement(meta: HTMLMetaElement): void {
    //const head = this._dom.getElementsByTagName(this._dom.defaultDoc(), 'head')[0];
    const head = this._document.head;
    this._dom.appendChild(head, meta);
  }

  private _removeLinkElement(link: HTMLLinkElement): void {
    const head = this._dom.parentElement(link);
    this._dom.removeChild(head, link);
  }

  private _removeMetaElement(meta: HTMLMetaElement): void {
    const head = this._dom.parentElement(meta);
    this._dom.removeChild(head, meta);
  }

  private _flattenArray(input: any[], out: any[] = []): any[] {
    if (input) {
      for (let i = 0; i < input.length; i++) {
        const item: any = input[i];
        if (Array.isArray(item)) {
          this._flattenArray(item, out);
        } else if (item) {
          out.push(item);
        }
      }
    }
    return out;
  }

  /*getTopFive() : Observable<Room[]>{
        //let rooms : Array<Room> = this.apiService.getRooms();
        return this.apiService.getRooms();
  }*/
}
