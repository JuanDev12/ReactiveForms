import { Component } from '@angular/core';
import { MenuItem } from '../../interfaces/menuItem.interface';

@Component({
  selector: 'shared-sidemenu',
  templateUrl: './sidemenu.component.html',
  styles: [],
})
export class SidemenuComponent {
  public reactiveMenu: MenuItem[] = [
    { title: 'Basicos', router: './reactive/basic' },
    { title: 'Dinamicos', router: './reactive/dinamic' },
    { title: 'Switches', router: './reactive/switches' },
  ];

  public authMenu: MenuItem[] = [{ title: 'Registro', router: './auth' }];
}
