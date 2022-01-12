import { FormControl, FormGroup, Validators } from "@angular/forms";



export class AlbumForm {

	form = new FormGroup({
		id: new FormControl(0),
		title: new FormControl("", [Validators.required]),
		cover: new FormControl("")
	});
}
