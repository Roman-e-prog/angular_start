import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
interface Navlinks{
    url:string,
    name:string
  }
@Injectable({
    providedIn: 'root'
})
export class NavlinksService{
    private navlinksSubject = new BehaviorSubject<Navlinks[] | null>(null);
    public navlinks$ = this.navlinksSubject.asObservable();
    constructor(private httpClient: HttpClient){}
    navlinks: Navlinks[] | null = null;
    fetchNavlinks = ()=>{
        return this.httpClient.get<Navlinks[]>('assets/navlinks.json').subscribe({
            next: (data) => this.navlinksSubject.next(data),
            error: (error) => console.error('Error fetching navlinks:', error),
        });
    }
    getNavlinks = ()=>{
          return this.navlinks$  
    }
}