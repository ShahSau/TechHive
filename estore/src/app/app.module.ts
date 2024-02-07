import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

//import { CatnavigationComponent } from './home/components/catnavigation/catnavigation.component';
//import { HomeModule } from './home/home.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { MainpageComponent } from './mainpage/mainpage.component';
//import { HeaderComponent } from './home/components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    MainpageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    //HomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
