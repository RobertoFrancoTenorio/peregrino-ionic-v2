import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./views/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./views/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'citas-asignadas',
    loadChildren: () => import('./views/citas-asignadas/citas-asignadas.module').then( m => m.CitasAsignadasPageModule)
  },
  {
    path: 'citas-aceptadas',
    loadChildren: () => import('./views/citas-aceptadas/citas-aceptadas.module').then( m => m.CitasAceptadasPageModule)
  },
  {
    path: 'consulta',
    loadChildren: () => import('./views/consulta/consulta.module').then( m => m.ConsultaPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
