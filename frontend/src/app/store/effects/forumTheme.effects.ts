import { Injectable } from "@angular/core";
import {ofType, createEffect, Actions} from '@ngrx/effects'
import { Store } from "@ngrx/store";
import {environment} from '../../environments/environment'
import {
    createForumTheme,
    createForumThemeSuccess,
    createForumThemeError,
    updateForumTheme,
    updateForumThemeSuccess,
    updateForumThemeError,
    deleteForumTheme,
    deleteForumThemeSuccess,
    deleteForumThemeError,
    getAllForumTheme,
    getAllForumThemeSuccess,
    getAllForumThemeError,
    getForumTheme,
    getForumThemeSuccess,
    getForumThemeError
} from '../actions/forumtheme.actions';
import { mergeMap, map, of, catchError } from "rxjs";
import { HttpClient } from "@angular/common/http";


@Injectable()
export class ForumThemeEffect{
api_url = `${environment.apiURL}api/forumthemes/`;

createForumTheme$ = createEffect(()=>
    this.actions$.pipe(
        ofType(createForumTheme),
        mergeMap((action)=>{
           return this.httpClient.post(this.api_url, action.forumThemeData).pipe(
                map((response:any)=>{
                    this.store.dispatch(getAllForumTheme())
                    return createForumThemeSuccess({forumThemeData: response})
                }),
                catchError((error)=>{
                    return of(createForumThemeError({error}))
                }
            ))
        })
    )
);
updateForumTheme$ = createEffect(()=>
    this.actions$.pipe(
        ofType(updateForumTheme),
        mergeMap((action)=>{
           return this.httpClient.put(this.api_url + action.id, action.forumThemeData).pipe(
                map((response:any)=>{
                    this.store.dispatch(getAllForumTheme())
                    return updateForumThemeSuccess({forumThemeData: response})
                }),
                catchError((error)=>{
                    return of(updateForumThemeError({error}))
                }
            ))
        })
    )
);
deleteForumTheme$ = createEffect(()=>
    this.actions$.pipe(
        ofType(deleteForumTheme),
        mergeMap((action)=>{
           return this.httpClient.delete(this.api_url + action.id).pipe(
                map((response:any)=>{
                    this.store.dispatch(getAllForumTheme())
                    return deleteForumThemeSuccess({id:action.id})
                }),
                catchError((error)=>{
                    return of(deleteForumThemeError({error}))
                }
            ))
        })
    )
);
getForumTheme$ = createEffect(()=>
    this.actions$.pipe(
        ofType(getForumTheme),
        mergeMap((action)=>{
           return this.httpClient.get(this.api_url + 'find/'+ action.id).pipe(
                map((response:any)=>{
                    return getForumThemeSuccess({forumThemeData:response})
                }),
                catchError((error)=>{
                    return of(getForumThemeError({error}))
                }
            ))
        })
    )
);
getAllForumTheme$ = createEffect(()=>
    this.actions$.pipe(
        ofType(getAllForumTheme),
        mergeMap((action)=>{
           return this.httpClient.get(this.api_url + 'find/').pipe(
                map((response:any)=>{
                    return getAllForumThemeSuccess({data:response})
                }),
                catchError((error)=>{
                    return of(getAllForumThemeError({error}))
                }
            ))
        })
    )
);



    
    constructor(private store: Store, private actions$: Actions, private httpClient: HttpClient){}
}