import { Component, OnInit } from '@angular/core';
import { Advert } from '../user-adverts/advert';
import { AdvertService } from '../user-adverts/advert.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  arrAdverts: Advert[] = [];
  arrAll: Advert[] = [];
  searchItem: string;
  advertsForm: FormGroup;
  errorMessage: any;
  title: string;
  sub: Subscription;
  constructor(private advertService: AdvertService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.advertsForm = this.fb.group({
      search: ['', [Validators.maxLength(20)]]
    });
    this.advertService.getAdverts().subscribe({
      next: advert => {
        this.arrAll = advert;
        this.arrAdverts = this.filteredAdverts();
      },error: err => this.errorMessage = err
    });
    this.sub = this.advertsForm.get('search').valueChanges.subscribe(
      value => {
        this.searchItem = this.advertsForm.get('search').value;
        this.arrAdverts = this.filteredAdverts();
      });
  }

  filteredAdverts(): Advert[] {
    this.searchItem = this.advertsForm.get('search').value;
    if (this.searchItem === "" || !this.searchItem) {
      return this.arrAll;
    }
    return this.arrAll.filter( x => {
      this.searchItem = this.searchItem.toLocaleLowerCase();
      return ((x.description.toLocaleLowerCase().indexOf(this.searchItem)) !== -1 || (x.title.toLocaleLowerCase().indexOf(this.searchItem)) !== -1 )
    })
  }

  clear(): void {
    if (this.advertsForm) {
      this.advertsForm.reset();
    }
    this.advertsForm.patchValue({
      search: ""
    }); 
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}

