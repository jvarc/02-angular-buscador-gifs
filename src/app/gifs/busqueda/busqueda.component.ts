import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent  {

  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;

  //Para llamar a un servicio hay que inyectarlo a traves de un construcctor
  constructor( private gifService: GifsService){}


  buscar (){

    const valor = this.txtBuscar.nativeElement.value;

    if (valor.trim().length == 0){
      return;
    }
    else{
      this.gifService.guardarBusqueda(valor);

      this.txtBuscar.nativeElement.value = '';
    }

  }


}
