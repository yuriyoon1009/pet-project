import { AbstractControl } from '@angular/forms';

export class PasswordValidator {

  static match(form: AbstractControl) {
    const password1 = form.get('password1').value;
    const password2 = form.get('password2').value;

    if (password1 !== password2) {
      return { match: { password1, password2 }};
    } else {
      return null;
    }
  }
}