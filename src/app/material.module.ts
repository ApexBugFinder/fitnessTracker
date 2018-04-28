import { NgModule } from '@angular/core';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatSidenav, 
          MatListModule, MatTabsModule, MatCardModule, MatSelectModule, MatProgressSpinnerModule, 
          MatDialogModule, MatSortModule, MatPaginator, MatPaginatorModule, MatSnackBarModule,
          MatDatepickerModule, MatNativeDateModule, MatSidenavModule, MatToolbarModule, 
          MatTableModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import {  } from '@angular/material';



@NgModule({
  imports: [
    MatButtonModule, 
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatTabsModule,
    MatCardModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDialogModule, 
    MatTableModule, 
    MatSortModule,
    MatPaginatorModule,
    MatSnackBarModule
  ],
 exports: [
   MatButtonModule,
   MatIconModule,
   MatFormFieldModule,
   MatInputModule,
   FlexLayoutModule,
   MatDatepickerModule,
   MatNativeDateModule,
   MatCheckboxModule,
   MatSidenavModule,
   MatToolbarModule,
   MatListModule,
   MatTabsModule,
   MatCardModule,
   MatSelectModule,
   MatProgressSpinnerModule,
   MatDialogModule,
   MatTableModule,
   MatSortModule,
   MatPaginatorModule,
   MatSnackBarModule
 ]
})
export class MaterialModule { }
