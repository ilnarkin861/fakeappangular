import { Component } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider } from 'angularx-social-login';
import { AuthService } from "../../services/auth.service";



@Component({
    selector: 'app-auth-google',
    templateUrl: './auth-google.component.html'
})
export class AuthGoogleComponent {

	messages!: string[];


    constructor(private socialAuthService: SocialAuthService, private authService: AuthService) { }

    
    async loginWithGoogle(event: any) {

        event.target.disabled = true;

        let user = await this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
        
        let result = await this.authService.socialLogin(user.email, user.id, user.firstName);
        
        if(typeof result === 'boolean') window.location.href = '/account';
        
        else {
            this.messages = result;

            event.target.disabled = false;
        }
    }
}
