import { Component, OnInit } from '@angular/core';
import { AutogestionService } from '../../../servicio/autogestion.service';

@Component({
  selector: 'app-planilla',
  templateUrl: './planilla.component.html',
  styleUrls: ['./planilla.component.scss']
})
export class PlanillaComponent implements OnInit {

  planilla:any={};
  empleado: any;
  objetoTotales: any;
  listadoProgramacionesCerradas: Array<any>;
  listaDetallePlanilla:Array<any>=[];
  p: number = 1;

  constructor(private autoGestionService: AutogestionService) {
    this.autoGestionService.logeado = true;
    this.empleado = JSON.parse(localStorage.getItem('empleadoSession'));


    console.log('EMPLEADO:' + JSON.stringify(this.empleado));

    this.autoGestionService.obtenerTotales(this.empleado[0].COD_CIA, this.empleado[0].COD_EMP)
      .subscribe(
        totales => {
          console.log('Obtener Totales:' + JSON.stringify(totales));
          this.llenarTotales(totales);
        }
      );


    this.llenarTablaProgramacionesCerradas(this.empleado[0].COD_CIA, this.empleado[0].COD_EMP);


  }

  ngOnInit(): void {
    this.empleado = JSON.parse(localStorage.getItem('empleadoSession'));
    this.llenarTablaProgramacionesCerradas(this.empleado[0].COD_CIA, this.empleado[0].COD_EMP);
  }



  llenarTotales(data: any) {
    this.objetoTotales = data;
  }

  llenarTablaProgramacionesCerradas(cia: any, emp: any) {
    this.autoGestionService.obtenerProgramacionesCerradas(cia, emp).subscribe(
      pla => {
        this.listadoProgramacionesCerradas = pla;
        console.log('LISTADO PLANILLAS'+JSON.stringify(pla));
      }
    );
  }



  llenarDetalle(data: any) {

    //console.log(JSON.stringify(data));

    this.planilla=data;

    console.log('---------');
    console.log(JSON.stringify(this.planilla));

    console.log('---------');
    this.listaDetallePlanilla=[];
    this.autoGestionService.obtenerDetallePlanilla(data.COD_CIA, data.ANIO,
      data.MES, data.COD_TIPOPLA, data.NUM_PLANILLA, data.COD_EMP).subscribe(
        valor=>{
          this.listaDetallePlanilla=valor;
          console.log('--------------detall-');
          console.log(JSON.stringify(valor));
        }
      );
  }



}
