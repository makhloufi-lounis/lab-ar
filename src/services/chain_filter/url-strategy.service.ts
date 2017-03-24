import { Injectable} from '@angular/core';
import { ReplaceAccentsStrategyService } from './replace-accents-strategy.service';

@Injectable()
export class UrlStrategy{
    
    constructor(private replaceAccentsStrategyService: ReplaceAccentsStrategyService){ 

    }
    
    public filter(chain){
         
         chain = chain.replace(/(<([^>]+)>)/ig,"");
         chain = this.replaceAccentsStrategyService.filter(chain);
         chain = chain.toLowerCase();
         chain = chain.trim();
         chain = chain.replace(/\-+/ig,"");
         chain = chain.replace(/\:+/ig,"");
         chain = chain.replace(/\,+/ig,"");
         chain = chain.replace(/\'+/ig,"");
         chain = chain.replace(/\"+/ig,"");
         chain = chain.replace(/\/+/ig,"");
         chain = chain.replace(/\%+/ig,"");
         chain = chain.replace(/\s+/ig,"-");
         chain = chain.replace(/\?+/ig,"");
         chain = chain.replace(/\!+/ig,"");
         chain = chain.replace(/\€+/ig,"");
         chain = chain.replace(/\°+/ig,"");
         chain = chain.replace(/\_+/ig,"-");
         chain = chain.replace(/\.+/ig,"-");
         chain = chain.replace(/\*+/ig,"");
         chain = chain.replace(/\`+/ig,"");
         chain = chain.replace(/\’+/ig,"");
         chain = chain.replace(/\œ+/ig,"oe");
         chain = chain.replace(/\++/ig,"");

         return chain;
    }
    
}