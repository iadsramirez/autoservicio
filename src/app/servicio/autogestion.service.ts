import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AutogestionService {

  public logeado:boolean;


  constructor(private http: HttpClient) { }


  validaUsr(usuario: string, pass: string): Observable<any> {
    return this.http.get(`http://138.128.245.244:8080/ServicioApp/webresources/api/verificar/${usuario}/${pass}`);

  }


  obtenerEmpleado(usuario:string):Observable<any>{
    return this.http.get(environment.baseURl+'usuarios/'+usuario);
  }


  obtenerTotales(cia:number,emp:number):Observable<any>{
    return this.http.get(environment.baseURl+'totalesGenerales/'+cia+'/'+emp);
  }



  obtenerProgramacionesCerradas(cia:number,emp:number):Observable<any>{
    return this.http.get(environment.baseURl+'programacionPlanilla/'+cia+'/'+emp);
    
  }




}

