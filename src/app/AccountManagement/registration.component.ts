import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { User } from './user';
import { UserService } from './user.service';
import { ValidationMessages } from './validation.messages';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {
  regForm: FormGroup;
  regUser: User;
  userList: User[];
  errorMessage: any;
  validationMessages: ValidationMessages = new ValidationMessages;
  message: { [key: string]: string} = {};

  constructor(private router: Router, private userService: UserService, private fb: FormBuilder) { }

  register(): void { //registers the user, validates info and then saves user if valid
    this.regUser = {
      "firstnames": this.regForm.get('firstnames').value.trim(),
      "surname": this.regForm.get('surname').value.trim(),
      "username": this.regForm.get('username').value.trim(),
      "email": this.regForm.get('email').value.trim(),
      "password": this.regForm.get('password').value.trim()
    }
    if (this.emailUnique()) {
      if (this.usernameUnique()) {
        if (this.passwordConfirmed()) {
            this.userService.createUser(this.regUser).subscribe({ //create new user using service
              next: () => {
              console.log("account created successfully.");
              console.log(this.regUser);
              this.router.navigate(["/login"]);
            }
          });
        } else {
          this.errorMessage = "Passwords do not match";
        }
      } else {
        this.errorMessage = "This username is already taken";
      }
    } else {
      this.errorMessage = "This email is already in use";
    }
  }

  ngOnInit(): void {
    this.regForm = this.fb.group({
      firstnames: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      surname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]],
      cpassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]]
    });

    let controls: string[] = ["firstnames", "surname", "username", "email","password", "cpassword"];
    for (let i = 0; i < controls.length; i++) {
      const element = controls[i];
      const control = this.regForm.get(element);
      control.valueChanges.subscribe(
        value => this.setMessage(control, element)
      )
    }
    
    this.userService.getUsers().subscribe({
      next: users => {
        this.userList = users;
      },error: err => this.errorMessage = err
    });
  }

  setMessage(c: AbstractControl, controlName: string): void {
    this.message[controlName] = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.message[controlName] = Object.keys(c.errors).map(
        key => this.validationMessages[controlName][key]).join(' ');
    }
  }

  //functions for validating information
  passwordConfirmed(): boolean {
    if (this.regUser.password === this.regForm.get('cpassword').value) {
      return true;
    } else 
    return false;
  }

  emailUnique(): boolean {
    for (let i = 0; i < this.userList.length; i++) {
      const user = this.userList[i];
      if (user.email === this.regUser.email) {
        return false;
      } 
    }
    return true; 
  }

  usernameUnique(): boolean {
    for (let i = 0; i < this.userList.length; i++) {
      const user = this.userList[i];
       if (user.username === this.regUser.username) {
        return false;
      }
    }
    return true; 
  }
}
