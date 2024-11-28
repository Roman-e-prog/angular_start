import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn:'root',
})
export class RegisterService{
    constructor(private httpClient: HttpClient){}

    registerUser(vorname: string, nachname:string, username: string, email:string, password:string){
        return this.httpClient.post('http://localhost:5000/api/auth/register', {vorname, nachname, username, email, password})
    }
}