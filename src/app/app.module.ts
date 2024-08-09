// src/app/app.module.ts
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import if using forms

import { AppComponent } from './app.component';
import { WorkoutListComponent } from './components/workout-list/workout-list.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { SearchFilterComponent } from './components/search-filter/search-filter.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { WorkoutService } from './services/workout.service';

@NgModule({
  declarations: [
    AppComponent,
    WorkoutListComponent,
    PaginationComponent,
    SearchFilterComponent,
    UserFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [WorkoutService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA] // Add this line
})
export class AppModule { }
