import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './Welcome/welcome.component';
import { RegistrationComponent } from './AccountManagement/registration.component';
import { Data } from './AccountManagement/userData'
import { UserAdvertsGuard } from "./user-adverts/user-adverts.guard";

import { RouterModule } from '@angular/router';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { LogInComponent } from './AccountManagement/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserAdvertsComponent } from './user-adverts/user-adverts.component';
import { NewAdvertComponent } from './user-adverts/new-advert.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    WelcomeComponent,
    LogInComponent,
    UserAdvertsComponent,
    NewAdvertComponent
  ],
  imports: [
    BrowserModule,
    InMemoryWebApiModule.forRoot(Data),
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent },
      { path: 'register', component: RegistrationComponent },
      { path: 'login', component: LogInComponent },
      { path: 'userAd', canActivate: [UserAdvertsGuard], component: UserAdvertsComponent },
      { path: 'newAd', component: NewAdvertComponent },      
      { path: 'newAd/:id/edit', component: NewAdvertComponent },      
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
    ]),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  pageTitle = 'Angular Product Store'
 }
