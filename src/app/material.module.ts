import { NgModule } from '@angular/core';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatSidenav } from '@angular/material';
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
    MatToolbarModule
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
   MatToolbarModule
 ]
})
export class MaterialModule { }
