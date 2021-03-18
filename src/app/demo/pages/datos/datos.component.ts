import { Component, OnInit } from '@angular/core';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { AutogestionService } from '../../../servicio/autogestion.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.scss'],
  providers: [NgbAccordionConfig]
})
export class DatosComponent implements OnInit {

  listaAutoGestion: Array<any> = [];
  empleadoForm: FormGroup;
  generalesForm: FormGroup;
  preparacionForm: FormGroup;
  emergenciaForm: FormGroup;
  capacitacionForm: FormGroup;
  listaPaises: Array<any>;
  empleado: any;
  listaDepartementos: Array<any>;
  listaMunicipios: Array<any>;
  paisSelect: any;
  listaDepartementosGrl: Array<any>;
  listaMunicipiosGrl: Array<any>;
  paisSelectGrl: any;
  listaNivelAcademico: Array<any>;

  listaDepartementosNivel: Array<any>;
  listaProfesion: Array<any>;
  listaCapacitaciones: Array<any> = [];
  emergencias: Array<any> = [];
  listaNivelAcademicoTBl:Array<any>=[];


  constructor(
    private autoGestion: AutogestionService,
    config: NgbAccordionConfig,
    private formBuilder: FormBuilder
  ) {



    this.empleado = JSON.parse(localStorage.getItem('empleadoSession'));


    this.autoGestion.obtenerNivelAcademico(this.empleado[0].COD_CIA)
      .subscribe(
        nivel => {
          this.listaNivelAcademico = nivel;
        }
      );

    this.autoGestion.obtenerPaises().subscribe(
      pais => {
        this.listaPaises = pais;
      }
    );


    this.capacitacionForm = this.formBuilder.group({

      cia: [],
      emp: [],
      descripcion: [],
      fecha: [],
      codInst: [],
      tipo: [],
      nacional: [],
      horas: [],
      nombInstitucion: [],
      fechaCapacitacion: [, [Validators.required]],
      documentoValida: [],
      nota: []
    });



    this.emergenciaForm = this.formBuilder.group({

      cia: [],
      emp: [],
      nombreCon: [],
      telCon: [],
      lugaTrabajo: []
    });



    this.preparacionForm = this.formBuilder.group({

      cia: [],
      emp: [],
      nivel: [],
      institucion: [],
      anioIng: [],
      anioEgre: [],
      subNivel: [],
      pais: [],
      depart: [],
      colegio: []
    });




    this.generalesForm = this.formBuilder.group({

      cia: [],
      emp: [],
      estadoC: [],
      correo: [],
      profesion: [],
      pais: [],
      depart: [],
      muni: [],
      zona: [],
      telefonos: [],
      cel: [],
      dir: [],
    });

    this.empleadoForm = this.formBuilder.group({

      cia: [],
      emp: [],
      estadoC: [],
      correo: [],
      profesion: [],
      pais: [],
      depart: [],
      muni: [],
      zona: [],
      telefonos: [],
      cel: [],
      dir: [],
      aldea: [],
      parentescoPep: [],
      asociadoPep: [],
      cargoPep: [],
      institucionPep: [],
      tipoVivienda: [],
      otraVivienda: [],
      tipoSangre: [],
      nombreCon: [],
      telCon: [],
      trabajoCon: [],
      nombreEmpleado: [],
      
      
    });

    autoGestion.logeado = true;


    config.closeOthers = true;
    config.type = 'primary';




    this.autoGestion.obtenerPaises().subscribe(
      pais => {

        this.listaAutoGestion = pais;
      }
    );


    this.llenarEmpleado();

    this.autoGestion.obtenerProfesiones(this.empleado[0].COD_CIA).subscribe(
      profesion => {
        console.log(JSON.stringify(profesion));
        this.listaProfesion = profesion;
      }
    );

  }

  ngOnInit(): void {
  }


  llenarEmpleado() {
    console.log(JSON.stringify(this.empleado));
    this.empleadoForm.get('nombreEmpleado').setValue(this.empleado[0].NOMBRE);
  }

  cambiarDeptoNivel(pais: any) {
    this.autoGestion.obtenerDepartamento(pais).subscribe(
      deptos => {

        this.listaDepartementosNivel = deptos;
      }
    );
  }

  cambiarDepto(pais: any) {
    console.log('paise seleccionado' + pais);

    this.autoGestion.obtenerDepartamento(pais).subscribe(
      deptos => {

        this.listaDepartementos = deptos;
      }
    );

  }

  cambiarMunic(depto: any) {

    this.autoGestion.obtenerMunicipio(this.empleadoForm.get('pais').value, depto).subscribe(
      municipio => {
        console.log(JSON.stringify(municipio));
        this.listaMunicipios = municipio;
      }
    );

  }




  cambiarDeptoGral(pais: any) {
    console.log('paise seleccionado' + pais);

    this.autoGestion.obtenerDepartamento(pais).subscribe(
      deptos => {

        this.listaDepartementosGrl = deptos;
      }
    );

  }

  cambiarMunicGral(depto: any) {

    this.autoGestion.obtenerMunicipio(this.generalesForm.get('pais').value, depto).subscribe(
      municipio => {
        console.log(JSON.stringify(municipio));
        this.listaMunicipiosGrl = municipio;
      }
    );

  }





  guardar() {
    const generales={
    cia:this.empleado[0].COD_CIA,
    emp:this.empleado[0].COD_EMP,
    estadoC:"C",
    correo:"infosgroupsv.com",
    profesion:23,
    pais:4,    
    depart:6,
    muni:1,
    zona:1,
    telefonos:"2325-9865",
    cel:"2585-9632",
    dir:"Nueva direccion del empleado",    
    aldea:1,
    parentescoPep:2,
    asociadoPep:"TEXTO LIBRE",
    cargoPep:"OTRO TEXTO LIBRE",
    institucionPep:"TEXTO NUEVO",
    tipoVivienda:"TEXTO",
    otraVivienda:"OTRA VIVIENDA",
    tipoSangre:"+ORH",
    nombreCon:"NOMBRE CONYUGUE",
    telCon:"22525554",
    trabajoCon:"6542141" 
    };


    this.autoGestion.guardarDatosGenerales(generales).subscribe(

      ger=>{
        console.log(JSON.stringify(ger));
        swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, title: 'Datos Generales!', text: 'Guardados', icon: 'success', });

      }
    );
  }





  agregarCapacitacion() {
    let valor1: any = this.capacitacionForm.get('fechaCapacitacion').value;

    const capa = {
      cia: this.empleado[0].COD_CIA,
      emp: this.empleado[0].COD_EMP,
      DESCRIPCION: this.capacitacionForm.get('descripcion').value,
      FECHA: this.capacitacionForm.get('fecha').value,
      COD_INSTI: 2,
      TIPO: "CH",
      NACIONAL: "1",
      HORAS_RECIBIDAS: Number(this.capacitacionForm.get('horas').value),
      NOM_INSTITUCION: this.capacitacionForm.get('nombInstitucion').value,
      FECHA_CAPACITACION: String(valor1.day) + '/' + String(valor1.month) + '/' + String(valor1.year),
      DOCUMENTO_VALIDA: this.capacitacionForm.get('documentoValida').value,
      NOTA: Number(this.capacitacionForm.get('nota').value)
    };

    this.autoGestion.guardarCapacitacion(capa).subscribe(
      capa => {
        // console.log('repsuesta guardado'+capa);
        swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, title: 'Capacitacion!', text: 'Capacitacion Agregada', icon: 'success', });

      }
    );

    this.listaCapacitaciones.push(capa);
    this.capacitacionForm.reset();


  }




  agregarEmergencia() {
    const emergency = {
      cia: this.empleado[0].COD_CIA,
      emp: this.empleado[0].COD_EMP,
      nombreCon: this.emergenciaForm.get('nombreCon').value,
      telCon:this.emergenciaForm.get('telCon').value,
      trabajoCon:this.emergenciaForm.get('lugaTrabajo').value
    };


    this.autoGestion.guardarEmergencia(emergency)
    .subscribe(
      emergencia=>{
        console.log('rep emergencia:'+JSON.stringify(emergencia));
        swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, title: 'Emergencia!', text: 'Emergencia Agregada', icon: 'success', });

      }
    );
    this.emergenciaForm.reset();

this.emergencias.push(emergency);
  }






  agregarNivelAcademico(){

    const nivel={
      cia:this.empleado[0].COD_CIA,
      emp:this.empleado[0].COD_EMP,
      nivel:Number(this.preparacionForm.get('nivel').value),
      institucion:this.preparacionForm.get('institucion').value,
      anioIng:Number(this.preparacionForm.get('anioIng').value),
      anioEgre:Number(this.preparacionForm.get('anioEgre').value),    
      noCole:this.preparacionForm.get('colegio').value,
      subNivel:Number(this.preparacionForm.get('subNivel').value),
       pais:Number(this.preparacionForm.get('pais').value),
       depart:Number(this.preparacionForm.get('depart').value)
    };

    this.autoGestion.guardarNivelAcademico(nivel).subscribe(
      nivelAcademico=>{
        console.log(JSON.stringify(nivelAcademico));
        swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, title: 'Nivel Academico!', text: 'Agregado Exitosamente', icon: 'success', });

      }
    );

      this.listaNivelAcademicoTBl.push(nivel);
      this.preparacionForm.reset();
  }







}
