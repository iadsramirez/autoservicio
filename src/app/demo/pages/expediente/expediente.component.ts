import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbAccordionConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { AutogestionService } from 'src/app/servicio/autogestion.service';
import { Generales } from '../datos/modelo/Generales';
import swal from 'sweetalert2';
import { NgbDateFRParserFormatter } from '../configuracion/ngb-date-fr-parser-formatter';

@Component({
  selector: 'app-expediente',
  templateUrl: './expediente.component.html',
  styleUrls: ['./expediente.component.scss'],
  providers: [
    { provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter }
  ]
})
export class ExpedienteComponent implements OnInit {

  p: number = 1;
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
  listaNivelAcademicoTBl: Array<any> = [];
  listaEstadoCivil: Array<any>;
  listaParentesco: Array<any>;





  constructor(
    private autoGestion: AutogestionService,
    config: NgbAccordionConfig,
    private formBuilder: FormBuilder
  ) {

    window.localStorage.removeItem('refresh');


    this.autoGestion.logeado = true;








    this.empleado = JSON.parse(localStorage.getItem('empleadoSession'));

    if (this.empleado) {

      this.autoGestion.obtenerCapacitaciones(this.empleado[0].COD_CIA, this.empleado[0].COD_EMP).subscribe(data => this.listaCapacitaciones = data);

      this.autoGestion.obtenerParentesco(this.empleado[0].COD_CIA).subscribe(data => this.listaParentesco = data);
      this.autoGestion.obtenerEmergencias(this.empleado[0].COD_CIA, this.empleado[0].COD_EMP).subscribe(eme => {
        this.emergencias = eme;
        /*this.autoGestion.obtenerEmergenciasDB(this.empleado[0].COD_CIA, this.empleado[0].COD_EMP).subscribe(
          emeDb => {
            this.emergencias = this.emergencias.concat(emeDb);
          }
        );*/
      });

      this.autoGestion.obtenerEstadoCivil().subscribe(data => this.listaEstadoCivil = data);
      this.llenarNivelAcademico(this.empleado[0].COD_CIA, this.empleado[0].COD_EMP);


      this.autoGestion.llenarDatosFichaExp(this.empleado[0].COD_CIA, this.empleado[0].COD_EMP)
        .subscribe(
          dataExpediente => {
            console.log('Servicio Expendiente::' + JSON.stringify(dataExpediente));
            this.llenarFicha(dataExpediente);
          }
        );
    }


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
      lugaTrabajo: [],
      parentesco: []
    });



    this.preparacionForm = this.formBuilder.group({

      cia: [],
      emp: [],
      nivel: ['', []],
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
        //console.log(JSON.stringify(profesion));
        this.listaProfesion = profesion;
      }
    );




  }










  ngOnInit(): void {
    this.autoGestion.logeado = true;
  }










  llenarEmpleado() {
    // console.log(JSON.stringify(this.empleado));
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
    // console.log('paise seleccionado' + pais);

    this.autoGestion.obtenerDepartamento(pais).subscribe(
      deptos => {

        this.listaDepartementos = deptos;
      }
    );

  }

  cambiarMunic(depto: any) {

    this.autoGestion.obtenerMunicipio(this.empleadoForm.get('pais').value, depto).subscribe(
      municipio => {
        // console.log(JSON.stringify(municipio));
        this.listaMunicipios = municipio;
      }
    );

  }




  cambiarDeptoGral(pais: any) {
    // console.log('paise seleccionado' + pais);

    this.autoGestion.obtenerDepartamento(pais).subscribe(
      deptos => {

        this.listaDepartementosGrl = deptos;
      }
    );

  }

  cambiarMunicGral(depto: any) {

    this.autoGestion.obtenerMunicipio(this.generalesForm.get('pais').value, depto).subscribe(
      municipio => {
        //console.log(JSON.stringify(municipio));
        this.listaMunicipiosGrl = municipio;
      }
    );

  }





  guardar() {




    let generales: Generales = new Generales();

    generales.cia = this.empleado[0].COD_CIA;
    generales.emp = this.empleado[0].COD_EMP;

    if (this.empleadoForm.get('estadoC').dirty) {
      generales.estadoC = this.empleadoForm.get('estadoC').value;
    }

    if (this.empleadoForm.get('correo').dirty) {
      generales.correo = this.empleadoForm.get('correo').value;
    }

    if (this.empleadoForm.get('profesion').dirty) {
      generales.profesion = this.empleadoForm.get('profesion').value;
    }

    if (this.empleadoForm.get('pais').dirty) {
      generales.pais = this.empleadoForm.get('pais').value;
    }

    if (this.empleadoForm.get('depart').dirty) {
      generales.depart = this.empleadoForm.get('depart').value;
    }

    if (this.empleadoForm.get('muni').dirty) {
      generales.muni = this.empleadoForm.get('muni').value;
    }

    //  generales.zona = 1;

    if (this.empleadoForm.get('telefonos').dirty) {
      generales.telefonos = this.empleadoForm.get('telefonos').value;
    }


    if (this.empleadoForm.get('cel').dirty) {
      generales.cel = this.empleadoForm.get('cel').value;
    }

    if (this.empleadoForm.get('dir').dirty) {
      generales.dir = this.empleadoForm.get('dir').value;
    }

    //generales.aldea = 1;
    // generales.parentescoPept = 2;



    /*
            const generales = {
              cia: this.empleado[0].COD_CIA,
              emp: this.empleado[0].COD_EMP,
              estadoC: this.empleadoForm.get('estadoC').value,
              correo: this.empleadoForm.get('correo').value,
              profesion: Number(this.empleadoForm.get('profesion').value),
              pais: Number(this.empleadoForm.get('pais').value),
              depart: Number(this.empleadoForm.get('depart').value),
              muni: Number(this.empleadoForm.get('muni').value),
              zona: 1,
              telefonos: this.empleadoForm.get('telefonos').value,
              cel: this.empleadoForm.get('cel').value,
              dir: this.empleadoForm.get('dir').value,
              aldea: 1,
              parentescoPept: 2,
              asociadoPep: "-",
              cargoPep: "",
              institucionPep: "",
              tipoVivienda: "",
              otraVivienda: "",
              tipoSangre: "+ORH",
              nombreCon: "",
              telCon: "",
              trabajoCon: ""
            };*/

    console.log('LOQ EU MANDO AL SAVE' + JSON.stringify(generales));

    this.autoGestion.guardarDatosGenerales(generales).subscribe(

      ger => {
        console.log(JSON.stringify(ger));
        swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, title: 'Datos Generales!', text: 'Guardados', icon: 'success', });

      }
    );


  }




  valueDetection() {
    console.log(this.empleadoForm.get('estadoC').dirty);
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

    console.log('Objeto que se manda al guardar:' + JSON.stringify(capa));

    this.autoGestion.guardarCapacitacion(capa).subscribe(
      capa => {
        // console.log('repsuesta guardado'+capa);
        this.autoGestion.obtenerCapacitaciones(this.empleado[0].COD_CIA, this.empleado[0].COD_EMP).subscribe(data => this.listaCapacitaciones = data);
        swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, title: 'Capacitacion!', text: 'Capacitacion Agregada', icon: 'success', });

      }
    );

    // this.listaCapacitaciones.push(capa);
    this.capacitacionForm.reset();


  }




  agregarEmergencia() {
    const emergency = {
      cia: this.empleado[0].COD_CIA,
      emp: this.empleado[0].COD_EMP,
      nombre: this.emergenciaForm.get('nombreCon').value,
      tel: this.emergenciaForm.get('telCon').value,
      trabajoCon: this.emergenciaForm.get('lugaTrabajo').value,
      parentesco: this.emergenciaForm.get('parentesco').value
    };


    this.autoGestion.guardarEmergencia(emergency)
      .subscribe(
        emergencia => {
          console.log('rep emergencia:' + JSON.stringify(emergencia));
          this.autoGestion.obtenerEmergencias(this.empleado[0].COD_CIA, this.empleado[0].COD_EMP).subscribe(eme => {
            this.emergencias = eme;
           /* this.autoGestion.obtenerEmergenciasDB(this.empleado[0].COD_CIA, this.empleado[0].COD_EMP).subscribe(
              emeDbs => {
                this.emergencias = this.emergencias.concat(emeDbs);
              }
            );*/
          });
          swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, title: 'Emergencia!', text: 'Emergencia Agregada', icon: 'success', });

        }
      );
    this.emergenciaForm.reset();

    // this.emergencias.push(emergency);
  }






  agregarNivelAcademico() {

    const nivel = {
      cia: this.empleado[0].COD_CIA,
      emp: this.empleado[0].COD_EMP,
      nivel: Number(this.preparacionForm.get('nivel').value),
      institucion: this.preparacionForm.get('institucion').value,
      anioIng: Number(this.preparacionForm.get('anioIng').value),
      anioEgre: Number(this.preparacionForm.get('anioEgre').value),
      noCole: this.preparacionForm.get('colegio').value,
      subNivel: Number(this.preparacionForm.get('subNivel').value),
      pais: Number(this.preparacionForm.get('pais').value),
      depart: Number(this.preparacionForm.get('depart').value)
    };

    this.autoGestion.guardarNivelAcademico(nivel).subscribe(
      nivelAcademico => {
        console.log(JSON.stringify(nivelAcademico));
        this.llenarNivelAcademico(this.empleado[0].COD_CIA, this.empleado[0].COD_EMP);
        swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, title: 'Nivel Academico!', text: 'Agregado Exitosamente', icon: 'success', });

      }
    );

    // this.listaNivelAcademicoTBl.push(nivel);

    this.preparacionForm.reset();
  }




  llenarFicha(data: any): void {

    if (data) {
      this.empleadoForm.get('pais').setValue(data[0].COD_PAIS);
      this.empleadoForm.get('pais').disable();
      this.cambiarDepto(data[0].COD_PAIS);
      this.empleadoForm.get('depart').setValue(data[0].COD_DEPAR);
      this.empleadoForm.get('depart').disable();
      this.cambiarMunic(data[0].COD_DEPAR);
      this.empleadoForm.get('muni').setValue(data[0].COD_MUNI);
      this.empleadoForm.get('muni').disable();
      this.empleadoForm.get('profesion').setValue(data[0].COD_PROFESION);
      this.empleadoForm.get('telefonos').setValue(data[0].TELEFONOS);
      this.empleadoForm.get('cel').setValue(data[0].CEL_EMP);
      this.empleadoForm.get('correo').setValue(data[0].CORREO_PERSONAL);
      this.empleadoForm.get('dir').setValue(data[0].DIRECCION);
      this.empleadoForm.get('estadoC').setValue(data[0].ESTADO_CIVIL);

    }

  }


  llenarNivelAcademico(cia: number, emp: number) {

    this.autoGestion.obtenerNivelAcademicoEmp(cia, emp).subscribe(
      data => {
        this.listaNivelAcademicoTBl = data

        this.autoGestion.obtenerNivelAcademicoDB(cia, emp).subscribe(

          base => {
            this.listaNivelAcademicoTBl = this.listaNivelAcademicoTBl.concat(base);
          }

        );

      }
    );
  }


  nivel($event) {
    let value: number = $event.target.value;

    this.autoGestion.obtenerNivelAcademico(3).subscribe(
      data => {
        let array: Array<any>;
        array = data;
        array.forEach(
          datos => {
            // console.log(JSON.stringify(datos));

            if (datos.COD_NIVEL_ACADEMICO == value) {
              this.obtenerNivelAcademico(datos);
              console.log('EL NIVEL:' + value);
            }
          }
        );
      }
    );


  }


  obtenerNivelAcademico(param: any) {
    console.log('OBJETO' + JSON.stringify(param));
  }










}
