import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { Error404Component } from './layouts/error404/error404.component';
import { IndexComponent } from './index/index.component';
import { SharedModule } from "./shared/shared.module";
import { AuthInterceptor } from "./auth/interceptors/auth.interceptor";



@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        Error404Component,
        IndexComponent
    ],
	
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true
		}
	],

    imports: [
        BrowserModule,
        AppRoutingModule,
		SharedModule
    ],

    bootstrap: [AppComponent]
})
export class AppModule { }