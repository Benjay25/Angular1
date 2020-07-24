import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { Advert } from './advert';

@Injectable ({
    providedIn: 'root'
})

export class asdf implements InMemoryDbService {
    constructor() {}
    date:Date = new Date();
    createDb() {
        let arrAdverts: Advert[] = [];
        arrAdverts = [
            {
                "id": 1,
                "title": "GuntiePie Merch 50% off",
                "description": "Hey gang! We have a special sale on all hat merch this week! Like and subscribe.",
                "price": 420.00,
                "date": this.date,
                "username": "GuntiePie"
            },
            {
                "id": 2,
                "title": "The Pepperwood Chronicles",
                "description": "Story about Julius Pepperwood who's from Chicago. He's a detective. Author: Nicholas Miller. 'This Author truly cannot spell rythm' - New York Times ",
                "price": 250.00,
                "date": this.date,
                "username": "pepperwood420",
            },
            {
                "id": 3,
                "title": "Bell playing lessons",
                "description": "Winnie gonna help you unlease the magice of the three-in-hand bell style!",
                "price": 150.00,
                "date": this.date,
                "username": "theBish",
            },
            {
                "id": 4,
                "title": "Blackbeard's enslaved ship collection",
                "description": "Me crew needs some coin for refreshments and I happen to have a rather sought after collection of bottles in me possession.",
                "price": 50000.00,
                "date": this.date,
                "username": "PearlsCaptain",
            },
            {
                "id": 5,
                "title": "Cat boots",
                "description": "The cutests little booties for your lil kitten! Available in 6 colours! Let your kitty strut it's stuff!",
                "price": 35.00,
                "date": this.date,
                "username": "cakeLover25"
            }
        ];
        return {arrAdverts};
    }
}
