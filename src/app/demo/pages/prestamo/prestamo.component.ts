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
  }


  llenarDetalle(data:any){
   // console.log(JSON.stringify(data));
    this.autoServicio.obtenerDetallePrestamo(this.empleado[0].COD_CIA,this.empleado[0].COD_EMP,data.CORRELATIVO,data.COD_DEDUC).subscribe(

      detalle=>{
        console.log(JSON.stringify(detalle));
        this.listaDetallePrestamo=detalle;
      }
    );
  }

}
