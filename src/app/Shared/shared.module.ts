import { RouterModule } from '@angular/router';
import { AccountModule } from './../Account/account.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';

import {SidebarModule} from 'primeng/sidebar';
import {ButtonModule} from 'primeng/button';
import {CarouselModule} from 'primeng/carousel';
import {MenuModule} from 'primeng/menu';

import { FooterComponent } from './footer/footer.component';
import { FeaturesComponent } from './features/features.component';
import { CarouselComponent } from '../Home/carousel/carousel.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    CarouselComponent,
    FeaturesComponent,
  ],
  imports: [
    CommonModule,
    AccountModule,
    TabViewModule,
    SidebarModule,
    ButtonModule,
    MenuModule,
    CarouselModule,
    FontAwesomeModule,
    OverlayPanelModule,
    InputTextModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    CarouselComponent,
    FeaturesComponent
  ],
  providers: [
  ]
})
export class SharedModule { }
