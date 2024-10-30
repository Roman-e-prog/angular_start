import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UebermichComponent } from './pages/uebermich/uebermich.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ForumComponent } from './pages/forum/forum.component';
import { BibliothekComponent } from './pages/bibliothek/bibliothek.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "uebermich", component: UebermichComponent},
    {path: "blog", component: BlogComponent},
    {path: "forum", component: ForumComponent},
    {path: "bibliothek", component: BibliothekComponent},
    {path: "register", component: RegisterComponent},
    {path: "login", component: LoginComponent},
    {path: "dashboard", component: DashboardComponent},
];
