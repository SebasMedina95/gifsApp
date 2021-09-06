import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { DataGifs, SearchGifsResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  
  /**ApiKey traida de https://developers.giphy.com/dashboard/ 
   * ---------------------------------------------------------
   * https://developers.giphy.com/docs/api/endpoint#search
  */
  private apiKey : string = '8ePZIXrirbJlDN6fEXYAXNidWvIeFbzy';
  private servicioUrl : string = 'https://api.giphy.com/v1/gifs';
  private _historial : string[] = [];
  public resultadosDesdeApi : DataGifs[] = [];

  get historial(){
    return [...this._historial];
  }

  /**OJO! no es HttpClientModule, débe ser HttpClient  */
  constructor(private http : HttpClient) { 
    /**Si tenemos información en el LocalStorage, carguemosla en el arreglo, como esta en String,
     * entonces lo convertimos a su estado original, que es un arreglo.
     */
    if(localStorage.getItem('Historial')){
      this._historial = JSON.parse(localStorage.getItem('Historial')!);
    }
    /**Otra forma, pero haciendo uso para cargar la última busqueda */
    this.resultadosDesdeApi = JSON.parse(localStorage.getItem('Resultados')!) || [];

  }

  buscarGifs( terminoBusqueda : string ){

    console.log(terminoBusqueda);
    /**Convirtamos todo en minusculas */
    terminoBusqueda = terminoBusqueda.trim().toLowerCase();
    console.log(terminoBusqueda);

    /**Validaciones */
    if(terminoBusqueda.trim().length === 0){
      alert('El campo no puede ir vacío ...');
      return;
    }

    /**No repetir busqueda */
    if(!this._historial.includes(terminoBusqueda)){
      /**Insertamos al inicio con unshift*/
      this._historial.unshift(terminoBusqueda);
      console.warn(this._historial);  
      /**Limitamos a 12 elementos busqueda */
      this._historial = this._historial.splice(0,12);

      /**GUARDAMOS EN EL LOCALSTORAGE, usamos JSON.stringify para convertir
       * el arreglo en un String
       */
      localStorage.setItem('Historial',  JSON.stringify(this._historial));

    }

    /**Llamado a la API */
    // fetch('https://api.giphy.com/v1/gifs/search?api_key=8ePZIXrirbJlDN6fEXYAXNidWvIeFbzy&q=naruto&limit=20')
    //   .then( respuesta => {
    //     respuesta.json().then(datos => {
    //       console.warn(datos)
    //     })
    //   })

    /**Usamos el módulo de HTTP que nos trae ahora el Angular ...
     * ESTO NOS PERMITIRÁ TRABAJAR CON LOS OBSERVABLE.
     * Además, usando https://app.quicktype.io/ pasamos el resultado
     * que nos arroja el POSTMAN. Para eso usaremos la interface de
     * ../interfaces/gifs.interfaces
    */

    const parametros = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '20')
      .set('q', terminoBusqueda);


    /** Mas limpiamente, en vez de https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${this.terminoBusqueda}&limit=20
     * usamos los HttpParams y pasamos los parámetros, mucho mas fácil de mantener.
    */
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params : parametros})
      .subscribe( (respuesta) => {
        console.log(respuesta.data);
        this.resultadosDesdeApi = respuesta.data;
        localStorage.setItem('Resultados',  JSON.stringify(this.resultadosDesdeApi));
      });

  }

}
