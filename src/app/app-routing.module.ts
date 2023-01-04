import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard.component';
import { HomeComponent } from './home/home.component';
import { LoggerComponent } from './logger/logger.component';

const routes: Routes = [{ path: '', component: HomeComponent, canActivate: [AuthGuard] },
{ path: 'login', component: LoggerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
