import { Component, Input, OnInit } from '@angular/core';
import axios from '../../../utils/axios';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  @Input() perfil?:boolean
  @Input() userImage?: string
  openOptionPerfil:boolean = true
  openMenu:boolean = true

  constructor(private router: Router , private cookie: CookieService ){}
  menuOpen(){
    this.openMenu = !this.openMenu
  }
  logout(){
    axios.get('/user/logout')
    const token = this.cookie.get('token')
    document.cookie = `token=${token}; expires=${new Date(0).toUTCString()};`;
    this.router.navigate(['/sign-in'])
  }

  ngOnInit(): void {
  }
}
