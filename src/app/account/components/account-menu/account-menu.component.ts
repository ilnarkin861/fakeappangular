import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../auth/services/auth.service";



@Component({
    selector: 'app-account-menu',
    templateUrl: './account-menu.component.html'
})
export class AccountMenuComponent {

    constructor(private router:Router, private authService: AuthService) { }
    
    logout(){

        this.authService.logout();
        
        window.location.href = "/auth/login";
    }
}
