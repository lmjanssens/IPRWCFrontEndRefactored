import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {ProductComponent} from './components/product/product.component';
import {ErrorComponent} from './components/error/error.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'producten', component: ProductComponent},
  {path: 'niet-gevonden', component: ErrorComponent, data: {message: 'Pagina niet gevonden.'}},
  {path: '**', redirectTo: '/niet-gevonden'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
