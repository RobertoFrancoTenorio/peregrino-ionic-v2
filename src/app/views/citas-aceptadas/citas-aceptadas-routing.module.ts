import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CitasAceptadasPage } from './citas-aceptadas.page';

const routes: Routes = [
  {
    path: '',
    component: CitasAceptadasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CitasAceptadasPageRoutingModule {}
