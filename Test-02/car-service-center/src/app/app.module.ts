import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DashboardComponent } from '../app/pages/dashboard/dashboard.component'; 
import { AddCarComponent } from './pages/add-car/add-car.component';
import { ManageJobsComponent } from './pages/manage-jobs/manage-jobs.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent, 
    AddCarComponent,
    ManageJobsComponent,
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

