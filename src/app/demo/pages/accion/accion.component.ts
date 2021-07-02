import { Component, OnInit } from '@angular/core';
import { AutogestionService } from '../../../servicio/autogestion.service';

@Component({
  selector: 'app-accion',
  templateUrl: './accion.component.html',
  styleUrls: ['./accion.component.scss']
})
export class AccionComponent implements OnInit {

  listadoAccionesRecibidas:Array<any>;
  empleado:any;

  constructor(private autoGestion:AutogestionService) {
    this.autoGestion.logeado = true;
    this.empleado = JSON.parse(localStorage.getItem('empleadoSession'));
    this.autoGestion.obtenerCapacitaciones(this.empleado[0].COD_CIA,this.empleado[0].COD_EMP)
    .subscribe(
      capa=>{
        this.listadoAccionesRecibidas=capa;
      }
    );

  }

  ngOnInit(): void {
    this.autoGestion.logeado = true;
  }

}
