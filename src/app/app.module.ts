import { NgModule } from '@angular/core';
import { NgxScrollTopModule } from 'ngx-scrolltop';
import { NgApexchartsModule } from "ng-apexcharts";
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';





@NgModule({
    declarations: [
        AppComponent,
        SignupComponent,
        

    ],
    imports: [
        BrowserModule,
        FormsModule,
        CarouselModule,
        AppRoutingModule,
        NgxScrollTopModule,
        NgApexchartsModule,
        NgbModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ToastrModule.forRoot(),

        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
