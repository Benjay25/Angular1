import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AdvertService } from './advert.service';
import { Router, ActivatedRoute } from '@angular/router';

import { Advert } from "./advert";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-advert',
  templateUrl: './new-advert.component.html',
  styleUrls: ['./new-advert.component.css']
})
export class NewAdvertComponent implements OnInit {
  newAdForm: FormGroup;
  newAd: Advert;
  sub: Subscription;
  errorMessage: any;
  advert: Advert;
  pageTitle: string = "Create new Advert";
  constructor(private fb: FormBuilder, private advertService: AdvertService, private router: Router, private route: ActivatedRoute) {  }

  ngOnInit(): void {
    this.newAdForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(500)]],
      price: ['', [Validators.required]]
    });

    this.sub = this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        if (id != 0) {
          this.getAdvert(id);
        }
      });
  }

  getAdvert(id: number): void { //retrieve advert
    this.pageTitle = '';
    this.advertService.getAdvert(id).subscribe({
        next: (advert: Advert) => this.displayadvert(advert),
        error: err => this.errorMessage = err
      });
  }

  displayadvert(advert:Advert): void { //fills the form with the selected ad's data
    if (this.newAdForm) {
      this.newAdForm.reset();
    }
    this.advert = advert;
    if (this.advert.id !== 0) {
      this.pageTitle = `Edit Advert: ${this.advert.title}`;
    }
    this.newAdForm.patchValue({
      title: this.advert.title,
      description: this.advert.description,
      price: this.advert.price
    });
  }

    listAd(): void {
      const p = { ...this.advert, ...this.newAdForm.value };
      if (p.id === 0 || !p.id) {
        this.listNewAd() 
      } else {
        this.updateAd(p);
      }
    }

  updateAd(p) {
    this.advertService.updateAdvert(p).subscribe({
              next: () => this.router.navigate(['/userAd']),
              error: err => this.errorMessage = err
            });
  }

  listNewAd():void {
    this.newAd = {
        "title": this.newAdForm.get('title').value.trim(),
        "description": this.newAdForm.get('description').value.trim(),
        "price": this.newAdForm.get('price').value.trim(),
        "date": new Date().toDateString(),
        "username": localStorage.getItem("username")
    }
    this.sub = this.advertService.createAdvert(this.newAd).subscribe({ //create new advert using service
      next: () => {
      this.router.navigate(["/userAd"]);
    }
  });
  }

  back(): void {
    if (confirm("Are you sure you want to go back and delete all entered information?")) {
        this.router.navigate(["/userAd"]);
      }
  }

  ngOnDestroy() {
    this.sub.unsubscribe;
  }
}
