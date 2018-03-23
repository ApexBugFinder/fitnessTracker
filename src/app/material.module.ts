import { NgModule } from '@angular/core';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatSidenav, MatListModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDatepickerModule, MatNativeDateModule, MatSidenavModule, MatToolbarModule } from '@angular/material';



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
    MatListModule
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
   MatListModule
 ]
})
export class MaterialModule { }
