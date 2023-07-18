import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReporteComponent } from './pages/reporte/reporte.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/reporte',
    pathMatch: 'full',
  },
  {
    path: 'reporte',
    component: ReporteComponent,
    //canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
