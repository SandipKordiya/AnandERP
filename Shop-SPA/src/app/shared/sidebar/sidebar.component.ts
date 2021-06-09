import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: '*' })),
      transition('up <=> down', animate(200))
    ])
  ]
})
export class SidebarComponent implements OnInit {
  expanded = new Array(3).fill(false);
  currentRole: any;
  active1: boolean = false;
  active2: boolean = false;
  active3: boolean = false;
  active4: boolean = false;
  active5: boolean = false;
  menus = [];
  constructor(public sidebarservice: SidebarService) { 
    this.currentRole = localStorage.getItem('role');
    this.menus = sidebarservice.getMenuList();
  }

  ngOnInit() {
  }
  

  clickEvent(){
    this.active1 = !this.active1;       
  }
  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  toggle(currentMenu) {
    if (currentMenu.type === 'dropdown') {
      this.menus.forEach(element => {
        if (element === currentMenu) {
          currentMenu.active = !currentMenu.active;
        } else {
          element.active = false;
        }
      });
    }
  }

  getState(currentMenu) {

    if (currentMenu.active) {
      return 'down';
    } else {
      return 'up';
    }
  }

  hasBackgroundImage() {
    return this.sidebarservice.hasBackgroundImage;
  }
  
}
