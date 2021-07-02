import { Component, OnInit } from '@angular/core';
import { AutogestionService } from 'src/app/servicio/autogestion.service';

@Component({
  selector: 'app-prestamo',
  templateUrl: './prestamo.component.html',
  styleUrls: ['./prestamo.component.scss']
})
export class PrestamoComponent implements OnInit {
  p: number = 1;
  listadoPrestamo:Array<any>=[];
  empleado:any;
  listaDetallePrestamo:Array<any>;
  listaDescuentoCiclico:Array<any>;
  cargo:number;
  abono:number;
  saldo:number;
  montoCiclico:number;

  constructor(private autoServicio:AutogestionService) {
    this.autoServicio.logeado=true;
    this.empleado = JSON.parse(localStorage.getItem('empleadoSession'));

    this.autoServicio.obtenerPrestamo(this.empleado[0].COD_CIA,this.empleado[0].COD_EMP).subscribe(
      prestamo=>{
        this.listadoPrestamo=prestamo;
      }
    );

   }

  ngOnInit(): void {
    this.autoServicio.logeado=true;
  }


  llenarDetalle(data:any){
   // console.log(JSON.stringify(data));
    this.autoServicio.obtenerDetallePrestamo(this.empleado[0].COD_CIA,this.empleado[0].COD_EMP,data.CORRELATIVO,data.COD_DEDUC).subscribe(

      detalle=>{
        console.log('******>>>'+JSON.stringify(detalle));
        this.listaDetallePrestamo=detalle;
        this.sumatorias(detalle);
      }
    );

    this.autoServicio.descuentosCiclico(this.empleado[0].COD_CIA,data.CORRELATIVO).subscribe(cli=>{this.listaDescuentoCiclico=cli;
      this.sumaCiclico();
    });


  }


   sumatorias(lista:Array<any>):void{
    this.cargo=0;
    this.abono=0;
    lista.forEach(detalle=>{
      console.log('Detalle!!!!!!!!!!!!'+JSON.stringify(detalle));
      if(detalle.CARGO){
        this.cargo +=parseFloat(detalle.CARGO);
      }

      if(detalle.ABONO){
        this.abono +=parseFloat(detalle.ABONO);
      }

      if(detalle.SALDO){
        this.saldo=this.saldo+parseFloat(detalle.SALDO);
      }



    });

  }


  sumaCiclico():void{
    this.montoCiclico=0;
    this.listaDescuentoCiclico.forEach(
      ciclico=>{
        if(ciclico.MONTO){
          this.montoCiclico +=parseFloat(ciclico.MONTO);
        }
      }
    );
  }

}
