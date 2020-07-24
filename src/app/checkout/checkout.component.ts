import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Advert } from '../user-adverts/advert';
import { AdvertService } from '../user-adverts/advert.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  sub: Subscription;
  checkoutForm: FormGroup;
  adInfo: Advert;
  errorMessage: any;
  constructor(private fb: FormBuilder, private advertService: AdvertService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
      this.sub = this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        if (id != 0) {
          this.getCheckoutAdvert(id);
        }
      });
  }

  getCheckoutAdvert(id: number) {
    this.advertService.getAdvert(id).subscribe({
      next: (advert: Advert) => {
        this.adInfo = advert;
      },
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
