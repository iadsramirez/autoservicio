import { Component, OnInit } from '@angular/core';
import { AutogestionService } from 'src/app/servicio/autogestion.service';

@Component({
  selector: 'app-vacacion',
  templateUrl: './vacacion.component.html',
  styleUrls: ['./vacacion.component.scss']
})
export class VacacionComponent implements OnInit {

  p: number = 1;
  listaVacacion:Array<any>;
  listaDetalle:Array<any>;
  empleado:any;

  constructor(private autoGestionServicio:AutogestionService) {
    this.autoGestionServicio.logeado=true;
    this.empleado = JSON.parse(localStorage.getItem('empleadoSession'));


  }

  ngOnInit(): void {
    this.autoGestionServicio.controlVacacion(this.empleado[0].COD_CIA,this.empleado[0].COD_EMP).subscribe(
      data=>this.listaVacacion=data
    );
  }


  llenarDetalle(valor:any){
    this.autoGestionServicio.controlVacacionDetalle(this.empleado[0].COD_CIA,this.empleado[0].COD_EMP,valor.ANIO).subscribe(
      data=>this.listaDetalle=data
    );
  }

}
