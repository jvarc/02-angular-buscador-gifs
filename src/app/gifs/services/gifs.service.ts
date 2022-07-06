import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey: string = '0tyimvyxqPFLKVLkYOemGugAyPB2L5BN';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  public resultado: Gif[]= [];

  get historial(){
    return [...this._historial];
  }

  //inyecta las propiedades http
  constructor( private http: HttpClient){

    if(localStorage.getItem('historial')){
      this._historial = JSON.parse(localStorage.getItem('historial')!);
    }

    //la linea a continuacion hace exactamente lo mismo que el if anterior
    //esto se hace porque hay que garantizar que  _historial sea un []
    //esta parte del codigo rescata el historial de buscada del localstore
    // this._historial = JSON.parse(localStorage.getItem('historial')!) || [];


    //esta linea hace lo mismo que el codigo anterior pero para los gifs
    this.resultado = JSON.parse(localStorage.getItem('img')!) || [];

  }

  guardarBusqueda( query: string){

    query = query.trim().toLowerCase();

    if (!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);

      //guarda el localstore lo que el usuario alla buscado
      localStorage.setItem('historial', JSON.stringify(this._historial));

      //guarada las imagenes buscadas
      localStorage.setItem('img', JSON.stringify(this.resultado));
    }

    const params = new HttpParams()
          .set('api_key', this.apiKey)
          .set('limit', '10')
          .set('q', query);

    //hace la peticion http
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{params}).subscribe( (resp) => {
      this.resultado = resp.data;
    });


  }

}
