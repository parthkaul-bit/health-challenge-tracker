import { Component, EventEmitter, Output } from '@angular/core';
import { Workout } from '../../models/workout.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  name: string = '';
  workoutType: string = '';
  workoutMinutes: number | null = null;
  submitted: boolean = false;  // Track form submission

  @Output() addWorkout = new EventEmitter<Workout>();

  onSubmit() {
    this.submitted = true;  // Set the submitted flag to true

    if (this.name && this.workoutType && this.workoutMinutes && this.workoutMinutes > 0) {
      const workout: Workout = {
        id: this.generateId(),
        name: this.name,
        type: this.workoutType,
        minutes: this.workoutMinutes
      };
      this.addWorkout.emit(workout);
      this.saveToLocalStorage(workout);
      this.resetForm();
      this.submitted = false;  // Reset the flag after a successful submission
    }
  }

  generateId(): number {
    return Math.floor(Math.random() * 1000000);
  }
  
  resetForm() {
    this.name = '';
    this.workoutType = '';
    this.workoutMinutes = null;
  }

  saveToLocalStorage(workout: Workout) {
    const workouts = JSON.parse(localStorage.getItem('workouts') || '[]');
    workouts.push(workout);
    localStorage.setItem('workouts', JSON.stringify(workouts));
  }
}
