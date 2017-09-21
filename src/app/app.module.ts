import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { LettersComponent } from './letters/letters.component';
import { MainComponent } from './main/main.component';
import { ListComponent } from './list/list.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './auth/auth.service';
import { LoginComponent } from './login/login.component';
import { APP_ROUTES_PROVIDER } from './app.routes';
import { APP_ROUTES } from './app.routes';



@NgModule({
  declarations: [
    AppComponent,
    LettersComponent,
    MainComponent,
    ListComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(APP_ROUTES)
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
