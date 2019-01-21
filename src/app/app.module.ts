import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LoginComponent} from './Components/login/login.component';
import {SharedModule} from './material-data/shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavbarComponent} from './Components/navbar/navbar.component';
import {ProductComponent} from './Components/product/product.component';
import {ErrorComponent} from './Components/error/error.component';
import {AppRoutingModule} from './app-routing.module';
import {LayoutModule} from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule
} from '@angular/material';
import {ProductPageComponent} from './Components/product/product-page/product-page.component';
import {ProductPreviewComponent} from './Components/product/product-preview/product-preview.component';
import {ShoppingCartComponent} from './Components/shopping-cart/shopping-cart.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    ProductComponent,
    ErrorComponent,
    ProductPageComponent,
    ProductPreviewComponent,
    ShoppingCartComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
