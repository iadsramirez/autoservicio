import { Component, OnInit } from '@angular/core';
import { AutogestionService } from '../../../servicio/autogestion.service';

@Component({
  selector: 'app-planilla',
  templateUrl: './planilla.component.html',
  styleUrls: ['./planilla.component.scss']
})
export class PlanillaComponent implements OnInit {
   empleado:any;

  constructor(private autoGestionService:AutogestionService) {
  this.autoGestionService.logeado=true;  
  this.empleado=JSON.parse(localStorage.getItem('empleadoSession'));


  console.log('EMPLEADO:'+JSON.stringify(this.empleado));

   this.autoGestionService.obtenerTotales(this.empleado[0].COD_CIA,this.empleado[0].COD_EMP)
   .subscribe(
     totales=>{
       console.log('Obtener Totales:'+JSON.stringify(totales));
     }
   );

  }

  ngOnInit(): void {
  }

}
