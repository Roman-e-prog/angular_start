import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
interface Navlinks{
    url:string,
    name:string
  }
@Injectable({
    providedIn: 'root'
})
export class NavlinksService{
    constructor(private httpClient: HttpClient){}
    navlinks: Navlinks[] | null = null;
    getNavlinks = ()=>{
        return this.httpClient.get<Navlinks[]>('assets/navlinks.json')
    }
}