import { FormControl, FormGroup, Validators } from "@angular/forms";



export class AccountForm {
	
	form = new FormGroup({
		firstName: new FormControl(null, [Validators.required]),
		lastName: new FormControl(null),
		email: new FormControl(null, [Validators.required,
			Validators.pattern('^([\\w.\\-]+)@([\\w\\-]+)((\\.(\\w){2,4})+)$')]),
		phone: new FormControl(null),
		webSite: new FormControl(null),
		addressZipCode: new FormControl(null),
		addressCity: new FormControl(null),
		addressStreet: new FormControl(null),
		addressSuit: new FormControl(null),
		companyName: new FormControl(null),
		companyCatchPhrase: new FormControl(null),
		companyBs: new FormControl(null),
		avatar: new FormControl(null)
	});
}
