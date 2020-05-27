import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-jackpot-stripe',
  templateUrl: './jackpot-stripe.component.html',
  styleUrls: ['./jackpot-stripe.component.scss']
})
export class JackpotStripeComponent {

  @Input() jackpotValue: number | undefined;
  @Input() currencyCode: string | undefined;

}
