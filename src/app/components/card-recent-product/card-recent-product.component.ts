import { Component, Input, OnInit } from '@angular/core';
import axios from '../../../utils/axios';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-recent-product',
  templateUrl: './card-recent-product.component.html',
  styleUrls: ['./card-recent-product.component.css']
})
export class CardRecentProductComponent implements OnInit {
  @Input() product:any

  @Input() productOfHome?:boolean
  @Input() userForDelete?:boolean
  @Input() typeListProduct?:string

  nameProduct?:string
  imgProduct?:string
  priceProduct?:number
  idProduct?:string

  favoriteProduct:boolean = false

  constructor(private cookie: CookieService , private router : Router){}

  async addFavoriteProduct(){
    this.favoriteProduct = !this.favoriteProduct
    const cookie = this.cookie.get('token')
    const newFavorite = await axios.post('/user/favorite',{
      id: this.idProduct
    },{
      headers:{
        token: cookie
      }
    })
  }

  async addCartProduct(){
    const cookie = this.cookie.get('token')
    const newFavorite = await axios.post('/user/cart',{
      id: this.idProduct
    },{
      headers:{
        token: cookie
      }
    })
  }

  async deleteProductCart(){
    const cookie = this.cookie.get('token')
    const newFavorite = await axios.delete(`/user/cart/${this.idProduct}`,{
      headers:{
        token: cookie
      }
    }).then(()=>{
      this.router.navigate(['/home'])
    })
  }

  async deleteProductFavorite(){
    const cookie = this.cookie.get('token')
    const newFavorite = await axios.delete(`/user/favorite/${this.idProduct}`,{
      headers:{
        token: cookie
      }
    }).then(()=>{
      this.router.navigate(['/home'])
    })
  }

  deleteProductList(){
    if(this.typeListProduct == 'cart'){
      this.deleteProductCart()
    }else{
      this.deleteProductFavorite()
    }
  }

  ngOnInit(): void {
      this.idProduct = this.product._id
      this.nameProduct = this.product.name
      this.imgProduct = this.product.img.secure_url
      this.priceProduct = this.product.price
  }
}
