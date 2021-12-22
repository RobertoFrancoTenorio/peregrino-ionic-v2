import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CitasAsignadasPage } from './citas-asignadas.page';

const routes: Routes = [
  {
    path: '',
    component: CitasAsignadasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CitasAsignadasPageRoutingModule {}
