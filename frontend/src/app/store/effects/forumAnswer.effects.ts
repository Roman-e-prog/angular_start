import { Injectable } from "@angular/core";
import {ofType, createEffect, Actions} from '@ngrx/effects'
import { Store } from "@ngrx/store";
import {environment} from '../../environments/environment'
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
    getAllAnswersToQuestionError,
    incrementAnswerLikes,
    incrementAnswerLikesSuccess,
    incrementAnswerLikesError,
    incrementAnswerDisLikes,
    incrementAnswerDisLikesError,
    incrementAnswerDisLikesSuccess,
    hasSolved,
    hasSolvedSuccess,
    hasSolvedError
} from '../actions/forumAnswers.actions';
import { mergeMap, map, of, catchError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { getForumSuccess } from "../actions/forum.actions";


@Injectable()
export class ForumAnswerEffect{
api_url = `${environment.apiURL}api/forumAnswers/`;

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
                    this.store.dispatch(getAllAnswersToQuestion({id: action.question_id}))
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
// getAllForumAnswer$ = createEffect(()=>
//     this.actions$.pipe(
//         ofType(getAllForumAnswer),
//         mergeMap((action)=>{
//             console.log('I get all the forumAnswers')
//            return this.httpClient.get(this.api_url + 'find/').pipe(
//                 map((response:any)=>{
//                     return getAllForumAnswerSuccess({forumAnswerData:response})
//                 }),
//                 catchError((error)=>{
//                     return of(getAllForumAnswerError({error}))
//                 }
//             ))
//         })
//     )
// );
//works
// getAllAnswersToQuestion$ = createEffect(()=>
//     this.actions$.pipe(
//         ofType(getAllAnswersToQuestion),
//         mergeMap((action)=>{
//            return this.httpClient.get(this.api_url + 'findAllAnswersToQuestion/'+ action.id).pipe(
//                 map((response:any)=>{
//                     return getAllAnswersToQuestionSuccess({forumAnswerData:response})
//                 }),
//                 catchError((error)=>{
//                     return of(getAllAnswersToQuestionError({error}))
//                 }
//             ))
//         })
//     )
// );
//chaining -second in chaining
getAllAnswersToQuestion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getForumSuccess), 
      mergeMap(({ forumData }) => {
        const id = forumData.id; 
        return this.httpClient.get(this.api_url + 'findAllAnswersToQuestion/' + id).pipe(
          map((response: any) => getAllAnswersToQuestionSuccess({ forumAnswerData: response })),
          catchError((error) => of(getAllAnswersToQuestionError({ error })))
        );
      })
    )
  );
  
  incrementAnswerLikes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(incrementAnswerLikes),
      mergeMap(({ id, user_id }) =>
        this.httpClient.post(this.api_url + 'likes', { id, user_id }).pipe(
          map((response: any) =>
            incrementAnswerLikesSuccess({
              id: response.id,
              likes: response.likes,
            })
          ),
          catchError((error) => of(incrementAnswerLikesError({ error })))
        )
      )
    )
  );
  
  incrementAnswerDislikes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(incrementAnswerDisLikes),
      mergeMap(({ id, user_id }) =>{
           return this.httpClient.post(this.api_url + 'dislikes', { id, user_id }).pipe(
            map((response: any) =>{
                return incrementAnswerDisLikesSuccess({
                id: response.id,
                dislikes: response.dislikes,
                })
              }),
            catchError((error) => of(incrementAnswerDisLikesError({ error })))
            )
        })
    )
  );
  
  hasSolved$ = createEffect(() =>
    this.actions$.pipe(
      ofType(hasSolved),
      mergeMap(({ id, question_id }) =>
        this.httpClient.post(this.api_url + 'hasSolved', { id, question_id }).pipe(
          map((response: any) =>
            hasSolvedSuccess({ id, has_solved: true })
          ),
          catchError((error) => of(hasSolvedError({ error })))
        )
      )
    )
  );
  
    constructor(private store: Store, private actions$: Actions, private httpClient: HttpClient){}
}