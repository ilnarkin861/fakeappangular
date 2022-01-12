import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../auth/services/auth.service";
import { AccountService } from "../../account/services/account.service";



@Component({
	selector: 'app-header',
	templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
	
	isAuthenticated: boolean = false;
	avatar: string = '';
	
	
	constructor(private authService: AuthService, private accountService: AccountService) {
		
		accountService.setUserAvatar.subscribe((avatar: string) => this.avatar = avatar);
	}
	
	ngOnInit(): void {
		
		this.isAuthenticated = this.authService.isAuthenticated();
		
		if(!this.isAuthenticated) this.avatar = '';
		
		else {
			( async () => {
				let user = await this.accountService.getCurrentUserInfo();
				
				if(user) this.avatar = user['avatar'];
			})();
		}
	}
}
