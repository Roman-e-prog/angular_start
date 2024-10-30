import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
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
constructor(private httpClient: HttpClient){}
navlinks: Navlinks[] | null = null;

  ngOnInit(): void {
    this.httpClient.get<Navlinks[]>('../../jsons/navlinks.json').subscribe({
      next: (data)=>{
        this.navlinks = data;
      },
      error: (error)=>{
        console.error('Error fetching navlinks:', error);
      }
    })
  }
}
