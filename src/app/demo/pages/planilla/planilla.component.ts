import { Component, OnInit } from '@angular/core';
import { AutogestionService } from '../../../servicio/autogestion.service';

@Component({
  selector: 'app-planilla',
  templateUrl: './planilla.component.html',
  styleUrls: ['./planilla.component.scss']
})
export class PlanillaComponent implements OnInit {
  empleado: any;
  objetoTotales: any;
  listadoProgramacionesCerradas: Array<any>;
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


  this.llenarTablaProgramacionesCerradas(this.empleado[0].COD_CIA,this.empleado[0].COD_EMP);


  }

  ngOnInit(): void {
  }



  llenarTotales(data: any) {
    this.objetoTotales = data;
  }

  llenarTablaProgramacionesCerradas(cia: any, emp: any) {
    this.autoGestionService.obtenerProgramacionesCerradas(cia, emp).subscribe(
      listaPlanilla => {
        this.listadoProgramacionesCerradas = listaPlanilla;
        console.log(JSON.stringify(listaPlanilla));
      }
    );
  }


}
