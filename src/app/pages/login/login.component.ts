import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import axios from "../../../utils/axios";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  constructor( private router: Router, private cookie: CookieService){}

  loginChange: boolean = true
  useForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required,Validators.minLength(6)])
  })
  RegisterForm = new FormGroup({
    username: new FormControl('', [Validators.required,Validators.minLength(6)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required,Validators.minLength(6)])
  })
  register: boolean=false
  errors:any = []
  auth = async() => {
    try {
      let user = await axios.post('/user/signIn',this.useForm.value).then(res=>{
        console.log('res')
    console.log(res)
    const token = res.data.token;
    console.log(token)
    console.log(res.data)
    const now = new Date();
    const expires = new Date(now.getTime() + 60 * 60 * 1000);

    document.cookie = `token=${token}; expires=${expires.toUTCString()};`;
      })
      // this.loginChange = false
      this.router.navigate(["/"])
      
      const cookie = this.cookie.get('token')
      console.log('cookie local')
    console.log(cookie)
    } catch (error) {
      this.loginChange = true
      let e:any = error
      this.errors = e.response.data
      const timer = setTimeout(()=>{
        this.errors = []
      },3000)
      
    }
  }

  Register = async() => {
    try {
      console.log(this.RegisterForm)
      let user = await axios.post('/user/signUp',this.RegisterForm.value).then(res=>{
        console.log('res')
    console.log(res)
    const token = res.data.data.token;
    console.log(token)
    const now = new Date();
    const expires = new Date(now.getTime() + 10 * 60 * 1000);

    document.cookie = `token=${token}; expires=${expires.toUTCString()};`;
      })
      this.loginChange = false
      this.router.navigate(["/"])
    } catch (error) {
      this.loginChange = true
      let e:any = error
      this.errors = e.response.data
      const timer = setTimeout(()=>{
        this.errors = []
      },3000)
      
    }
  }

  Submit(){
    try {
      this.auth()
    } catch (error) {
      console.log(error)
    }
    
  }

  RegisterSubmit(){
    try {
      this.Register()
    } catch (error) {
      console.log(error)
    }
    
  }

  ngOnInit(): void {
      if (this.cookie.get('token')){
        this.router.navigate(['/'])
      }
  }
}
