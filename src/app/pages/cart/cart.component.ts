import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from '../../../utils/axios';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  userProfile:boolean = false
  imgUser?: string 
  priceTotal: number = 0
  listCart?:any
  nProducts: number = 0

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
      let cart = Profile.data.user.cart
      this.nProducts = cart.length
      if( this.nProducts > 0){
        for(let i = 0 ; this.nProducts > i ; i++){
          this.priceTotal = this.priceTotal + parseInt(cart[i].price)
        }
        this.priceTotal
        this.listCart = cart
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
    }else{
      this.router.navigate(['/'])
    }
  }
}
