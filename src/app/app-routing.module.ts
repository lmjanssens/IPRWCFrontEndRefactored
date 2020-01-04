import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './Components/login/login.component';
import {ProductComponent} from './Components/product/product.component';
import {ErrorComponent} from './Components/error/error.component';
import {ShoppingCartComponent} from './Components/shopping-cart/shopping-cart.component';
import {CheckoutComponent} from './Components/checkout/checkout.component';
import {AuthGuardService} from './services/auth-guard.service';
import {ProductPageComponent} from './Components/product/product-page/product-page.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'producten', component: ProductComponent, canActivate: [AuthGuardService]},
  {path: 'producten/:supplierid', component: ProductPageComponent, canActivate: [AuthGuardService]},
  {path: 'winkelwagen', component: ShoppingCartComponent, canActivate: [AuthGuardService]},
  {path: 'niet-gevonden', component: ErrorComponent, data: {message: 'Pagina niet gevonden.'}},
  {path: 'afrekenen', component: CheckoutComponent, canActivate: [AuthGuardService]},
  {path: '**', redirectTo: '/niet-gevonden'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
