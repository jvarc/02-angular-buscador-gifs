import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  //Inyeccion de servicio
  constructor(private gifServices: GifsService) {}

  get historial(){
    return this.gifServices.historial;
  }

  buscar( item: string){

    this.gifServices.guardarBusqueda(item);

  }


}
