import { Component, OnInit, Input } from '@angular/core';
import { Game } from '../game-collection/game-collection.model';
import { Observable } from 'rxjs';
import { JackpotService } from '../services/jackpot.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-game-thumbnail',
  templateUrl: './game-thumbnail.component.html',
  styleUrls: ['./game-thumbnail.component.scss']
})
export class GameThumbnailComponent implements OnInit {

  @Input() game: Game;

  public ribbonName$: Observable<string> | undefined;
  public jackpotAmount$: Observable<number> | undefined;
  private ribbonCategories = ['top', 'new'];

  constructor(private jackpotService: JackpotService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const { categories } = this.game;

    if (categories.includes('jackpots')) {
      this.jackpotAmount$ = this.jackpotService.pollJackpotValues(this.game.id);
    }

    this.ribbonName$ = this.route.url
      .pipe(
        map((url) =>
          categories.find((gameCategory) =>
            this.ribbonCategories.some((ribbonCategory) => ribbonCategory === gameCategory && url[0].path !== ribbonCategory)
          )
        )
      );
  }
}
