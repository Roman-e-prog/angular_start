import { Injectable } from "@angular/core";
import {ofType, createEffect, Actions} from '@ngrx/effects'
import { Store } from "@ngrx/store";
import {environment} from '../../environments/environment'
import {
    createUserMessage,
    createUserMessageSuccess,
    createUserMessageError,
    updateUserMessage,
    updateUserMessageSuccess,
    updateUserMessageError,
    deleteUserMessage,
    deleteUserMessageSuccess,
    deleteUserMessageError,
    getAllUserMessage,
    getAllUserMessageSuccess,
    getAllUserMessageError,
    getUserMessage,
    getUserMessageSuccess,
    getUserMessageError
} from '../actions/usermessage.actions';
import { mergeMap, map, of, catchError } from "rxjs";
import { HttpClient } from "@angular/common/http";


@Injectable()
export class UserMessagesEffect{
api_url = `${environment.apiURL}api/usermessages/`;

createUserMessage$ = createEffect(()=>
    this.actions$.pipe(
        ofType(createUserMessage),
        mergeMap((action)=>{
           return this.httpClient.post(this.api_url, action.userMessageData).pipe(
                map((response:any)=>{
                    this.store.dispatch(getAllUserMessage())
                    return createUserMessageSuccess({userMessageData: response})
                }),
                catchError((error)=>{
                    return of(createUserMessageError({error}))
                }
            ))
        })
    )
);
updateUserMessage$ = createEffect(()=>
    this.actions$.pipe(
        ofType(updateUserMessage),
        mergeMap((action)=>{
           return this.httpClient.put(this.api_url + action.id, action.userMessageData).pipe(
                map((response:any)=>{
                    this.store.dispatch(getAllUserMessage())
                    return updateUserMessageSuccess({userMessageData: response})
                }),
                catchError((error)=>{
                    return of(updateUserMessageError({error}))
                }
            ))
        })
    )
);
deleteUserMessage$ = createEffect(()=>
    this.actions$.pipe(
        ofType(deleteUserMessage),
        mergeMap((action)=>{
           return this.httpClient.delete(this.api_url + action.id).pipe(
                map((response:any)=>{
                    this.store.dispatch(getAllUserMessage())
                    return deleteUserMessageSuccess({id:action.id})
                }),
                catchError((error)=>{
                    return of(deleteUserMessageError({error}))
                }
            ))
        })
    )
);
getUserMessage$ = createEffect(()=>
    this.actions$.pipe(
        ofType(getUserMessage),
        mergeMap((action)=>{
           return this.httpClient.get(this.api_url + 'find/'+ action.id).pipe(
                map((response:any)=>{
                    return getUserMessageSuccess({userMessageData:response})
                }),
                catchError((error)=>{
                    return of(getUserMessageError({error}))
                }
            ))
        })
    )
);
getAllUserMessage$ = createEffect(()=>
    this.actions$.pipe(
        ofType(getAllUserMessage),
        mergeMap((action)=>{
           return this.httpClient.get(this.api_url + 'find/').pipe(
                map((response:any)=>{
                    return getAllUserMessageSuccess({data:response})
                }),
                catchError((error)=>{
                    return of(getAllUserMessageError({error}))
                }
            ))
        })
    )
);



    
    constructor(private store: Store, private actions$: Actions, private httpClient: HttpClient){}
}