import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "../services/auth.service";



@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	
	
	constructor(private router: Router, private authService: AuthService) {	}
	
	
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot,): Observable<boolean> | boolean {
		
		let isAuthenticated = this.authService.isAuthenticated();
		
		if (isAuthenticated) return true;
		
		window.location.href = '/auth/login';
		
		return false;
	}
}
