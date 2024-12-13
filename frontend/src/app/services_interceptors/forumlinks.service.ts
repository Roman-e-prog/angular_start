import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core'
import { BehaviorSubject } from 'rxjs';
interface ForumLink{
    name: string,
    url: string
  }
@Injectable({
    providedIn:'root'
})

export class ForumLinksService{
    private forumLinksSubject = new BehaviorSubject<ForumLink[] | null>(null);
    private forumLinks$ = this.forumLinksSubject.asObservable()
    constructor(private httpClient:HttpClient){}
    fetchForumLinks = ()=>{
        return this.httpClient.get<ForumLink[]>('assets/forumlinks.json').subscribe({
            next: (data)=> this.forumLinksSubject.next(data),
            error: (error)=> console.error(error)
        })
    }
    getForumLinks = ()=>{
        return this.forumLinks$
    }

}