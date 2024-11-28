import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core'
interface ForumLink{
    name: string,
    url: string
  }
@Injectable({
    providedIn:'root'
})

export class ForumLinksService{
    constructor(private httpClient:HttpClient){}
    getForumLinks = ()=>{
        return this.httpClient.get<ForumLink[]>('assets/forumlinks.json')
    }

}