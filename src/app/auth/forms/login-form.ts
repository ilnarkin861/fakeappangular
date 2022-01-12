import { FormControl, FormGroup, Validators } from "@angular/forms";



export class LoginForm {
	
	form = new FormGroup({
		email: new FormControl("", [Validators.required,
			Validators.pattern('^([\\w.\\-]+)@([\\w\\-]+)((\\.(\\w){2,4})+)$')]),
		password: new FormControl("", [Validators.required])
	});
}
