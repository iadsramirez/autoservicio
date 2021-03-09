import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutogestionService } from '../../../servicio/autogestion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-autenticar',
  templateUrl: './autenticar.component.html',
  styleUrls: ['./autenticar.component.scss']
})
export class AutenticarComponent implements OnInit {

  ingresoForm:FormGroup;

  constructor(private fb: FormBuilder,public autoGestionService:AutogestionService,private router:Router) { 

    this.ingresoForm = this.fb.group({
      usuario: ['', [Validators.required]],
      clave: ['', [Validators.required]]
    });


  }

  ngOnInit(): void {
  }



  ingresar(){
    let usuario:string=this.ingresoForm.get('usuario').value;
    let clave:string=this.ingresoForm.get('clave').value;

    console.log('INGRESE AL METODO')


    this.autoGestionService.validaUsr(usuario,clave).subscribe(
      data=>{
        console.log('lo que tiene :'+JSON.stringify(data));
        this.autoGestionService.logeado=true;
        this.autoGestionService.obtenerEmpleado(usuario).subscribe(
          empleado=>{
            localStorage.setItem('empleadoSession', JSON.stringify(empleado))
          }
        );
       
        this.router.navigate(['/menu-principal']);
        
      }
    );
  }




}
