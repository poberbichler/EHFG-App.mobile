import { Component, Input  } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: 'app-navbar.html'
})
export class AppNavbarComponent {
  @Input()
  title: string = 'hallo';

  @Input()
  showMenu: boolean = true;
}
