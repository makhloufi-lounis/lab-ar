import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'annuaire-repreneur.html', component: HomeComponent }
    ])
  ]
})
export class HomeRoutingModule { }
