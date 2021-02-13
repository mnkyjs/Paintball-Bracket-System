import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { API_BASE_URL } from './api/services/planer-api.service';
import { environment } from '../environments/environment';
import { ApiModule } from './api/api.module';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { httpInterceptors } from './shared/interceptors/httpInterceptors';
import { SharedModule } from './shared/shared.module';

const modules = [
  BrowserModule,
  BrowserAnimationsModule,
  HttpClientModule,
  AppRoutingModule,
  ApiModule,
  SharedModule.forRoot(),
  JwtModule.forRoot({
    config: {
      tokenGetter,
      allowedDomains: [`${environment.apiFix}`],
      disallowedRoutes: [`${environment.apiFix}/api/auth`]
    }
  })
];

export function tokenGetter(): string | null {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [AppComponent],
  imports: [...modules],
  providers: [...httpInterceptors, { provide: API_BASE_URL, useValue: environment.apiUrl }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
