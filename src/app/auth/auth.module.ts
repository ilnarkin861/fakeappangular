import { NgModule } from '@angular/core';
import { environment } from "../../environments/environment";
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { AuthComponent } from "./components/auth/auth.component";
import { AuthGoogleComponent } from "./components/auth-google/auth-google.component";
import { RegisterComponent } from "./components/register/register.component";
import { SharedModule } from "../shared/shared.module";



const routes: Routes = [

    {
        path: '',
        children: [

            {
                path: '',
                component: AuthComponent,
                pathMatch: 'full',
                redirectTo: 'login',
            },

            {
                path: 'login',
                component: AuthComponent,
                data: {title: "Login"}
            },

            {
                path: 'register',
                component: RegisterComponent,
                data: {title: "Register"}
            }
        ]
    }
]

@NgModule({
    declarations: [
        AuthComponent,
        AuthGoogleComponent,
        RegisterComponent,
    ],

    providers: [
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
                autoLogin: false,
                providers: [
                    {
                        id: GoogleLoginProvider.PROVIDER_ID,
                        provider: new GoogleLoginProvider(environment.googleProviderId)
                    }
                ]
            } as SocialAuthServiceConfig,
        }
    ],
	
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		FormsModule,
		HttpClientModule,
		ReactiveFormsModule,
		SocialLoginModule,
		SharedModule
	]
})
export class AuthModule { }
