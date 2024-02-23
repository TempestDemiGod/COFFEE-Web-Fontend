import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import axios from '../../../utils/axios';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit{
  modal:boolean = false
  image:any
  previsualizacion?: string
  userProfile:boolean = false
  imgUser?: string 

  listFavorite?:any

  constructor(private sanitizer: DomSanitizer , private router: Router, private cookie: CookieService){}

  captureFile(event:any){
    // console.log(event.target.files)
    const archivoCapturado = event.target.files[0]
    this.extraerBase64(archivoCapturado).then((image:any) =>{
      this.previsualizacion = image.base
    })
    this.image = archivoCapturado
  }

// base 64 image ---

  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event)
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg)
      const reader = new FileReader()
      reader.readAsDataURL($event)
      reader.onload = () => {
        resolve({
          base: reader.result
        })
      }
      reader.onerror = error => {
        resolve({
          base: null
        })
      }
    } catch (error) {
      reject(null) 
    }
  })
  
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
      let favorite = Profile.data.user.favorite
      if( favorite.length > 0){
        this.listFavorite = favorite
      }

      // this.course = allCourses.data
      // this.loading= false
    } catch (error) {
      console.log(error)
    }
  }

  async saveImage(){
    try {
      const formAvatar = new FormData()
      formAvatar.append('avatar', this.image)
      const avatar = await axios.put('/user/avatar', formAvatar )
  
      if(avatar){
        location.reload()
      }
    } catch (error) {
      console.log(error)
    }
    // console.log(this.image)
  }

  modalClose(){
    this.modal = !this.modal
    delete this.previsualizacion;
  }


  ngOnInit(): void {
    
    if (this.cookie.get('token')){
      this.profileUser()
    }else{
      this.router.navigate(['/'])
    }
  }
}
