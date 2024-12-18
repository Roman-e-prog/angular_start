import { AsyncValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable, map, of } from "rxjs";
import { HttpClient } from "@angular/common/http";

export class UsernameValidator {
  private baseUrl = 'http://localhost:5000/api/auth';

  constructor(private httpClient: HttpClient) {}

  uniqueUsernameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const value = control.value;
      if (!value) {
        return of(null); // Return null if the value is empty
      }
      return this.httpClient.post('http://localhost:5000/api/auth/uniqueUsername', {username: value}).pipe(
        map((res: any) => {
          return res ? { usernameTaken: true } : null;
        })
      );
    };
  }
}
