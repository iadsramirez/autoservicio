import { Component, OnInit } from '@angular/core';
import { AutogestionService } from 'src/app/servicio/autogestion.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss']
})
export class CitasComponent implements OnInit {

  empleado: any;
  listadoClinina:Array<any>;

  constructor(private autoGestion: AutogestionService, private formBuilder: FormBuilder) {
    this.autoGestion.logeado = true;
    this.empleado = JSON.parse(localStorage.getItem('empleadoSession'));

    this.autoGestion.obtenerTipoAccionClinica(this.empleado[0].COD_CIA, this.empleado[0].COD_EMP,
      this.empleado[0].USUARIO).subscribe(
        data=>{
          this.listadoClinina=data;
        }
      );

   }

  ngOnInit(): void {
  }

}
