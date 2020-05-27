import { Injectable } from '@angular/core';
import { Observable, timer, throwError } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Jackpot } from '../jackpot-stripe/jackpot-stripe.model';

@Injectable()
export class JackpotService {
    constructor(private http: HttpClient) {}

    getJackpots(): Observable<Jackpot[]> {
        return this.http.get('http://stage.whgstage.com/front-end-test/jackpots.php')
            .pipe(
                catchError((err) => throwError(err))
            ) as Observable<Jackpot[]>;
    }

    pollJackpotValues(gameId: string): Observable<number> {
        return timer(0, 10000)
            .pipe(
                switchMap(() => this.getJackpots()),
                map((jackpotResponse) => jackpotResponse.find((obj) => obj.game === gameId)?.amount)
            );
    }
}
