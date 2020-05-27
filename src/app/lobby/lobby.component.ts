import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { lobbyConst } from './lobby.const';
import { GameService } from '../services/game.service';
import { Game } from '../game-collection/game-collection.model';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

  public gameCollection$: Observable<Game[]> | undefined;
  public menuItems: Readonly<Record<string, any>> | undefined;

  constructor(private route: ActivatedRoute, private gameService: GameService) { }

  ngOnInit(): void {
    this.menuItems = lobbyConst.lobbyMenuItems;

    this.gameCollection$ = this.route.queryParams
      .pipe(
        switchMap((params) => this.gameService.getCollections(Object.values(params)))
      );
  }
}
