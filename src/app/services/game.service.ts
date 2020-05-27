import { Injectable } from '@angular/core';
import { Observable, from, of, forkJoin, combineLatest, throwError } from 'rxjs';
import { map, scan, mergeMap, tap, reduce, catchError, switchMap } from 'rxjs/operators';
import { Game } from '../game-collection/game-collection.model';
import { HttpClient } from '@angular/common/http';
import { JackpotService } from './jackpot.service';

@Injectable()
export class GameService {

    // Can be moved to indexedDB and stored in the state in case of NgRx implementation
    private cachedGames: Record<string, Game[]> | undefined;

    constructor(private http: HttpClient, private jackpotService: JackpotService) { }

    private getGames(): Observable<Game[]> {
        return this.http.get('http://stage.whgstage.com/front-end-test/games.php')
            .pipe(
                catchError((err) => throwError(err))
            ) as Observable<Game[]>;
    }

    private getProcessedGames(): Observable<Record<string, Game[]>> {
        return forkJoin([
            this.getGames(),
            this.jackpotService.getJackpots()
        ]).pipe(
            map(([games, jackpots]) => {
                const jackpotGames = games
                    .filter((game) => jackpots.some((jackpot) => game.id === jackpot.game))
                    .map((game) => ({ ...game, categories: [...game.categories, 'jackpots']}));

                return [...jackpotGames, ...games].filter((el, index, self) => self.findIndex((x) => x.id === el.id) === index);
            }),
            mergeMap((games) => from(games)
                .pipe(
                    reduce((acc, curr) => {
                        for (const category of curr.categories) {
                            if (acc[category]) {
                                acc = { ...acc, [category]: [...acc[category], curr] };
                            } else {
                                acc = { ...acc, [category]: [curr] };
                            }
                        }
                        return acc;
                    }, {})
                )
            )
        );
    }

    getCollections(ids: string[]): Observable<Game[]> {
        const games$ = this.cachedGames ? of(this.cachedGames) : this.getProcessedGames();
        return games$
            .pipe(
                tap((games) => {
                    if (!this.cachedGames) {
                        this.cachedGames = games;
                    }
                }),
                mergeMap((games) => from(ids)
                    .pipe(
                        scan((acc, curr) => acc.concat(games[curr]), [])
                    )
                )
            );
    }
}
