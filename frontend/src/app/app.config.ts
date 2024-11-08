import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideStore} from '@ngrx/store';
import { provideStoreDevtools} from '@ngrx/store-devtools';
import { uebermichReducer } from './store/reducers/uebermich.reducer';
import { blogReducer } from './store/reducers/blog.reducer';
import { forumReducer } from './store/reducers/forum.reducer';
import { forumAnswerReducer } from './store/reducers/forumAnswer.reducer';
import { forumThemeReducer } from './store/reducers/forumTheme.reducer';
import { BlogmemberReducer } from './store/reducers/blogMember.reducer';
import { bibliothekReducer } from './store/reducers/bibliothek.reducer';
import { adminMessageReducer } from './store/reducers/adminMessage.reducer';
import { userMessageReducer } from './store/reducers/userMessage.reducer';
import { provideEffects } from '@ngrx/effects';
import { UebermichEffect } from './store/effects/uebermich.effects';
import { BlogEffect } from './store/effects/blog.effects';
import { ForumEffect } from './store/effects/forum.effects';
import { ForumAnswerEffect } from './store/effects/forumAnswer.effects';
import { ForumThemeEffect } from './store/effects/forumTheme.effects';
import { AdminMessagesEffect } from './store/effects/adminMessage.effects';
import { UserMessagesEffect } from './store/effects/userMessage.effects';
import { BlogmemberEffect } from './store/effects/blogmember.effects';
import { BibliothekEffect } from './store/effects/bibliothek.effects';
import { environment } from './environments/environment';
import { provideQuillConfig } from 'ngx-quill';
import { JwtInterceptor } from './services&interceptors/http.interceptor';
import { provideIcons } from '@ng-icons/core';
import { NgIconsModule } from '@ng-icons/core';
import {matEditOutline, matDeleteOutline, matThumbUpOutline, matThumbDownOutline, matCheckBoxOutline, matArrowBackOutline, matReplyOutline} from '@ng-icons/material-icons/outline'
import { HtmlStripService } from './services&interceptors/htmlStrip.service';
import { provideHighlightOptions } from 'ngx-highlightjs';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    provideAnimations(),
    provideToastr(),
    provideStore({
      uebermich: uebermichReducer,
      blog: blogReducer,
      forum: forumReducer,
      forumAnswer: forumAnswerReducer,
      forumTheme: forumThemeReducer,
      blogmember: BlogmemberReducer,
      bibliothek: bibliothekReducer,
      adminmessage: adminMessageReducer,
      usermessage: userMessageReducer,
    }),
    provideEffects([
      UebermichEffect,
      BlogEffect,
      ForumEffect,
      ForumAnswerEffect,
      ForumThemeEffect,
      AdminMessagesEffect,
      UserMessagesEffect,
      BlogmemberEffect,
      BibliothekEffect,
    ]),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    provideHighlightOptions({
      fullLibraryLoader: () => import('highlight.js')
    }),
    provideQuillConfig({
      modules: {
        syntax: false,
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          ['blockquote', 'code-block'],
      
          [{ 'header': 1 }, { 'header': 2 }],               // custom button values
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
          [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
          [{ 'direction': 'rtl' }],                         // text direction
      
          [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      
          [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
          [{ 'font': [] }],
          [{ 'align': [] }],
      
          ['clean'],                                         // remove formatting button
      
          ['link', 'image', 'video'] 
        ]
      }
    }),
    {provide: HtmlStripService},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi:true},
    provideIcons({
      matEditOutline,
      matDeleteOutline, 
      matThumbUpOutline, 
      matThumbDownOutline, 
      matCheckBoxOutline, 
      matArrowBackOutline,
      matReplyOutline,
    })
  ]
};
