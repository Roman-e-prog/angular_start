import { Injectable } from "@angular/core";
import {ofType, createEffect, Actions} from '@ngrx/effects'
import { Store } from "@ngrx/store";
import {
    createBlog,
    createBlogSuccess,
    createBlogError,
    updateBlog,
    updateBlogSuccess,
    updateBlogError,
    deleteBlog,
    deleteBlogSuccess,
    deleteBlogError,
    getAllBlog,
    getAllBlogSuccess,
    getAllBlogError,
    getBlog,
    getBlogSuccess,
    getBlogError
} from '../actions/blog.actions';
import { mergeMap, map, of, catchError } from "rxjs";
import { HttpClient } from "@angular/common/http";


@Injectable()
export class BlogEffect{
api_url = 'http://localhost:5000/api/blog/';

createBlog$ = createEffect(()=>
    this.actions$.pipe(
        ofType(createBlog),
        mergeMap((action)=>{
           return this.httpClient.post(this.api_url, action.blogData).pipe(
                map((response:any)=>{
                    this.store.dispatch(getAllBlog())
                    return createBlogSuccess({blogData: response})
                }),
                catchError((error)=>{
                    return of(createBlogError({error}))
                }
            ))
        })
    )
);
updateBlog$ = createEffect(()=>
    this.actions$.pipe(
        ofType(updateBlog),
        mergeMap((action)=>{
           return this.httpClient.put(this.api_url + action.id, action.blogData).pipe(
                map((response:any)=>{
                    this.store.dispatch(getAllBlog())
                    return updateBlogSuccess({blogData: response})
                }),
                catchError((error)=>{
                    return of(updateBlogError({error}))
                }
            ))
        })
    )
);
deleteBlog$ = createEffect(()=>
    this.actions$.pipe(
        ofType(deleteBlog),
        mergeMap((action)=>{
           return this.httpClient.delete(this.api_url + action.id).pipe(
                map((response:any)=>{
                    this.store.dispatch(getAllBlog())
                    return deleteBlogSuccess({id:action.id})
                }),
                catchError((error)=>{
                    return of(deleteBlogError({error}))
                }
            ))
        })
    )
);
getBlog$ = createEffect(()=>
    this.actions$.pipe(
        ofType(getBlog),
        mergeMap((action)=>{
           return this.httpClient.get(this.api_url + 'find/'+ action.id).pipe(
                map((response:any)=>{
                    return getBlogSuccess({blogData:response})
                }),
                catchError((error)=>{
                    return of(getBlogError({error}))
                }
            ))
        })
    )
);
getAllBlog$ = createEffect(()=>
    this.actions$.pipe(
        ofType(getAllBlog),
        mergeMap((action)=>{
           return this.httpClient.get(this.api_url + 'find/').pipe(
                map((response:any)=>{
                    return getAllBlogSuccess({data:response})
                }),
                catchError((error)=>{
                    return of(getAllBlogError({error}))
                }
            ))
        })
    )
);



    
    constructor(private store: Store, private actions$: Actions, private httpClient: HttpClient){}
}