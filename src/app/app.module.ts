import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import localeNl from '@angular/common/locales/nl';

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
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatPaginatorModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {ProductPageComponent} from './Components/product/product-page/product-page.component';
import {ProductPreviewComponent} from './Components/product/product-preview/product-preview.component';
import {ShoppingCartComponent} from './Components/shopping-cart/shopping-cart.component';
import {HttpClientModule} from '@angular/common/http';
import {CheckoutComponent} from './Components/checkout/checkout.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {registerLocaleData} from '@angular/common';
import { CheckoutStepperComponent } from './Components/checkout/checkout-stepper/checkout-stepper.component';

registerLocaleData(localeNl, 'nl');

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
    CheckoutComponent,
    CheckoutStepperComponent,
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
    HttpClientModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'nl-NL'
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
