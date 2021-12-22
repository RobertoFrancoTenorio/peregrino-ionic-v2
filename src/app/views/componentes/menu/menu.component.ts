import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { CitaService } from './../../../services/cita/cita.service';
import { AuthService } from './../../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  asignada = null;
  usuario = null;
  doctor: boolean = true;
  aceptadas: number = 0;

  constructor(
    private menuCtrl: MenuController,
    private auth: AuthService,
    private cita: CitaService,
    private router: Router
  ) {

  }

  async ngOnInit() {
    this.auth.userDetails().subscribe(async (user) => {
      if(user!=null){
        this.auth.currentUser = user;
        await this.auth.getUserData();
        this.numeroCitas();
        //this.auth.signOut();
      }
    })
  }

  logout(){
    this.menuCtrl.close();
    this.auth.signOut();
    this.usuario = false;
    this.doctor = false;
    console.log('logout');
  }

  numeroCitas(){
    this.cita.getCitasAsignadasDoctor(this.auth.dataUser.id).subscribe(data =>{
      this.asignada = data.length;
    });
    this.cita.getCitasEstatus(this.auth.currentUserId, 'aceptada').subscribe(data =>{
      this.aceptadas = data.length;
    })
  }

  goToCitas(){
    this.menuCtrl.close();
    this.router.navigate(['/citas-asignadas'])
  }

  goToCitasAceptadas(){
    this.menuCtrl.close();
    this.router.navigate(['/citas-aceptadas'])
  }

  goTo(param: any){
    this.menuCtrl.close();
    this.router.navigate([param])
  }
}
