import { Component, Input } from '@angular/core';
import { UsersList } from "../../models/users-list";



@Component({
	selector: 'app-user-item',
	templateUrl: './user-item.component.html',
})
export class UserItemComponent {
	
	@Input() users!: UsersList [];

}
