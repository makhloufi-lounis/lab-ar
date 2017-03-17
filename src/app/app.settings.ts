export class AppSettings {
       
           
    private _meta_description : string = "";
    private _meta_keywords    : string = "";
    private _meta_robots      : string = "";

    private _link_prev        : string = "";
    private _link_next        : string = "";

    private _tabPage          :string = "accueil";

    constructor() {  }

       
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

    get tabPage(){
        return this._tabPage;
    }
    
    set tabPage(tabPage : string){
        this._tabPage = tabPage;
    }



}