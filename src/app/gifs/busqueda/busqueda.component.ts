import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  constructor (private gifsService : GifsService) {

  }

  /**Obtenemos el valor del elemento local que teníamos, #textoBuscar
   * Como estamos trabajando en forma super estricta, TS nos dice que, quizás
   * el txtBuscar sería nulo, si estamos completamente seguros de que tendrá su valor
   * podemos colocar el ! para asegurar que el objeto no es nulo. 
   * 
   * Colocamos <HTMLInputElement> para obtener las ayudas this.txtBuscar.nativeElement.
   * Muy util para cuando requerimos algo de JS con las ayudas.
   */
  @ViewChild('textoBuscar') txtBuscar !: ElementRef <HTMLInputElement>;

  buscar(textoBuscar : string) : void {
    const valBusqueda = this.txtBuscar.nativeElement.value;
    console.log(valBusqueda);

    this.gifsService.buscarGifs(valBusqueda);

    this.txtBuscar.nativeElement.value = '';
    this.txtBuscar.nativeElement.focus();


  }

}
