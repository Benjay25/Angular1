import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from './user';
import { Injectable } from '@angular/core';
import { Advert } from '../user-adverts/advert';

@Injectable ({
    providedIn: 'root'
})

export class Data implements InMemoryDbService {
    constructor() {}
    newdate:Date = new Date();
    date: string = this.newdate.toDateString();
    createDb() {
        let usersArr: User[] = [
            {
                "id": 1,
                "firstnames": "Gunther",
                "surname": "Kjelberg",
                "username": "GuntiePie",
                "email": "guntherpie@gmail.com",
                "password": "10YearOldArmy"
            },
            {
                "id": 2,
                "firstnames": "Jake",
                "surname": "Johnson",
                "username": "pepperwood420",
                "email": "nick.miller@gmail.com",
                "password": "username"
            },
            {
                "id": 3,
                "firstnames": "Winston",
                "surname": "Bishop",
                "username": "theBish",
                "email": "winniebball@latvia.com",
                "password": "courtRoomBrown"
            },
            {
                "id": 4,
                "firstnames": "Captain Jack",
                "surname": "Sparrow",
                "username": "PearlsCaptain",
                "email": "sparrow@sevenseas.com",
                "password": "RumsAlwaysGone"
            },
            {
                "id": 5,
                "firstnames": "Susan",
                "surname": "Jennings",
                "username": "cakeLover25",
                "email": "jennings.susie@gmail.com",
                "password": "flowerPower99"
            }
        ];
        let arrAdverts: Advert[] = [
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
                "description": "Story about Julius Pepperwood who's from Chicago. He's a detective on a mission to uncover the truth. Author: Nicholas Miller. 'This Author truly cannot spell rhythm' - New York Times ",
                "price": 250.00,
                "date": this.date,
                "username": "pepperwood420",
            },
            {
                "id": 3,
                "title": "Bell playing lessons",
                "description": "Winnie gonna help you unleash the magic of the three-in-hand bell style!",
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
                "username": "CaptainOfThePearl",
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
        return {usersArr, arrAdverts};
    }
}
