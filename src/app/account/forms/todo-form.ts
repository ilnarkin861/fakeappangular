import { FormControl, FormGroup, Validators } from "@angular/forms";



export class TodoForm {

	form = new FormGroup({
		text: new FormControl("", [Validators.required])
	});
}
