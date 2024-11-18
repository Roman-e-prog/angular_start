import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services_interceptors/auth.service';
import { matMenuOutline } from '@ng-icons/material-icons/outline';
import { NgIconsModule } from '@ng-icons/core';
interface Navlinks{
  url:string,
  name:string
}
@Component({
  selector: 'app-mobile-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, NgIconsModule],
  templateUrl: './mobile-navbar.component.html',
  styleUrl: './mobile-navbar.component.scss'
})
export class MobileNavbarComponent implements OnInit{
  constructor(private httpClient: HttpClient, private authService: AuthService){}
navlinks: Navlinks[] | null = null;
menu = false;
handleMenu = ()=>{
  if(this.menu){
    this.menu = false;
  }
  else{
    this.menu = true;
  }
}
user = this.authService.getUser();
  ngOnInit(): void {
    this.httpClient.get<Navlinks[]>('assets/navlinks.json').subscribe({
      next: (data)=>{
        this.navlinks = data;
      },
      error: (error)=>{
        console.error('Error fetching navlinks:', error);
      }
    })
  }
  handleLogout = ()=>{
    this.authService.logout()
  }

}
