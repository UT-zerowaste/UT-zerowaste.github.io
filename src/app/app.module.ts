import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule } from 'ngx-google-analytics';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentModule } from './content/content.module';
import { MatDialogModule } from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { NavigationModule } from './navigation/navigation.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
const materialMods = [MatFormFieldModule, MatDialogModule, MatToolbarModule, MatSnackBarModule];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ContentModule,
    NgxGoogleAnalyticsModule.forRoot('G-0L6N8L4M8X'),
    NgxGoogleAnalyticsRouterModule,
    NavigationModule,
    BrowserAnimationsModule,
    materialMods
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
