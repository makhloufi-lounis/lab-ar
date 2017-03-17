
export class AppConfiguration{
    private static ENVIRONMENT = "local";
    
    private _dns_placedescommerces : string = "";
    private _dns_placedesfranchises : string = "";
    private _dns_fusacq : string = "";
    
    private _meta_description : string = "";
    private _meta_keywords : string = "";
    private _meta_robots : string = "";

    private _link_prev : string = "";
    private _link_next : string = "";

    constructor(environment: string) {
          this.initEnvironment(environment);
    }

    private initEnvironment(e : string): void{
         switch(e){
             case "local":
                 this._dns_placedescommerces = "http://lounis.placedescommerces.com" ;
                 this._dns_placedesfranchises = "http://lounis.placedesfranchises.com";
                 this._dns_fusacq = "http://lounis.fusacq.com";
                 break;
            case "dev":
                 this._dns_placedescommerces = "http://dev.placedescommerces.com" ;
                 this._dns_placedesfranchises = "http://dev.placedesfranchises.com";
                 this._dns_fusacq = "http://dev.fusacq.com";
                 break;
            case "prod":
                 this._dns_placedescommerces = "http://www.placedescommerces.com" ;
                 this._dns_placedesfranchises = "http://www.placedesfranchises.com";
                 this._dns_fusacq = "http://www.fusacq.com";
                 break;
            default :
                 this._dns_placedescommerces = "http://www.placedescommerces.com" ;
                 this._dns_placedesfranchises = "http://www.placedesfranchises.com";
                 this._dns_fusacq = "http://www.fusacq.com";
                 break;
         }
    }

    get dnsPlacedescommerces(): string{
       return this._dns_placedescommerces;
    }

    set dnsPlacedescommerces(dns_pdc : string){
         this._dns_placedescommerces = dns_pdc;
    }

    get dnsPlacedesfranchises(): string{
       return this._dns_placedesfranchises;
    }

    set dnsPlacedesfranchises(dns_franchises : string){
         this._dns_placedescommerces = dns_franchises;
    }

    get dnsFusacq(): string{
       return this._dns_fusacq;
    }

    set dnsFusacq(dns_fusacq : string){
         this._dns_fusacq = dns_fusacq;
    }

    get metaDescription(): string{
       return this._meta_description;
    }

    set metaDescription(meta_desc : string){
         this._meta_description = meta_desc;
    }

    get metaKeywords(): string{
       return this._meta_keywords;
    }

    set metaKeywords(meta_keywords : string){
         this._meta_keywords = meta_keywords;
    }

    get metaRobots(): string{
       return this._meta_robots;
    }

    set metaRobots(meta_robots : string){
         this._meta_robots = meta_robots;
    }

    get linkPrev(): string{
       return this._link_prev;
    }

    set linkPrev(link_prev : string){
         this._link_prev = link_prev;
    }

    get linkNext(): string{
       return this._link_next;
    }

    set linkNext(link_next : string){
         this._link_next = link_next
    }


}