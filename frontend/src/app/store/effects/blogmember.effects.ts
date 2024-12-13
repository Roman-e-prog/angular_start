import { Injectable } from "@angular/core";
import {ofType, createEffect, Actions} from '@ngrx/effects'
import { Store } from "@ngrx/store";
import {environment} from '../../environments/environment'
import {
    updateBlogmember,
    updateBlogmemberSuccess,
    updateBlogmemberError,
    deleteBlogmember,
    deleteBlogmemberSuccess,
    deleteBlogmemberError,
    getAllBlogmember,
    getAllBlogmemberSuccess,
    getAllBlogmemberError,
    getBlogmember,
    getBlogmemberSuccess,
    getBlogmemberError
} from '../actions/blogmember.actions';
import { mergeMap, map, of, catchError } from "rxjs";
import { HttpClient } from "@angular/common/http";


@Injectable()
export class BlogmemberEffect{
api_url = `${environment.apiURL}api/blogMembers/`;


updateBlogmember$ = createEffect(()=>
    this.actions$.pipe(
        ofType(updateBlogmember),
        mergeMap((action)=>{
           return this.httpClient.put(this.api_url + action.id, action.blogmemberData).pipe(
                map((response:any)=>{
                    this.store.dispatch(getAllBlogmember())
                    return updateBlogmemberSuccess({blogmemberData: response})
                }),
                catchError((error)=>{
                    return of(updateBlogmemberError({error}))
                }
            ))
        })
    )
);
deleteBlogmember$ = createEffect(()=>
    this.actions$.pipe(
        ofType(deleteBlogmember),
        mergeMap((action)=>{
           return this.httpClient.delete(this.api_url + action.id).pipe(
                map((response:any)=>{
                    this.store.dispatch(getAllBlogmember())
                    return deleteBlogmemberSuccess({id:action.id})
                }),
                catchError((error)=>{
                    return of(deleteBlogmemberError({error}))
                }
            ))
        })
    )
);
getBlogmember$ = createEffect(()=>
    this.actions$.pipe(
        ofType(getBlogmember),
        mergeMap((action)=>{
           return this.httpClient.get(this.api_url + 'find/'+ action.id).pipe(
                map((response:any)=>{
                    return getBlogmemberSuccess({blogmemberData:response})
                }),
                catchError((error)=>{
                    return of(getBlogmemberError({error}))
                }
            ))
        })
    )
);
getAllBlogmember$ = createEffect(()=>
    this.actions$.pipe(
        ofType(getAllBlogmember),
        mergeMap((action)=>{
           return this.httpClient.get(this.api_url + 'find/').pipe(
                map((response:any)=>{
                    return getAllBlogmemberSuccess({data:response})
                }),
                catchError((error)=>{
                    return of(getAllBlogmemberError({error}))
                }
            ))
        })
    )
);



    
    constructor(private store: Store, private actions$: Actions, private httpClient: HttpClient){}
}