import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { Store } from '@ngrx/store';
import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit {

  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();

  exercises: Exercise[];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private trainingService: TrainingService, private store: Store<fromTraining.State>) { }

  ngOnInit() {
    this.exercises = [
      { id: 'crunches', name: 'Crunches', duration: 30, calories: 8, state: 'completed', date: new Date('4/4/18, 9:05 AM')},
      { id: 'crunches', name: 'Crunches', duration: 30, calories: 8, state: 'completed', date: new Date('4/5/18, 9:05 AM')},
      { id: 'crunches', name: 'Crunches', duration: 15, calories: 4, state: 'cancelled', date: new Date('4/6/18, 9:05 AM')},
      { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15, state: 'completed', date: new Date('4/4/18, 10:00 AM')},
      { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15, state: 'completed', date: new Date('4/5/18, 10:00 AM')},
      { id: 'touch-toes', name: 'Touch Toes', duration: 90, calories: 7.5, state: 'cancelled', date: new Date('4/6/18, 10:00 AM')},
      { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18, state: 'completed', date: new Date('4/8/18, 10:00 AM')},
      { id: 'burpees', name: 'Burpees', duration: 60, calories: 8, state: 'completed', date: new Date('4/4/18, 10:00 AM')}
    ];

  this.store.select(fromTraining.getFinishedTrainings).subscribe((exercises: Exercise[]) => {
        this.dataSource.data = exercises;
    });

    this.trainingService.fetchCompletedOrCancelledExercises();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
