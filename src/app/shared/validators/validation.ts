import { AbstractControl, ValidatorFn } from "@angular/forms";



export function passwordMatchValidation(controlName: string, checkControlName: string): ValidatorFn {

	return (controls: AbstractControl) => {
		
		return controls.get(controlName)?.value !== controls.get(checkControlName)?.value
			? { passwordMatch: true }
			: null;
	};
}