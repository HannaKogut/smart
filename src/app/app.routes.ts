
import { LoginComponent } from './login/login.component';
import { LettersComponent } from './letters/letters.component';
import { provideRoutes } from '@angular/router';

export const APP_ROUTES = [
  { path: 'login',component: LoginComponent},
  { path: '', component: LettersComponent }
]

export const APP_ROUTES_PROVIDER = [
  provideRoutes(APP_ROUTES)
  ]