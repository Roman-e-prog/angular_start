import { AsyncValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable, map, of } from "rxjs";
import { HttpClient } from "@angular/common/http";

export class EmailValidator {
  private baseUrl = 'http://localhost:5000/api/auth';

  constructor(private httpClient: HttpClient) {}

  uniqueEmailValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      console.log('i am invoked with', control.value)
      const value = control.value;
      if (!value) {
        return of(null); // Return null if the value is empty
      }
      return this.httpClient.post(`${this.baseUrl}/uniqueEmail`, {email: value}).pipe(
        map((res: any) => {
          return res ? { emailTaken: true } : null;
        })
      );
    };
  }
}
