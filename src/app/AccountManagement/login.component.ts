import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { User } from './user';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LogInComponent implements OnInit {
  userList: User[];
  errMsg: string = "";
  signInForm: FormGroup;
  errorMessage: any;

  constructor(private userService: UserService, private router: Router, private fb: FormBuilder) { }

  validate() {
    let email: string = this.signInForm.get('email').value.trim();
    let pw: string = this.signInForm.get('password').value.trim();
    localStorage.setItem("email", "none");

    for (let i = 0; i < this.userList.length; i++) {
      const user = this.userList[i];
      if (email === user.email) {
        if (pw === user.password) {
          localStorage.setItem("email", email);
          this.router.navigate(['/welcome']);
          break;
        }
       }
    }
    if (localStorage.getItem("email") === "none") {
      this.errMsg = "Email or Password is incorrect"
    }
  }

  ngOnInit(): void {
      this.userService.getUsers().subscribe({
        next: users => {
          this.userList = users;
        },error: err => this.errorMessage = err
    });
    this.signInForm = this.fb.group({
      email: '',
      password: ''
    });
  }

}
