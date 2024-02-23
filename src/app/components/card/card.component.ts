import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import axios from '../../../utils/axios';
import { Router } from '@angular/router';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit{
  @Input() colorDesc:number=0
  @Input() product:any
  @Input() productOfHome?:boolean
  @Input() userForDelete?:boolean
  @Input() typeListProduct?:string

  URLProduct?:string
  NAMEProduct?:string
  PRICEProduct?:number
  DESCProduct?:number
  priceNew?:number

  idProduct?:string

  cartProduct:boolean = false

  constructor(private cookie: CookieService, private router: Router){}


  async addFavoriteProduct(){
    this.cartProduct = !this.cartProduct
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
      this.URLProduct = this.product.img.secure_url
      this.NAMEProduct = this.product.name
      this.PRICEProduct = this.product.price
      this.DESCProduct = this.product.porcDesc
      this.priceNew  = this.product.price - (this.product.price * (this.product.porcDesc / 100) )
  }
}
