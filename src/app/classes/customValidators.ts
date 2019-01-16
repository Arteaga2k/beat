import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidator {

    // Expresión regular para validar un código postal
    static CP_REGEXP = /^[0-9]{4,5}$/;

    // Expresión regular para validar un CIF español
    static CIF_REGEXP = /^[a-zA-Z]{1}\d{7}[a-zA-Z0-9]{1}$/;

    // Expresión regular para validar un NIF español
    static NIF_REGEXP = /^\d{8}[a-zA-Z]{1}$/;

    static codigoPostalValidator(codigo_postal): any {
        // Éxito cuando no se haya modificado (pristine)
        // ó el contenido pasa la expresión regular
        if (codigo_postal.pristine
            || CustomValidator.CP_REGEXP.test(codigo_postal.value)) {
            return null;
        }
        // Retorno de error: no ha pasado la validación
        return {
            invalidCodigoPostal: true
        };
    }

    static cifNifValidator(cifnif): any {
        // Éxito cuando no se haya modificado (pristine)
        // ó el contenido pasa una de las expresión regulares
        if (cifnif.pristine
            || CustomValidator.CIF_REGEXP.test(cifnif.value)
            || CustomValidator.NIF_REGEXP.test(cifnif.value)) {
            return null;
        }
        // Retorno de error: no ha pasado la validación
        return {
            invalidCifNif: true
        };
    }

    static cifNifEmptyValidator(cifnif): any {
        if (cifnif.value != null && cifnif.value.length > 0) {
            return CustomValidator.cifNifValidator(cifnif);
        }
        return null;
    }

    static requiredIf(requiredIf: {value: boolean}): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            if ((value == null || value === undefined || value === '') && requiredIf.value) {
                return {
                    requiredIf: {
                        condition: requiredIf.value
                    }
                };
            }
            return null;
        };
    }
}
