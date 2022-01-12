import { FormControl, FormGroup, Validators } from "@angular/forms";



export class CommentsForm {

	form = new FormGroup({
		postId: new FormControl(0),
		body: new FormControl("", [Validators.required])
	})
}
