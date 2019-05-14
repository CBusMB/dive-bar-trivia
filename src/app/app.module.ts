import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { FetchService } from './fetch.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AboutComponent,
    HomeComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [FetchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
