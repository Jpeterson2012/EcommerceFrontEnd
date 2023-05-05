import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { Home2Component } from './home2/home2.component';
import { FormsModule } from '@angular/forms';
import { ProductsComponent } from './products/products.component';
import { ContactComponent } from './contact/contact.component';
import { DetailsComponent } from './details/details.component';
import { FilterComponent } from './filter/filter.component';
import { SearchComponent } from './search/search.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { CartComponent } from './cart/cart.component';
import { DBService } from './Services/db.service';
import { ImageService } from './Services/image.service';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartService } from './Services/cart.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';

import { httpInterceptorProviders } from './authentication/helpers/http.interceptor';
import { ProfileComponent } from './authentication/profile/profile.component';
import { AdminBoardComponent } from './authentication/adminboard/adminboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    Home2Component,
    ProductsComponent,
    ContactComponent,
    DetailsComponent,
    FilterComponent,
    SearchComponent,
    CartComponent,
    CheckoutComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    AdminBoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    NgbAccordionModule,
    

  ],
  providers: [DBService,ImageService,CartService,httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
