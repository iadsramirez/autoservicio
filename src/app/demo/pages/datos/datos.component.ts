import { Component, OnInit } from '@angular/core';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { AutogestionService } from '../../../servicio/autogestion.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.scss'],
  providers: [NgbAccordionConfig] 
})
export class DatosComponent implements OnInit {

  listaAutoGestion:Array<any>=[];
  empleadoForm:FormGroup;
  listaPaises:Array<any>;
  empleado: any;
  listaDepartementos:Array<any>;
  listaMunicipios:Array<any>;
  paisSelect:any;


  constructor(
    private autoGestion:AutogestionService,
    config: NgbAccordionConfig, 
    private formBuilder: FormBuilder
    ) { 


      this.empleado = JSON.parse(localStorage.getItem('empleadoSession'));


      

      this.autoGestion.obtenerPaises().subscribe(
        pais=>{
          this.listaPaises=pais;
        }
      );



      this.empleadoForm=this.formBuilder.group({
        
        cia:[],
        emp:[],
        estadoC:[],
        correo:[],
        profesion:[],
        pais:[],    
        depart:[],
        muni:[],
        zona:[],
        telefonos:[],
        cel:[],
        dir:[],    
        aldea:[],
        parentescoPep:[],
        asociadoPep:[],
        cargoPep:[],
        institucionPep:[],
        tipoVivienda:[],
        otraVivienda:[],
        tipoSangre:[],
        nombreCon:[],
        telCon:[],
        trabajoCon:[],
        nombreEmpleado:[] 
      });
    
    autoGestion.logeado=true;
   

    config.closeOthers = true;
    config.type = 'primary';

    
    
    
    this.autoGestion.obtenerPaises().subscribe(
      pais=>{
        
        this.listaAutoGestion=pais;
      }
    );


    this.llenarEmpleado();

  }

  ngOnInit(): void {
  }


  llenarEmpleado(){
    console.log(JSON.stringify(this.empleado));
    this.empleadoForm.get('nombreEmpleado').setValue(this.empleado[0].NOMBRE);
  }



  cambiarDepto(pais:any){
    console.log('paise seleccionado'+pais);

    this.autoGestion.obtenerDepartamento(pais).subscribe(
      deptos=>{
       
        this.listaDepartementos=deptos;
      }
    );

  }

  cambiarMunic(depto:any){

    this.autoGestion.obtenerMunicipio(this.empleadoForm.get('pais').value,depto).subscribe(
      municipio=>{
        console.log(JSON.stringify(municipio));
        this.listaMunicipios=municipio;
      }
    );

  }

  guardar(){

  }


}
