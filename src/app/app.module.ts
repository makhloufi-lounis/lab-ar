import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { HomeModule } from './+home/home.module';
/*import { AboutModule } from './+about/about.module';*/
/*import { TodoModule } from './+todo/todo.module';*/

import { SeoService } from '../services/seo.service';
import { ApiService } from '../services/api.service';
import { Title }    from '@angular/platform-browser';
import { MetaService } from 'ng2-meta';
import { Meta } from '../angular2-meta';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, XLargeDirective } from './app.component';

import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [ AppComponent, XLargeDirective],
  providers: [SeoService, ApiService, Title, MetaService, Meta ],
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
