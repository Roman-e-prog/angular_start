import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services&interceptors/auth.service';
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
constructor(private httpClient: HttpClient, private authService: AuthService){}
navlinks: Navlinks[] | null = null;
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
