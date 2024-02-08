import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './api-service.service'; // Import ApiService

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule // Add HttpClientModule to imports array
    
  ],
  providers: [
    ApiService, // Add ApiService to providers array if not already added
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
