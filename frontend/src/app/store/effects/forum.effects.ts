import { Injectable } from "@angular/core";
import {ofType, createEffect, Actions} from '@ngrx/effects'
import { Store } from "@ngrx/store";
import {environment} from '../../environments/environment'
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
    getForumError,
    getAllUserQuestions,
    getAllUserQuestionsSuccess,
    getAllUserQuestionsError,
    incrementLikes,
    incrementLikesError,
    incrementDisLikes,
    incrementDisLikesError,
    incrementViews,
    incrementViewsError,
    incrementLikesSuccess,
    incrementDisLikesSuccess,
    incrementViewsSuccess,
} from '../actions/forum.actions';
import { mergeMap, map, of, catchError, tap, switchMap, timeout, retry, take, finalize, concatMap, delay } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { getAllAnswersToQuestion, getAllAnswersToQuestionSuccess } from "../actions/forumAnswers.actions";
import { Forum } from "../reducers/forum.reducer";


@Injectable()
export class ForumEffect{
api_url = `${environment.apiURL}api/forum/`;

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
                    this.store.dispatch(getForum({id: action.id}))
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
//combination
// loadPageData$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(loadPageData),
//       concatMap(({ id }) =>
//         this.httpClient.get(this.api_url + 'find/' + id).pipe(
//           map((response:any) => getForumSuccess({ forumData:response })),
//           catchError((error) => of(getForumError({ error }))),
//           tap(() => {
//             // Trigger the next action after `getForum` is complete
//             this.store.dispatch(incrementViews({ id }));
//           }),
//           finalize(() => {
//             // Trigger fetching answers after `incrementViews` is dispatched
//             this.store.dispatch(getAllAnswersToQuestion({ id }));
//           })
//         )
//       )
//     )
//   );
  //works but not best practice
// getForum$ = createEffect(()=>
//     this.actions$.pipe(
//         ofType(getForum),
//         delay(100), 
//         mergeMap((action)=>{
//            return this.httpClient.get(this.api_url + 'find/'+ action.id).pipe(
//                 map((response:any)=>{
//                     this.store.dispatch(getAllAnswersToQuestion({id: action.id}))
//                     this.viewsService.getViews(action.id) //this is still called but reaches the endpoint
//                     return getForumSuccess({forumData:response})
//                 }),
//                 catchError((error)=>{
//                     return of(getForumError({error}))
//                 }
//             ))
//         })
//     )
// );
//chaining
getForum$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getForum),
      mergeMap(({ id }) =>
        this.httpClient.get(this.api_url + 'find/' + id).pipe(
          map((response: any) => getForumSuccess({ forumData: response })),
          catchError((error) => of(getForumError({ error })))
        )
      )
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
getAllUserQuestions$ = createEffect(()=>
this.actions$.pipe(
    ofType(getAllUserQuestions),
    mergeMap((action)=>{
        return this.httpClient.get(this.api_url + 'allUserQuestions/' + action.id).pipe(
            map((response:any)=>{
                return getAllUserQuestionsSuccess({data: response})
            }),
            catchError((error)=>{
                return of(getAllUserQuestionsError(error))
            })
        )
    })
))
incrementLikes$ = createEffect(()=>
this.actions$.pipe(
    ofType(incrementLikes),
    mergeMap(({id, user_id})=>{
        return this.httpClient.post(this.api_url + 'likes', {id, user_id}).pipe(
            map((response:any)=>{
                this.store.dispatch(getForum({id:id}))
                return incrementLikesSuccess()
            }),
            catchError((error)=>{
                return of(incrementLikesError(error))
            })
        )

    })
))
incrementDisLikes$ = createEffect(()=>
this.actions$.pipe(
    ofType(incrementDisLikes),
    mergeMap(({id, user_id})=>{
        return this.httpClient.post(this.api_url + 'dislikes', {id, user_id}).pipe(
            map((response:any)=>{
                this.store.dispatch(getForum({id:id}))
                return incrementDisLikesSuccess()
            }),
            catchError((error)=>{
                return of(incrementDisLikesError(error))
            })
        )
    })
))
// incrementViews$ = createEffect(()=>
// this.actions$.pipe(
//     ofType(incrementViews),
//     delay(100),
//     mergeMap(({id})=>{
//         return this.httpClient.post(this.api_url + 'views', {id}).pipe(
//             map((response:any)=>{
//                 return incrementViewsSuccess()
//             }),
//             catchError((error)=>{
//                 return of(incrementViewsError(error))
//             })
//         )
//     })
// ))
//chaining third in chaining
incrementViews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllAnswersToQuestionSuccess, getForumSuccess), // Its possible to listen to multiple actions
      mergeMap((action) => {
        // Set the ID based on the action type, because question can have answers or not
        //Because of the chaining the forumData.id is in every case in the action
        let forumId;
        let forumAnswerId
        if('forumAnswerData' in action){
            forumAnswerId = action.forumAnswerData?.[0]?.question_id
        }
        else{
            forumId = action.forumData.id;
        }
        if (!forumAnswerId && !forumId) {
          return of(incrementViewsError({ error: 'No valid ID found for incrementing views' }));
        }
        const id = forumId;
        return this.httpClient.post(this.api_url + 'views', { id }).pipe(
          map(() =>{ 
            return incrementViewsSuccess()}),
          catchError((error) =>{ 
            return of(incrementViewsError({ error }))})
        );
      })
    )
  );
  

    constructor(private store: Store, private actions$: Actions, private httpClient: HttpClient){}
}