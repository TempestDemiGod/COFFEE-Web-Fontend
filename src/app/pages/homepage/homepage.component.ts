import { Component, OnInit } from '@angular/core';
import axios from '../../../utils/axios';
import { CookieService } from 'ngx-cookie-service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})



export class HomepageComponent implements OnInit {
  specialProductsOptions:string = 'accessories'
  userProfile:boolean = false
  imgUser?: string 
  productsAccessories:any
  productsCoffe:any
  productsInstant:any
  mainProducts:any 

  constructor(private router: Router, private cookie: CookieService){}
  changeOption(option:string){
    this.specialProductsOptions=option
  } 
  addAnimation(){
    const scrollers = document.querySelectorAll(".scroller");
    
    scrollers.forEach(scroller => {
      scroller.setAttribute("data-animated", "true")
      const scrollerInner:any = scroller.querySelector(".scroller__inner");
    const scrollerContent = Array.from(scrollerInner?.children);

    scrollerContent.forEach((item:any) => {
      const duplicatedItem = item?.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });
    });
    
  }
  
  async getProducts(){
    const products = await axios.get('/product/main')
    const productsA = await axios.get('/product/desc/A')
    const productsC = await axios.get('/product/desc/C')
    const productsI = await axios.get('/product/desc/I')
    
    this.productsAccessories = productsA.data.products
    this.productsCoffe = productsC.data.products
    this.productsInstant = productsI.data.products
    this.mainProducts = products.data.products
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
    
    this.addAnimation()
    this.getProducts()
    if (this.cookie.get('token')){
      this.profileUser()
    }else{
      console.log('token inexistente')
      console.log(this.cookie.get('token'))
    }

  }
}
