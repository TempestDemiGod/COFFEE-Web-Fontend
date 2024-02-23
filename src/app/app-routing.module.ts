import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { AboutpageComponent } from './pages/aboutpage/aboutpage.component';
import { ProductsComponent } from './pages/products/products.component';
import { SpecialOffersComponent } from './pages/special-offers/special-offers.component';
import { LoginComponent } from './pages/login/login.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { CartComponent } from './pages/cart/cart.component';
import { loginGuard } from './guards/login.guard';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '' , redirectTo: 'home' , pathMatch: 'full'},
  { path:'home' , component: HomepageComponent },
  { path: 'about' , component: AboutpageComponent },
  { path: 'products' ,  component: ProductsComponent },
  { path: 'Special-Offers' , component: SpecialOffersComponent},
  { path: 'sign-in' , component: LoginComponent},
  { path: 'profile' , component: PerfilComponent},
  { path: 'buy' , component: CartComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
