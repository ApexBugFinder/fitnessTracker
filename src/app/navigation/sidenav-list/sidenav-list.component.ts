import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {

  //Properties
  @Output() closeSideNav = new EventEmitter<void>();

  //Methods
  constructor() { }

  ngOnInit() {
  }

  sidenavClose() {
    this.closeSideNav.emit();
  }
}
