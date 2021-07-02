import {Component, HostListener, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { AutogestionService } from './servicio/autogestion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  userActivity;
  userInactive: Subject<any> = new Subject();


  constructor(private router: Router,private servicio:AutogestionService) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

    this.setTimeout();
    this.userInactive.subscribe(() => {
     // console.log('user has been inactive for 3s');
      Swal.fire('Inactividad','Usuario Inactivo por mas de 1 minuto','error');
      this.servicio.logeado=false;
      this.router.navigateByUrl('autenticar');

    });
  }


  setTimeout() {
    this.userActivity = setTimeout(() => this.userInactive.next(undefined), 60000);
  }

  @HostListener('window:mousemove') refreshUserState() {
    clearTimeout(this.userActivity);
    this.setTimeout();
  }
}
