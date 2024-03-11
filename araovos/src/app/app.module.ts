import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { NavComponent } from './components/nav/nav.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuModule } from 'primeng/menu';
import { HomeComponent } from './components/home/home.component';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ButtonModule,
    SidebarModule,
    TabMenuModule,
    MenuModule,
    CardModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
