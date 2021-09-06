import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  constructor(private gifsService : GifsService) { }

  get obtenerBusquedas(){
    return this.gifsService.historial;
  }

  buscar(valorBusqueda : string){
    this.gifsService.buscarGifs(valorBusqueda);
  }

}
