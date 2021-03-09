import { Component, OnInit } from '@angular/core';
import { AutogestionService } from '../../../../servicio/autogestion.service';

@Component({
  selector: 'app-theme-horizontal',
  templateUrl: './theme-horizontal.component.html',
  styleUrls: ['./theme-horizontal.component.scss']
})
export class ThemeHorizontalComponent implements OnInit {

  constructor(public autoServicio:AutogestionService) { 
  
    this.autoServicio.logeado=true;

  }

  ngOnInit() {

    this.reload();
    
  }






  reload(){

    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }



  }






}
