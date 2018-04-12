import { NgModule } from '@angular/core';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatSidenav, 
          MatListModule, MatTabsModule, MatCardModule, MatSelectModule, MatProgressSpinnerModule, 
          MatDialogModule, MatSortModule, MatPaginator, MatPaginatorModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDatepickerModule, MatNativeDateModule, MatSidenavModule, MatToolbarModule, MatTableModule } from '@angular/material';



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
    MatPaginatorModule
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
   MatPaginatorModule
 ]
})
export class MaterialModule { }
