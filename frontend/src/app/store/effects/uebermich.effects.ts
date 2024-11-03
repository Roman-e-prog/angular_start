import { Injectable } from "@angular/core";
import {ofType, createEffect, Actions} from '@ngrx/effects'
import { Store } from "@ngrx/store";
import { createUebermich, 
         createUebermichError, 
         createUebermichSuccess,
         updateUebermich,
         updateUebermichSuccess,
         updateUebermichError,
         deleteUebermich,
         deleteUebermichSuccess,
         deleteUebermichError,
         getUebermich,
         getUebermichSuccess,
         getUebermichError,
         getAllUebermich,
         getAllUebermichSuccess,
         getAllUebermichError
        } from "../actions/uebermich.actions";
import { mergeMap, map, of, catchError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Uebermich } from "../reducers/uebermich.reducer";

@Injectable()
export class UebermichEffect{
api_url = 'http://localhost:5000/api/uebermich/';

createUebermich$ = createEffect(()=>
    this.actions$.pipe(
        ofType(createUebermich),
        mergeMap((action)=>{
           return this.httpClient.post(this.api_url, action.uebermichData).pipe(
                map((response:any)=>{
                    this.store.dispatch(getAllUebermich())
                    return createUebermichSuccess({uebermichData: response})
                }),
                catchError((error)=>{
                    return of(createUebermichError({error}))
                }
            ))
        })
    )
);
updateUebermich$ = createEffect(()=>
    this.actions$.pipe(
        ofType(updateUebermich),
        mergeMap((action)=>{
           return this.httpClient.put(this.api_url + action.id, action.uebermichData).pipe(
                map((response:any)=>{
                    this.store.dispatch(getAllUebermich())
                    return updateUebermichSuccess({uebermichData: response})
                }),
                catchError((error)=>{
                    return of(updateUebermichError({error}))
                }
            ))
        })
    )
);
deleteUebermich$ = createEffect(()=>
    this.actions$.pipe(
        ofType(deleteUebermich),
        mergeMap((action)=>{
           return this.httpClient.delete(this.api_url + action.id).pipe(
                map((response:any)=>{
                    this.store.dispatch(getAllUebermich())
                    return deleteUebermichSuccess({id:action.id})
                }),
                catchError((error)=>{
                    return of(deleteUebermichError({error}))
                }
            ))
        })
    )
);
getUebermich$ = createEffect(()=>
    this.actions$.pipe(
        ofType(getUebermich),
        mergeMap((action)=>{
           return this.httpClient.get(this.api_url + 'find/'+ action.id).pipe(
                map((response:any)=>{
                    return getUebermichSuccess({uebermichData:response})
                }),
                catchError((error)=>{
                    return of(getUebermichError({error}))
                }
            ))
        })
    )
);
getAllUebermich$ = createEffect(()=>
    this.actions$.pipe(
        ofType(getAllUebermich),
        mergeMap((action)=>{
           return this.httpClient.get(this.api_url + 'find').pipe(
                map((response:any)=>{
                    return getAllUebermichSuccess({uebermichData:response})
                }),
                catchError((error)=>{
                    return of(getAllUebermichError({error}))
                }
            ))
        })
    )
);



    
    constructor(private store: Store, private actions$: Actions, private httpClient: HttpClient){}
}