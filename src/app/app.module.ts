import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameCollectionComponent } from './game-collection/game-collection.component';
import { LobbyComponent } from './lobby/lobby.component';
import { GameThumbnailComponent } from './game-thumbnail/game-thumbnail.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { JackpotStripeComponent } from './jackpot-stripe/jackpot-stripe.component';
import { HttpClientModule } from '@angular/common/http';
import { GameService } from './services/game.service';
import { JackpotService } from './services/jackpot.service';

@NgModule({
  declarations: [
    AppComponent,
    GameCollectionComponent,
    LobbyComponent,
    NavBarComponent,
    JackpotStripeComponent,
    GameThumbnailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    GameService,
    JackpotService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
