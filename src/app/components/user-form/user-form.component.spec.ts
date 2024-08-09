import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { UserFormComponent } from './user-form.component';
import { Workout } from '../../models/workout.model';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;

  // Mock localStorage
  interface Storage {
    [key: string]: string;
  }

  const localStorageMock = (function () {
    let store: Storage = {};

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule], // Required for two-way binding with [(ngModel)]
      declarations: [UserFormComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;

    // Override localStorage with our mock
    spyOn(localStorage, 'getItem').and.callFake(localStorageMock.getItem);
    spyOn(localStorage, 'setItem').and.callFake(localStorageMock.setItem);
    spyOn(localStorage, 'clear').and.callFake(localStorageMock.clear);
    localStorageMock.clear(); // Clear the mock store before each test

    fixture.detectChanges(); // Trigger initial data binding
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should generate an ID for the workout', () => {
    const id = component.generateId();
    expect(typeof id).toBe('number');
    expect(id).toBeGreaterThan(0);
  });

  it('should add a workout and save to localStorage on form submission', () => {
    const testWorkout: Workout = {
      id: 1,
      name: 'Test User',
      type: 'Running',
      minutes: 30
    };

    // Spy on the addWorkout EventEmitter
    spyOn(component.addWorkout, 'emit');

    // Set form values
    component.name = testWorkout.name;
    component.workoutType = testWorkout.type;
    component.workoutMinutes = testWorkout.minutes;

    // Submit the form
    component.onSubmit();

    // Check if the workout was emitted
    expect(component.addWorkout.emit).toHaveBeenCalledWith(
      jasmine.objectContaining({
        name: 'Test User',
        type: 'Running',
        minutes: 30
      })
    );

    // Check if the workout was saved to localStorage
    const savedWorkouts = JSON.parse(localStorage.getItem('workouts') || '[]');
    expect(savedWorkouts.length).toBe(1);
    expect(savedWorkouts[0].name).toBe('Test User');
    expect(savedWorkouts[0].type).toBe('Running');
    expect(savedWorkouts[0].minutes).toBe(30);
  });

  it('should reset the form after submission', () => {
    component.name = 'Test User';
    component.workoutType = 'Running';
    component.workoutMinutes = 30;

    component.onSubmit();

    expect(component.name).toBe('');
    expect(component.workoutType).toBe('');
    expect(component.workoutMinutes).toBeNull();
  });
});
