import { Injectable } from '@angular/core';
import { Workout } from '../models/workout.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private workouts: Workout[] = [];

  constructor() {
    this.loadWorkoutsFromStorage();
    this.initializeDefaultData();
  }

  addWorkout(workout: Workout): void {
    this.workouts.push(workout);
    this.saveWorkoutsToStorage();
  }

  getWorkouts(): Workout[] {
    return this.workouts;
  }

  getWorkoutCount(name: string): number {
    return this.workouts.filter(workout => workout.name === name).length;
  }

  getTotalMinutes(name: string): number {
    return this.workouts
      .filter(workout => workout.name === name)
      .reduce((total, workout) => total + workout.minutes, 0);
  }

  private saveWorkoutsToStorage(): void {
    localStorage.setItem('workouts', JSON.stringify(this.workouts));
  }

  private loadWorkoutsFromStorage(): void {
    const savedWorkouts = localStorage.getItem('workouts');
    if (savedWorkouts) {
      this.workouts = JSON.parse(savedWorkouts);
    }
  }

  private initializeDefaultData(): void {
    if (this.workouts.length === 0) {
      // Add some default data
      const defaultWorkouts: Workout[] = [
        { id: this.generateId(), name: 'John Doe', type: 'Running', minutes: 30 },
        { id: this.generateId(), name: 'Jane Doe', type: 'Cycling', minutes: 45 },
        { id: this.generateId(), name: 'John Doe', type: 'Yoga', minutes: 60 }
      ];
      this.workouts = defaultWorkouts;
      this.saveWorkoutsToStorage();
    }
  }

  private generateId(): number {
    return Math.floor(Math.random() * 1000000);
  }
}
