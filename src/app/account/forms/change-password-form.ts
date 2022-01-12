import { FormControl, FormGroup, Validators } from "@angular/forms";
import { passwordMatchValidation } from "src/app/shared/validators/validation";



export class ChangePasswordForm {
	
	form = new FormGroup({
		oldPassword: new FormControl("", [Validators.required]),
		newPassword: new FormControl("", [Validators.required, Validators.minLength(8)]),
		newPasswordConfirm: new FormControl("", [Validators.required])
	}, { validators: passwordMatchValidation("newPassword", "newPasswordConfirm") });
}
