
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  template: `
  <app-sidebar></app-sidebar>
  <router-outlet></router-outlet>`,
  styles: []
})
export class AppComponent {
  title = 'app';
}
