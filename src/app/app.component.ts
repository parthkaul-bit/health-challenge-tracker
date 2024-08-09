import { Component, OnInit } from '@angular/core';
import { WorkoutService } from './services/workout.service';
import { Workout } from './models/workout.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  searchQuery: string = '';
  filterType: string = 'All';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0; 
  
  ngOnInit() {
    this.updateTotalItems();
  
  }
  constructor(private workoutService: WorkoutService) {}

  onAddWorkout(workout: Workout) {
    this.workoutService.addWorkout(workout);
    this.updateTotalItems(); 

    const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    if (this.currentPage > totalPages) {
      this.currentPage = totalPages;
    }
    
  }

  private updateTotalItems() {
    this.totalItems = this.workoutService.getWorkouts().length;
  }

}
