import { Component, Input, ChangeDetectorRef  } from '@angular/core';
import { WorkoutService } from '../../services/workout.service';
import { Workout } from '../../models/workout.model';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.scss']
})
export class WorkoutListComponent {
  @Input() searchQuery: string = '';
  @Input() filterType: string = 'All';
  @Input() currentPage: number = 1;
  @Input() itemsPerPage: number = 5;

  constructor(public workoutService: WorkoutService, private cdr: ChangeDetectorRef) {}

  get filteredWorkouts(): Workout[] {
    let workouts = this.workoutService.getWorkouts();

    if (this.searchQuery) {
      workouts = workouts.filter(workout =>
        workout.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    if (this.filterType !== 'All') {
      workouts = workouts.filter(workout =>
        workout.type === this.filterType
      );
    }

    return workouts.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
  }

  get totalItems(): number {
    return this.filteredWorkouts.length;
  }

  ngOnChanges() {
    // Trigger change detection manually if needed
    this.cdr.detectChanges();
  }
}
