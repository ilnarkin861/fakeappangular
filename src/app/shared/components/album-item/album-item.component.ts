import { Component, Input } from '@angular/core';
import { AlbumsList } from "../../models/albums-list";



@Component({
	selector: 'app-album-item',
	templateUrl: './album-item.component.html',
})
export class AlbumItemComponent {
	
	@Input() albums!: AlbumsList [];
	
}
