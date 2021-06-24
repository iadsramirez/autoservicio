import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbCalendar, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AutogestionService } from 'src/app/servicio/autogestion.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import 'sweetalert2/src/sweetalert2.scss';
import { NgbDateFRParserFormatter } from '../configuracion/ngb-date-fr-parser-formatter';

//import Swal from 'sweetalert2/dist/sweetalert2.js';

//import 'sweetalert2/src/sweetalert2.scss'



@Component({
  selector: 'app-accion-personal',
  templateUrl: './accion-personal.component.html',
  styleUrls: ['./accion-personal.component.scss'],
  providers: [
    {provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter}
  ]
})
export class AccionPersonalComponent implements OnInit {
  empleado: any;
  listadoAccion: Array<any>;
  p: number = 1;
  registerAccionForm: FormGroup;
  listadoTipoAccion: Array<any>;
  listaNoAfectaPlanilla:Array<any>;


  constructor(private ngbCalendar: NgbCalendar,private autoGestion: AutogestionService, private formBuilder: FormBuilder,private dateAdapter: NgbDateAdapter<string>) {



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
      dias:[0,[]],
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
    let valor1:any=this.registerAccionForm.get('fechaInicial').value;
    let valor2:any=valor;

    if((valor1.year==valor2.year) && (valor1.month==valor2.month) && (valor1.day==valor2.day) ){

      this.mostrarHora=true;
    }else{
      this.mostrarHora=false;
    }


    let fecha1=new Date(Number(valor1.year),Number(valor1.month),Number(valor1.day));
     let fecha2=new Date(Number(valor2.year),Number(valor2.month),Number(valor2.day));
     let total:number=fecha2.getTime()-fecha1.getTime();
     if(total<0){
       total=total*(-1);
     }

     if(total==0){
      total=86400000;
     }

     let sumaDias:number=total/(1000*60*60*24);
     if(!( (valor1.year==valor2.year) && (valor1.month==valor2.month) && (valor1.day==valor2.day)) ){
      sumaDias=sumaDias+1;
     }

      this.registerAccionForm.get('dias').setValue(sumaDias);

  }


  horas:number;
  agregarHora(valor:number){
   this.horas=valor;
  }

  guardar(){
    const fechas=this.registerAccionForm.get('fechaSol').value;
    const fechasFinal=this.registerAccionForm.get('fechaFinal').value;
    let tipoAccion:any=this.registerAccionForm.get('accion').value;

    let fecha=new Date(Number(fechas.year),Number(fechas.month),Number(fechas.day));

    if(this.registerAccionForm.get('accion').value){
    let  tipo:number=Number(this.registerAccionForm.get('accion').value);
    if(tipo==0){
      tipoAccion=this.registerAccionForm.get('tipoAccion').value;
    }

    }

    const objeto={

      cia:this.empleado[0].COD_CIA,
      emp:this.empleado[0].COD_EMP,
      tipoAcc:tipoAccion,
      fecha:String(fechas.day)+'/'+String(fechas.month)+'/'+String(fechas.year),
      observacion:this.registerAccionForm.get('observacion').value,
      usrC:this.empleado[0].USUARIO,
      estado:'A',
      fechaIni:String(fechas.day)+'/'+String(fechas.month)+'/'+String(fechas.year),
      fechaFin:String(fechasFinal.day)+'/'+String(fechasFinal.month)+'/'+String(fechasFinal.year),
      dias:Number(this.registerAccionForm.get('dias').value),
    };

    console.log('json save'+JSON.stringify(objeto))
    this.autoGestion.guardar(objeto).subscribe(
      data=>{
        //console.log('RESPUESTA GUARDADO'+JSON.stringify(data));
        Swal.fire('Datos Guardados');

        this.obtenerLista();
        //this.toastr.success('Datos Guardado', '');
      }
    );

    this.registerAccionForm.reset();

  }


  obtenerLista(){
    this.autoGestion.obtenerAccionesEmpleado(this.empleado[0].COD_CIA, this.empleado[0].COD_EMP,
      this.empleado[0].USUARIO).subscribe(
        acciones => {
          this.listadoAccion = acciones;
          console.log(this.listadoAccion.length);
          //console.log(JSON.stringify(acciones));
        }
      );
  }



}
