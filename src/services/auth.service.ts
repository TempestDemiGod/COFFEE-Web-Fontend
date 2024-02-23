import { Injectable } from '@angular/core';
import axios from '../utils/axios';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cookie: CookieService) { }

  async validator(cookie:any){
    try {
      const allCourses = await axios.get('/token',{
        headers:{
          token: cookie
        }
      })
      return true
    } catch (error:any) {
      return false
    }
  }

  getAuthToken(): Observable<boolean>{
    const cookie = this.cookie.get('token')
    console.log(cookie)
    let resToken
    if(cookie.length == 0){
      return of(false)
    }
    
    this.validator(cookie).then(res =>{
        resToken = res
    })
    if(resToken == false){
      return of(false)
    }
    return of(true)
  }
}
