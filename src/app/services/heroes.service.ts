import { Injectable } from '@angular/core';
import { Http, Headers }  from '@angular/http';
import { Heroe } from '../interfaces/heroe.interface';
import 'rxjs/Rx';

@Injectable()
export class HeroesService {

  fireURL:string = 'https://heroesapp-d963d.firebaseio.com/heroes.json';
  heroURL:string = 'https://heroesapp-d963d.firebaseio.com/heroes/';


  constructor(private http: Http) { }

  newHero( hero:Heroe){

    let body = JSON.stringify( hero );
    let headers = new Headers({
      'Content-type':'appication/json'
    })

    return this.http.post( this.fireURL, body, { headers } )
      .map( res=>{
        console.log( res.json() );
        return res.json();
      })
  }

  updateHero( hero:Heroe, key$:string){

    let body = JSON.stringify( hero );
    let headers = new Headers({
      'Content-type':'appication/json'
    })

    let url = `${ this.heroURL }/${ key$ }.json`;


    return this.http.put( url, body, { headers } )
      .map( res=>{
        return res.json();
      })
  }

  getHero(key$:string){
      let url = `${ this.heroURL }${ key$ }.json`;

      return this.http.get( url )
        .map( res=> {
            return res.json();
        })
  }

  getHeroes(){

      return this.http.get( this.fireURL )
        .map( res=> {
            return res.json();
        })
  }

  deleteHero(key$:string){
    let url = `${ this.heroURL }/${ key$}.json`;
    return this.http.delete( url )
        .map(res => res.json())
  }

}
