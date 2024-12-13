import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UebermichComponent } from './pages/uebermich/uebermich.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ForumComponent } from './pages/forum/forum.component';
import { BibliothekComponent } from './pages/bibliothek/bibliothek.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AccountComponent } from './pages/account/account.component';
import { ForumRessortComponent } from './pages/forum-ressort/forum-ressort.component';
import { SingleBlogComponent } from './pages/single-blog/single-blog.component';
import { SingleQuestionComponent } from './pages/single-question/single-question.component';
import { ResetComponent } from './pages/reset/reset.component';
import { FallbackComponent } from './pages/fallback/fallback.component';

export const routes: Routes = [
    {path: "", component: HomeComponent, pathMatch: 'full'},
    {path: "uebermich", component: UebermichComponent, pathMatch: 'full'},
    {path: "blog", component: BlogComponent, pathMatch: 'full'},
    {path: "forum", component: ForumComponent, pathMatch: 'full'},
    {path: "bibliothek", component: BibliothekComponent},
    {path: "register", component: RegisterComponent},
    {path: "login", component: LoginComponent},
    {path: "dashboard", component: DashboardComponent},
    {path: "account/:id", component: AccountComponent},
    {path: "blog/:id", component: SingleBlogComponent },
    {path: "forum/:name", component: ForumRessortComponent},
    {path: "reset/:token", component: ResetComponent},
    {path:"forum/:ressort/:id", component:SingleQuestionComponent},
    {path:"**", component:FallbackComponent},
];
