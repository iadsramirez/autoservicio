import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutogestionService } from 'src/app/servicio/autogestion.service';

@Component({
  selector: 'app-accion-personal',
  templateUrl: './accion-personal.component.html',
  styleUrls: ['./accion-personal.component.scss']
})
export class AccionPersonalComponent implements OnInit {
  empleado: any;
  listadoAccion: Array<any>;
  p: number = 1;
  registerAccionForm: FormGroup;


  constructor(private autoGestion: AutogestionService, private formBuilder: FormBuilder) {



    this.registerAccionForm = this.formBuilder.group({
      title: ['', Validators.required],
    });




    this.autoGestion.logeado = true;
    this.empleado = JSON.parse(localStorage.getItem('empleadoSession'));
    this.autoGestion.obtenerAccionesEmpleado(this.empleado[0].COD_CIA, this.empleado[0].COD_EMP,
      this.empleado[0].USUARIO).subscribe(
        acciones => {
          this.listadoAccion = acciones;
          console.log(this.listadoAccion.length);
          console.log(JSON.stringify(acciones));
        }
      );

  }

  ngOnInit(): void {
  }

}
