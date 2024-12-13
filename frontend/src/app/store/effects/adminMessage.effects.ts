import { Injectable } from "@angular/core";
import {ofType, createEffect, Actions} from '@ngrx/effects'
import { Store } from "@ngrx/store";
import {environment} from '../../environments/environment'
import {
    createAdminMessage,
    createAdminMessageSuccess,
    createAdminMessageError,
    updateAdminMessage,
    updateAdminMessageSuccess,
    updateAdminMessageError,
    deleteAdminMessage,
    deleteAdminMessageSuccess,
    deleteAdminMessageError,
    getAllAdminMessage,
    getAllAdminMessageSuccess,
    getAllAdminMessageError,
    getAdminMessage,
    getAdminMessageSuccess,
    getAdminMessageError,
    getUserAdminMessages,
    getUserAdminMessageSuccess,
    getUserAdminMessageError,
} from '../actions/adminmessage.actions';
import { mergeMap, map, of, catchError } from "rxjs";
import { HttpClient } from "@angular/common/http";


@Injectable()
export class AdminMessagesEffect{
api_url = `${environment.apiURL}api/adminmessages/`;

createAdminMessage$ = createEffect(()=>
    this.actions$.pipe(
        ofType(createAdminMessage),
        mergeMap((action)=>{
           return this.httpClient.post(this.api_url, action.adminMessageData).pipe(
                map((response:any)=>{
                    this.store.dispatch(getAllAdminMessage())
                    return createAdminMessageSuccess({adminMessageData: response})
                }),
                catchError((error)=>{
                    return of(createAdminMessageError({error}))
                }
            ))
        })
    )
);
updateAdminMessage$ = createEffect(()=>
    this.actions$.pipe(
        ofType(updateAdminMessage),
        mergeMap((action)=>{
           return this.httpClient.put(this.api_url + action.id, action.adminMessageData).pipe(
                map((response:any)=>{
                    this.store.dispatch(getAllAdminMessage())
                    return updateAdminMessageSuccess({adminMessageData: response})
                }),
                catchError((error)=>{
                    return of(updateAdminMessageError({error}))
                }
            ))
        })
    )
);
deleteAdminMessage$ = createEffect(()=>
    this.actions$.pipe(
        ofType(deleteAdminMessage),
        mergeMap((action)=>{
           return this.httpClient.delete(this.api_url + action.id).pipe(
                map((response:any)=>{
                    this.store.dispatch(getAllAdminMessage())
                    return deleteAdminMessageSuccess({id:action.id})
                }),
                catchError((error)=>{
                    return of(deleteAdminMessageError({error}))
                }
            ))
        })
    )
);
getAdminMessage$ = createEffect(()=>
    this.actions$.pipe(
        ofType(getAdminMessage),
        mergeMap((action)=>{
           return this.httpClient.get(this.api_url + 'find/'+ action.id).pipe(
                map((response:any)=>{
                    return getAdminMessageSuccess({adminMessageData:response})
                }),
                catchError((error)=>{
                    return of(getAdminMessageError({error}))
                }
            ))
        })
    )
);
getAllAdminMessage$ = createEffect(()=>
    this.actions$.pipe(
        ofType(getAllAdminMessage),
        mergeMap((action)=>{
           return this.httpClient.get(this.api_url + 'find/').pipe(
                map((response:any)=>{
                    return getAllAdminMessageSuccess({data:response})
                }),
                catchError((error)=>{
                    return of(getAllAdminMessageError({error}))
                }
            ))
        })
    )
);
getUserAdminMessages$ = createEffect(()=>
this.actions$.pipe(
    ofType(getUserAdminMessages),
    mergeMap((action)=>{
        return this.httpClient.get(this.api_url+ 'getUserAdminMessages/'+ action.id).pipe(
            map((response:any)=>{
                return getUserAdminMessageSuccess({data: response})
            }),
            catchError((error)=>{
                return of(getUserAdminMessageError({error}))
            })
        )
    })
))



    
    constructor(private store: Store, private actions$: Actions, private httpClient: HttpClient){}
}