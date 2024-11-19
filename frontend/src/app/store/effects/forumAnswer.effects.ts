import { Injectable } from "@angular/core";
import {ofType, createEffect, Actions} from '@ngrx/effects'
import { Store } from "@ngrx/store";
import {
    createForumAnswer,
    createForumAnswerSuccess,
    createForumAnswerError,
    updateForumAnswer,
    updateForumAnswerSuccess,
    updateForumAnswerError,
    deleteForumAnswer,
    deleteForumAnswerSuccess,
    deleteForumAnswerError,
    getAllForumAnswer,
    getAllForumAnswerSuccess,
    getAllForumAnswerError,
    getForumAnswer,
    getForumAnswerSuccess,
    getForumAnswerError,
    getAllAnswersToQuestion,
    getAllAnswersToQuestionSuccess,
    getAllAnswersToQuestionError
} from '../actions/forumAnswers.actions';
import { mergeMap, map, of, catchError } from "rxjs";
import { HttpClient } from "@angular/common/http";


@Injectable()
export class ForumAnswerEffect{
api_url = 'http://localhost:5000/api/forumAnswers/';

createForumAnswer$ = createEffect(()=>
    this.actions$.pipe(
        ofType(createForumAnswer),
        mergeMap((action)=>{
           return this.httpClient.post(this.api_url, action.forumAnswerData).pipe(
                map((response:any)=>{
                    this.store.dispatch(getAllAnswersToQuestion({id: action.forumAnswerData.question_id}))
                    return createForumAnswerSuccess({forumAnswerData: response})
                }),
                catchError((error)=>{
                    return of(createForumAnswerError({error}))
                }
            ))
        })
    )
);
updateForumAnswer$ = createEffect(()=>
    this.actions$.pipe(
        ofType(updateForumAnswer),
        mergeMap((action)=>{
           return this.httpClient.put(this.api_url + action.id, action.forumAnswerData).pipe(
                map((response:any)=>{
                    this.store.dispatch(getAllAnswersToQuestion({id: action.forumAnswerData.question_id}))
                    return updateForumAnswerSuccess({forumAnswerData: response})
                }),
                catchError((error)=>{
                    return of(updateForumAnswerError({error}))
                }
            ))
        })
    )
);
deleteForumAnswer$ = createEffect(()=>
    this.actions$.pipe(
        ofType(deleteForumAnswer),
        mergeMap((action)=>{
           return this.httpClient.delete(this.api_url + action.id).pipe(
                map((response:any)=>{
                    this.store.dispatch(getAllForumAnswer())
                    return deleteForumAnswerSuccess({id:action.id})
                }),
                catchError((error)=>{
                    return of(deleteForumAnswerError({error}))
                }
            ))
        })
    )
);
getForumAnswer$ = createEffect(()=>
    this.actions$.pipe(
        ofType(getForumAnswer),
        mergeMap((action)=>{
           return this.httpClient.get(this.api_url + 'find/'+ action.id).pipe(
                map((response:any)=>{
                    return getForumAnswerSuccess({forumAnswerData:response})
                }),
                catchError((error)=>{
                    return of(getForumAnswerError({error}))
                }
            ))
        })
    )
);
getAllForumAnswer$ = createEffect(()=>
    this.actions$.pipe(
        ofType(getAllForumAnswer),
        mergeMap((action)=>{
           return this.httpClient.get(this.api_url + 'find/').pipe(
                map((response:any)=>{
                    return getAllForumAnswerSuccess({forumAnswerData:response})
                }),
                catchError((error)=>{
                    return of(getAllForumAnswerError({error}))
                }
            ))
        })
    )
);
getAllAnswersToQuestion$ = createEffect(()=>
    this.actions$.pipe(
        ofType(getAllAnswersToQuestion),
        mergeMap((action)=>{
           return this.httpClient.get(this.api_url + 'findAllAnswersToQuestion/'+ action.id).pipe(
                map((response:any)=>{
                    return getAllAnswersToQuestionSuccess({forumAnswerData:response})
                }),
                catchError((error)=>{
                    return of(getAllAnswersToQuestionError({error}))
                }
            ))
        })
    )
);



    
    constructor(private store: Store, private actions$: Actions, private httpClient: HttpClient){}
}