import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { Forum } from '../../store/reducers/forum.reducer';
import { Store } from '@ngrx/store';
import { selectAllForumData, selectForumError, selectForumLoading, selectForumMessage } from '../../store/selectors/forum.selectors';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { matCheckBoxOutline, matThumbDownOutline, matThumbUpOutline } from '@ng-icons/material-icons/outline';
import { NgIconsModule } from '@ng-icons/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services&interceptors/auth.service';
import { QuestionModuleComponent } from '../../components/question-module/question-module.component';
import { getAllForum } from '../../store/actions/forum.actions';
import { HtmlStripService } from '../../services&interceptors/htmlStrip.service';

@Component({
  selector: 'app-forum-ressort',
  standalone: true,
  imports: [NavbarComponent, CommonModule, RouterLink, QuestionModuleComponent, NgIconsModule],
  templateUrl: './forum-ressort.component.html',
  styleUrl: './forum-ressort.component.scss',
})
export class ForumRessortComponent implements OnInit{
constructor(private route: ActivatedRoute, 
            private store: Store, 
            private toastr: ToastrService, 
            private httpClient: HttpClient,
            private authService: AuthService,
            private htmlStripService: HtmlStripService,
          ){}

user = this.authService.getUser();
questionModule = false;
  // stripService
  getProcessedContent(content: string): string {
    return this.htmlStripService.stripHtml(content).trim();
  }
  //no likes
  noLikes = ()=>{
    this.toastr.error('Likes oder Dislikes können nur auf der Seite des Beitrags vergeben werden')
  }
allForum$: Observable<Forum[]> = this.store.select(selectAllForumData);
isLoading$: Observable<boolean> = this.store.select(selectForumLoading);
isError$: Observable<boolean> = this.store.select(selectForumError);
message$: Observable<string> = this.store.select(selectForumMessage);
name = this.route.snapshot.paramMap.get('name')
    filteredForums$ = this.allForum$.pipe(
      map((forum)=>{
        console.log(forum)
        return forum.filter((item)=>item.question_ressort === this.name)})
    )
 
  ngOnInit(): void {
    this.isError$.pipe(
      tap(isError => {
        if (isError) {
          this.message$.subscribe(errorMessage => {
            this.toastr.error(errorMessage);
          });
        }
      })
    ).subscribe();
    this.store.dispatch(getAllForum())
  }
  handleQuestion = ()=>{
    if(!this.user){
      this.toastr.error('Sie müssen sich einloggen, wenn Sie ein Thema eröffnen möchten')
    }
    else{
      this.questionModule = true;
      console.log(this.name)
    }
  }
  handleClose = ()=>{
    this.questionModule = false;
  }
  handleViews = (id:number)=>{
    this.httpClient.post('http://localhost:5000/api/forum/views', {id:id}).subscribe({
      next: (response)=>{
        console.log(response)
      }
    })
  }
}
