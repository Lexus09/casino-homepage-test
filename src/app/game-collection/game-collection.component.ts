import { Component, Input } from '@angular/core';
import { Game } from './game-collection.model';

@Component({
  selector: 'app-game-collection',
  templateUrl: './game-collection.component.html',
  styleUrls: ['./game-collection.component.scss']
})
export class GameCollectionComponent {

  @Input() gameCollection: Game[];

  trackByGameId(_, item: Game): string {
    return item.id;
  }

}
