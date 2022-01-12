import { FormControl, FormGroup, Validators } from "@angular/forms";



export class PostForm {

	form = new FormGroup({
		id: new FormControl(0),
		title: new FormControl("", [Validators.required]),
		body: new FormControl("", [Validators.required]),
		image: new FormControl("")
	});
}
