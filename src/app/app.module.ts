import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Title }    from '@angular/platform-browser';

import { HomeModule } from './+home/home.module';
/*import { AboutModule } from './+about/about.module';*/
/*import { TodoModule } from './+todo/todo.module';*/

import { SeoService } from '../services/seo.service';
import { ApiService } from '../services/api.service';
import { AuthenticationService } from '../services/authentication.service';
import { LocalisationsService } from '../services/localisations.service';
import { SecteurActiviteService } from '../services/secteurs.service';

import { MetaService } from 'ng2-meta';
import { Meta } from '../angular2-meta';

import { CookieService } from 'angular2-cookie/services/cookies.service';
import { CookieBackendService } from 'angular2-cookie/services/cookies.backend.service';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent, XLargeDirective } from './app.component';
import { SharedModule } from './shared/shared.module';

import { LOCALE_ID } from '@angular/core';
@NgModule({
  declarations: [ AppComponent, XLargeDirective],
  providers: [SeoService, ApiService, AuthenticationService, Title, MetaService, Meta, LocalisationsService, SecteurActiviteService,
    { provide: LOCALE_ID, useValue: "fr" },
    { provide: CookieService, useClass: CookieBackendService }
     ],
  imports: [
    SharedModule,
    HomeModule,
    /*AboutModule,
    TodoModule,*/
    AppRoutingModule,
  ]
})
export class AppModule {
}

export { AppComponent } from './app.component';
