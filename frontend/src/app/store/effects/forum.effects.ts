import { Injectable } from "@angular/core";
import {ofType, createEffect, Actions} from '@ngrx/effects'
import { Store } from "@ngrx/store";
import {
    createForum,
    createForumSuccess,
    createForumError,
    updateForum,
    updateForumSuccess,
    updateForumError,
    deleteForum,
    deleteForumSuccess,
    deleteForumError,
    getAllForum,
    getAllForumSuccess,
    getAllForumError,
    getForum,
    getForumSuccess,
    getForumError
} from '../actions/forum.actions';
import { mergeMap, map, of, catchError } from "rxjs";
import { HttpClient } from "@angular/common/http";


@Injectable()
export class ForumEffect{
api_url = 'http://localhost:5000/api/forum/';

createForum$ = createEffect(()=>
    this.actions$.pipe(
        ofType(createForum),
        mergeMap((action)=>{
           return this.httpClient.post(this.api_url, action.forumData).pipe(
                map((response:any)=>{
                    this.store.dispatch(getAllForum())
                    return createForumSuccess({forumData: response})
                }),
                catchError((error)=>{
                    return of(createForumError({error}))
                }
            ))
        })
    )
);
updateForum$ = createEffect(()=>
    this.actions$.pipe(
        ofType(updateForum),
        mergeMap((action)=>{
           return this.httpClient.put(this.api_url + action.id, action.forumData).pipe(
                map((response:any)=>{
                    this.store.dispatch(getAllForum())
                    return updateForumSuccess({forumData: response})
                }),
                catchError((error)=>{
                    return of(updateForumError({error}))
                }
            ))
        })
    )
);
deleteForum$ = createEffect(()=>
    this.actions$.pipe(
        ofType(deleteForum),
        mergeMap((action)=>{
           return this.httpClient.delete(this.api_url + action.id).pipe(
                map((response:any)=>{
                    this.store.dispatch(getAllForum())
                    return deleteForumSuccess({id:action.id})
                }),
                catchError((error)=>{
                    return of(deleteForumError({error}))
                }
            ))
        })
    )
);
getForum$ = createEffect(()=>
    this.actions$.pipe(
        ofType(getForum),
        mergeMap((action)=>{
           return this.httpClient.get(this.api_url + 'find/'+ action.id).pipe(
                map((response:any)=>{
                    return getForumSuccess({forumData:response})
                }),
                catchError((error)=>{
                    return of(getForumError({error}))
                }
            ))
        })
    )
);
getAllForum$ = createEffect(()=>
    this.actions$.pipe(
        ofType(getAllForum),
        mergeMap((action)=>{
           return this.httpClient.get(this.api_url + 'find/').pipe(
                map((response:any)=>{
                    return getAllForumSuccess({data:response})
                }),
                catchError((error)=>{
                    return of(getAllForumError({error}))
                }
            ))
        })
    )
);

    constructor(private store: Store, private actions$: Actions, private httpClient: HttpClient){}
}