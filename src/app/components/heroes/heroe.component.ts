import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent implements OnInit {

  heroe: Heroe={
    name:"",
    bio:"",
    house:'Marvel'

  }

  nuevo:boolean=false;
  id:string;

  constructor( private _heroesService: HeroesService, private router:Router, private ActivatedRoute:ActivatedRoute ) {

    this.ActivatedRoute.params
        .subscribe( parametros => {

          this.id = parametros['id']
          if(this.id !== 'nuevo'){
            this._heroesService.getHero( this.id )
                .subscribe( heroe=> this.heroe = heroe )
          }

        });

   }

  ngOnInit() {
  }

  save(){

    if( this.id === 'nuevo' ){
      this._heroesService.newHero( this.heroe )
          .subscribe( data=>{
            this.router.navigate(['/heroe', data.name])
          },
          error=> console.error(error));
    }else{
      this._heroesService.updateHero( this.heroe, this.id )
          .subscribe( data=>{
            console.log(data);
          },
          error=> console.error(error));
    }
  }

  addNew(forma:NgForm){
    this.router.navigate(['/heroe', 'nuevo']);
    forma.reset({
      house:"Marvel"
    });
  }



}
