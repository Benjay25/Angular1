import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { AdvertService } from "./advert.service";
import { Advert } from './advert';

@Component({
  selector: 'app-user-adverts',
  templateUrl: './user-adverts.component.html',
  styleUrls: ['./user-adverts.component.css']
})

export class UserAdvertsComponent implements OnInit {
  arrAdverts: Advert[] = [];
  arrTemp: Advert[] = [];
  errorMessage: any;
  title: string;

  constructor(private advertService: AdvertService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.populateArray();
  }

  populateArray(): void {
    this.advertService.getAdverts().subscribe({
      next: advert => {
        this.arrTemp = advert;
        this.arrAdverts = this.filterUserProducts(this.arrTemp);
      },error: err => this.errorMessage = err
    });
  }

  filterUserProducts(arr: Advert[]): Advert[] {
    let username: string = localStorage.getItem('username');
    let arrReturned: Advert[] = [];
    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];
      if (element.username === username) {
        arrReturned.push(element);
      }
    }
    return arrReturned; 
  }

  deleteAdvert(id: number) {    
    if (confirm(`Really delete this product?`)) {
      this.advertService.deleteProduct(id)
        .subscribe({
          next: () => this.populateArray(),
          error: err => this.errorMessage = err
        });
    }
  }  

}
  
