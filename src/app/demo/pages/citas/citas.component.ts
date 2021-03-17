import { Component, OnInit } from '@angular/core';
import { AutogestionService } from 'src/app/servicio/autogestion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss']
})
export class CitasComponent implements OnInit {

  empleado: any;
  listadoClinina:Array<any>;
  registerAccionForm: FormGroup;
  horas:any;
  mostrarHora:boolean=true;



  constructor(private autoGestion: AutogestionService, private formBuilder: FormBuilder) {
    this.autoGestion.logeado = true;
    this.empleado = JSON.parse(localStorage.getItem('empleadoSession'));

    
    this.registerAccionForm = this.formBuilder.group({
      fechaCita: [, Validators.required],
      empleado: [, Validators.required],
      observacion: [],
    });

    this.inicializarForm();

    this.autoGestion.obtenerTipoAccionClinica(this.empleado[0].COD_CIA, this.empleado[0].COD_EMP,
      this.empleado[0].USUARIO).subscribe(
        data=>{
          console.log(data);
          this.listadoClinina=data;
         // this.listadoClinina=this.listadoClinina.filter(item=>{item.COD_TIPOACCION==40});
        }
      );

   }

  ngOnInit(): void {
  }



  inicializarForm() {
    let empleado = JSON.parse(localStorage.getItem('empleadoSession'));
    console.log('empleado en session' + JSON.stringify(empleado));
    let fechaActual = new Date();

    const fecha = { day: fechaActual.getDate(), month: fechaActual.getMonth() + 1, year: fechaActual.getFullYear() };

    this.registerAccionForm.get('empleado').setValue(empleado[0].NOMBRE);
   


  }



  agregarHora(valor:any){
    this.horas=valor;
  }

  guardar(){

    const fechas=this.registerAccionForm.get('fechaCita').value;

    let fecha=new Date(Number(fechas.year),Number(fechas.month),Number(fechas.day));

    const objeto={

      cia:this.empleado[0].COD_CIA,
      emp:this.empleado[0].COD_EMP,
      //tipoAcc:this.registerAccionForm.get('accion').value,
      fecha:String(fechas.day)+'/'+String(fechas.month)+'/'+String(fechas.year),
      observacion:this.registerAccionForm.get('observacion').value,
      usrC:this.empleado[0].USUARIO,
      tipoAcc:40,
      estado:'G',
      horas:this.horas,
    };
    console.log('objeto a api'+JSON.stringify(objeto));

    this.autoGestion.guardar(objeto).subscribe(
      data=>{
        console.log('RESPUESTA GUARDADO'+JSON.stringify(data));
        Swal.fire('Datos Guardados');

        this.obtenerLista();
        //this.toastr.success('Datos Guardado', '');
      }
    )

  }


  obtenerLista(){
    this.autoGestion.obtenerTipoAccionClinica(this.empleado[0].COD_CIA, this.empleado[0].COD_EMP,
      this.empleado[0].USUARIO).subscribe(
        data=>{
          console.log(data);
          this.listadoClinina=data;
         // this.listadoClinina=this.listadoClinina.filter(item=>{item.COD_TIPOACCION==40});
        }
      );
      
  }


  limpiar(){
    this.registerAccionForm.reset();
    this.horas='';
  }

}
