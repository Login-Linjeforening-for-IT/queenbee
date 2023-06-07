import { FormControl, ValidationErrors } from "@angular/forms";

export function NoDecimalValidator(): ValidationErrors | null {
    return (control: FormControl) => {
      const isDecimal = Number(control.value) % 1 != 0;
      const error = isDecimal ? { 'decimal': true } : null;
      return error;
    }
}