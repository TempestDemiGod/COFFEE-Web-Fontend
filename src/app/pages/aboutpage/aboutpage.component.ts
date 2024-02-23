import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import axios from '../../../utils/axios';

@Component({
  selector: 'app-aboutpage',
  templateUrl: './aboutpage.component.html',
  styleUrls: ['./aboutpage.component.css']
})
export class AboutpageComponent implements OnInit{
  userProfile:boolean = false
  imgUser?: string 

  constructor(private router: Router, private cookie: CookieService){}

  async profileUser(){
    try {
      const cookie = this.cookie.get('token')
      const Profile = await axios.get('/user',{
        headers:{
          token: cookie
        }
      })
      if(Profile){
        this.userProfile = true
        if(Profile.data.user.avatar?.secure_url){
          this.imgUser = Profile.data.user.avatar.secure_url
        }
      }
      // this.course = allCourses.data
      // this.loading= false
    } catch (error) {
      console.log(error)
    }
  }

  ngOnInit(): void {
    if (this.cookie.get('token')){
      this.profileUser()
    }
  }
}
