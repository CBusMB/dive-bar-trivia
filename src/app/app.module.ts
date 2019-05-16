import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { FetchService } from 'src/services/fetch.service';
import { GameBuilderService } from 'src/services/game-builder.service';
import { SessionTokenDataService } from 'src/services/session-token-data.service';
import { EnumValueConverterService } from 'src/services/enum-value-converter.service';
import { GameViewComponent } from './game-view/game-view.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AboutComponent,
    HomeComponent,
    GameComponent,
    GameViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [FetchService, GameBuilderService, SessionTokenDataService, EnumValueConverterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
