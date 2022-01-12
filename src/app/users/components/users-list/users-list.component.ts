import { Component, OnInit } from '@angular/core';
import { UsersList } from "../../../shared/models/users-list";
import { UsersService } from "../../../shared/services/users.service";



@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html'
})
export class UsersListComponent implements OnInit {
	
	users!: UsersList [];
	private usersLimit: number = 3;
	hasNextPage: boolean = false;
	loadButtonClicked: boolean = false;
	

  	constructor(private usersService: UsersService) { }
	

  	ngOnInit(): void { this.getUsers(); }
	
	
	loadUsers(){
  
		if(this.hasNextPage){
			
			this.loadButtonClicked = true;
			
			this.getUsers();
		}
	}
	
	
	private getUsers(){
  		
  		let offset = this.users ? this.users.length : 0;
		
		this.usersService.getUsersList(offset, this.usersLimit).subscribe((result: any) => {

			if (!this.users) this.users = [];

			result['data'].forEach((post: any) => this.users.push(post));

			this.hasNextPage = result['pagination'].hasNextPage;

			this.loadButtonClicked = false;
		});
	}
}
