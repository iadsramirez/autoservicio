import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutogestionService } from 'src/app/servicio/autogestion.service';
//import Swal from 'sweetalert2/dist/sweetalert2.js';

import 'sweetalert2/src/sweetalert2.scss'



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
  listadoTipoAccion: Array<any>;
  listaNoAfectaPlanilla:Array<any>;


  constructor(private autoGestion: AutogestionService, private formBuilder: FormBuilder) {



    this.registerAccionForm = this.formBuilder.group({
      fechaSol: [, Validators.required],
      empleado: [, Validators.required],
      codEmp: [],
      detalle: [],
      observacion: [],
      accion:[],
      tipoAccion:[],
      fechaInicial:[,[Validators.required]],
      fechaFinal:[,[Validators.required]],
      dias:[],
      horas:[],
      fechaInicioReal:[],
      fechaFinReal:[]
    });





    this.inicializarForm();


    this.autoGestion.logeado = true;
    this.empleado = JSON.parse(localStorage.getItem('empleadoSession'));
    this.autoGestion.obtenerAccionesEmpleado(this.empleado[0].COD_CIA, this.empleado[0].COD_EMP,
      this.empleado[0].USUARIO).subscribe(
        acciones => {
          this.listadoAccion = acciones;
          console.log(this.listadoAccion.length);
          //console.log(JSON.stringify(acciones));
        }
      );

    // console.log('this.empleado[0].USUARIO'+this.empleado[0].USUARIO);
    this.autoGestion.obtenerTipoAccion(this.empleado[0].COD_CIA, this.empleado[0].USUARIO)
      .subscribe(
        tipoAccion => {
          console.log(JSON.stringify(tipoAccion));
          this.listadoTipoAccion = tipoAccion;

        }
      )




      this.autoGestion.obtenerTipoAccionNoAfectaPlanilla(this.empleado[0].COD_CIA, this.empleado[0].USUARIO)
      .subscribe(
        tipoAccion => {
          //console.log(JSON.stringify(tipoAccion));
          this.listaNoAfectaPlanilla = tipoAccion;

        }
      )




  }

  ngOnInit(): void {
  }

  inicializarForm() {
    let empleado = JSON.parse(localStorage.getItem('empleadoSession'));
    console.log('empleado en session' + JSON.stringify(empleado));
    let fechaActual = new Date();

    const fecha = { day: fechaActual.getDate(), month: fechaActual.getMonth() + 1, year: fechaActual.getFullYear() };

    this.registerAccionForm.get('fechaSol').setValue(fecha);
    this.registerAccionForm.get('empleado').setValue(empleado[0].NOMBRE);
    this.registerAccionForm.get('codEmp').setValue(empleado[0].COD_EMP);


  }

  mostrarTipos: boolean = false;
  tiposAccionChange(data: any) {
    console.log('lo que viene' + data);

    if (data == 0) {
      this.mostrarTipos = true;
    }else{
      this.mostrarTipos=false;
    }
  }


mostrarHora:boolean=false;

  changeDateFinal(valor:any){
    console.log('this.registerAccionForm.get(fechaInicial).value:'+JSON.stringify(this.registerAccionForm.get('fechaInicial').value));
    console.log('valor de la fecha'+JSON.stringify(valor));

    let valor1:any=this.registerAccionForm.get('fechaInicial').value;
    let valor2:any=valor;
    if((valor1.year==valor2.year) && (valor1.month==valor2.month) && (valor1.day==valor2.day) ){

      this.mostrarHora=true;
    }else{
      this.mostrarHora=false;
    }

  }

  changeCalculoDias(valor:any){
    let valor1:any=this.registerAccionForm.get('fechaInicioReal').value;
    let valor2:any=valor;

    let fecha1=new Date(Number(valor1.year),Number(valor1.month),Number(valor1.day));
     let fecha2=new Date(Number(valor2.year),Number(valor2.month),Number(valor2.day));
     let total:number=fecha2.getTime()-fecha1.getTime();
     if(total<0){
       total=total*(-1);
     }

      this.registerAccionForm.get('dias').setValue(total/(1000*60*60*24));

  }


  horas:number;
  agregarHora(valor:number){
   this.horas=valor;
  }

  guardar(){
    const fechas=this.registerAccionForm.get('fechaSol').value;

    let fecha=new Date(Number(fechas.year),Number(fechas.month),Number(fechas.day));

    const objeto={

      cia:this.empleado[0].COD_CIA,
      emp:this.empleado[0].COD_EMP,
      tipoAcc:this.registerAccionForm.get('accion').value,
      fecha:fecha,
      observacion:this.registerAccionForm.get('observacion').value,
      usrC:this.empleado[0].USUARIO
    };

    this.autoGestion.guardar(objeto).subscribe(
      data=>{
        console.log('RESPUESTA GUARDADO'+JSON.stringify(data));
       // Swal.fire('Datos Guardado con exito');
      }
    )

  }
}
