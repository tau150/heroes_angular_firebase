import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroe.interface';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {

  heroes:any[]=[];
  loading:boolean=true;

  constructor( private _heroesService:HeroesService ) {

   this._heroesService.getHeroes()
     .subscribe( data => {

      setTimeout(()=>{
        this.heroes=data;
        this.loading=false;
      }, 1000)
    });
  }

  ngOnInit() {
  }

  deleteHero(key$:string){
    this._heroesService.deleteHero(key$)
    .subscribe( data=>{
      if( data ){
        console.error(data)
      }else{
        delete this.heroes[key$];
      }
    })
  }

}
