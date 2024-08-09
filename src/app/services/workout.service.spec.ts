import { TestBed } from '@angular/core/testing';
import { WorkoutService } from './workout.service';
import { Workout } from '../models/workout.model';

describe('WorkoutService', () => {
  let service: WorkoutService;
  
  // Define type for localStorage mock
  interface Storage {
    [key: string]: string;
  }

  const localStorageMock = (function () {
    let store: Storage = {}; // Use the defined type here

    return {
      getItem: function (key: string) {
        return store[key] || null;
      },
      setItem: function (key: string, value: string) {
        store[key] = value.toString();
      },
      clear: function () {
        store = {};
      }
    };
  })();

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutService);
    
    // Override localStorage with our mock
    spyOn(localStorage, 'getItem').and.callFake(localStorageMock.getItem);
    spyOn(localStorage, 'setItem').and.callFake(localStorageMock.setItem);
    spyOn(localStorage, 'clear').and.callFake(localStorageMock.clear);
    localStorageMock.clear(); // Clear the mock store before each test


  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with default data if no workouts in localStorage', () => {
    const workouts = service.getWorkouts();
    expect(workouts.length).toBeGreaterThan(0); // Check that some workouts are present

    // Verify that default workouts have been added
    const defaultNames = ['John Doe', 'Jane Doe'];
    expect(workouts.some(workout => defaultNames.includes(workout.name))).toBeTrue();
  });

  it('should add a workout and save to localStorage', () => {
    service['workouts'] = [];
    service['saveWorkoutsToStorage']();
    
    const workout: Workout = {
      id: 1,
      name: 'Test Workout',
      type: 'Running',
      minutes: 45
    };

    service.addWorkout(workout);

    const workouts = service.getWorkouts();
    expect(workouts.length).toBe(1);
    expect(workouts[0].name).toBe('Test Workout');
    expect(workouts[0].type).toBe('Running');
    expect(workouts[0].minutes).toBe(45);

    const savedWorkouts = JSON.parse(localStorage.getItem('workouts') || '[]');
    expect(savedWorkouts.length).toBe(1);
    expect(savedWorkouts[0].name).toBe('Test Workout');
    expect(savedWorkouts[0].type).toBe('Running');
    expect(savedWorkouts[0].minutes).toBe(45);
  });

  it('should return workout count by name', () => {
    const workout: Workout = {
      id: 2,
      name: 'Test Workout',
      type: 'Cycling',
      minutes: 60
    };

    service.addWorkout(workout);

    const count = service.getWorkoutCount('Test Workout');
    expect(count).toBe(1);
  });

  it('should return total minutes by name', () => {
    const workout1: Workout = {
      id: 3,
      name: 'Test Workout',
      type: 'Swimming',
      minutes: 30
    };

    const workout2: Workout = {
      id: 4,
      name: 'Test Workout',
      type: 'Swimming',
      minutes: 45
    };

    service.addWorkout(workout1);
    service.addWorkout(workout2);

    const totalMinutes = service.getTotalMinutes('Test Workout');
    expect(totalMinutes).toBe(75);
  });
});
