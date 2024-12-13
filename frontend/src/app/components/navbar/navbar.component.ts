import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services_interceptors/auth.service';
import { NavlinksService } from '../../services_interceptors/navlinks.service';
interface Navlinks{
  url:string,
  name:string
}
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
constructor(private httpClient: HttpClient, private authService: AuthService, private navlinksService: NavlinksService){}
navlinks: Navlinks[] | null = null;
user = this.authService.getUser();
  ngOnInit(): void {
    this.navlinksService.getNavlinks().subscribe({
      next:(data)=>{
        this.navlinks = data;
      },
      error: (error)=>{
        console.error('Error fetching navlinks:', error)
      }
    })
    this.navlinksService.fetchNavlinks();
  }
  handleLogout = ()=>{
    this.authService.logout()
  }
}
