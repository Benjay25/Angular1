import { Component, OnInit } from '@angular/core';
import { UserService } from './AccountManagement/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle = 'Angular Advert Listing';


  constructor(public userService: UserService) {}
}
