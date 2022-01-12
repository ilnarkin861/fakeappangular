import { FormControl, FormGroup, Validators } from "@angular/forms";
import { passwordMatchValidation } from "../../shared/validators/validation";



export class RegisterForm {
	
	form = new FormGroup({
		firstName: new FormControl("", [Validators.required]),
		lastName: new FormControl(""),
		email: new FormControl("", [Validators.required,
			Validators.pattern('^([\\w.\\-]+)@([\\w\\-]+)((\\.(\\w){2,4})+)$')]),
		password: new FormControl("", [Validators.required, Validators.minLength(8)]),
		passwordConfirm: new FormControl("", [Validators.required])
	}, { validators: passwordMatchValidation("password", "passwordConfirm") });
}
