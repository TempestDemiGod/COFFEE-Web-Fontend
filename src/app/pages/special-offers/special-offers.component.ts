import { Component, OnInit } from '@angular/core';
import axios from '../../../utils/axios';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-special-offers',
  templateUrl: './special-offers.component.html',
  styleUrls: ['./special-offers.component.css']
})
export class SpecialOffersComponent implements OnInit{
  allProducts:any
  userProfile:boolean = false
  imgUser?: string 
  
  constructor(private router: Router, private cookie: CookieService){}

  async getProducts(){
    const products = await axios.get('/productSpecial')
    this.allProducts = products.data.products
  }


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
        if(Profile.data.user.avatar.secure_url){
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
    this.getProducts()
    if (this.cookie.get('token')){
      this.profileUser()
    }
  }

}
