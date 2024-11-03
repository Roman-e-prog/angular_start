import { Injectable } from "@angular/core";
import {ofType, createEffect, Actions} from '@ngrx/effects'
import { Store } from "@ngrx/store";
import {
    createBibliothek,
    createBibliothekSuccess,
    createBibliothekError,
    updateBibliothek,
    updateBibliothekSuccess,
    updateBibliothekError,
    deleteBibliothek,
    deleteBibliothekSuccess,
    deleteBibliothekError,
    getAllBibliothek,
    getAllBibliothekSuccess,
    getAllBibliothekError,
    getBibliothek,
    getBibliothekSuccess,
    getBibliothekError
} from '../actions/bibliothek.actions';
import { mergeMap, map, of, catchError } from "rxjs";
import { HttpClient } from "@angular/common/http";


@Injectable()
export class BibliothekEffect{
api_url = 'http://localhost:5000/api/bibliothek/';

createBibliothek$ = createEffect(()=>
    this.actions$.pipe(
        ofType(createBibliothek),
        mergeMap((action)=>{
           return this.httpClient.post(this.api_url, action.BibliothekData).pipe(
                map((response:any)=>{
                    this.store.dispatch(getAllBibliothek())
                    return createBibliothekSuccess({bibliothekData: response})
                }),
                catchError((error)=>{
                    return of(createBibliothekError({error}))
                }
            ))
        })
    )
);
updateBibliothek$ = createEffect(()=>
    this.actions$.pipe(
        ofType(updateBibliothek),
        mergeMap((action)=>{
           return this.httpClient.put(this.api_url + action.id, action.bibliothekData).pipe(
                map((response:any)=>{
                    this.store.dispatch(getAllBibliothek())
                    return updateBibliothekSuccess({bibliothekData: response})
                }),
                catchError((error)=>{
                    return of(updateBibliothekError({error}))
                }
            ))
        })
    )
);
deleteBibliothek$ = createEffect(()=>
    this.actions$.pipe(
        ofType(deleteBibliothek),
        mergeMap((action)=>{
           return this.httpClient.delete(this.api_url + action.id).pipe(
                map((response:any)=>{
                    this.store.dispatch(getAllBibliothek())
                    return deleteBibliothekSuccess({id:action.id})
                }),
                catchError((error)=>{
                    return of(deleteBibliothekError({error}))
                }
            ))
        })
    )
);
getBibliothek$ = createEffect(()=>
    this.actions$.pipe(
        ofType(getBibliothek),
        mergeMap((action)=>{
           return this.httpClient.get(this.api_url + 'find/'+ action.id).pipe(
                map((response:any)=>{
                    return getBibliothekSuccess({bibliothekData:response})
                }),
                catchError((error)=>{
                    return of(getBibliothekError({error}))
                }
            ))
        })
    )
);
getAllBibliothek$ = createEffect(()=>
    this.actions$.pipe(
        ofType(getAllBibliothek),
        mergeMap((action)=>{
           return this.httpClient.get(this.api_url + 'find/').pipe(
                map((response:any)=>{
                    return getAllBibliothekSuccess({data:response})
                }),
                catchError((error)=>{
                    return of(getAllBibliothekError({error}))
                }
            ))
        })
    )
);



    
    constructor(private store: Store, private actions$: Actions, private httpClient: HttpClient){}
}