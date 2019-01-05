import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './Components/login/login.component';
import {ProductComponent} from './Components/product/product.component';
import {ErrorComponent} from './Components/error/error.component';
import {ShoppingCartComponent} from './Components/shopping-cart/shopping-cart.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'producten', component: ProductComponent},
  {path: 'winkelwagen', component: ShoppingCartComponent},
  {path: 'niet-gevonden', component: ErrorComponent, data: {message: 'Pagina niet gevonden.'}},
  {path: '**', redirectTo: '/niet-gevonden'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
