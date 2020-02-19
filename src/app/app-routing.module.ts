import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  { path: 'login',
   loadChildren: './pages/auth/login/login.module#LoginPageModule'
  },
  
   { path: 'register',
   loadChildren: './pages/auth/register/register.module#RegisterPageModule'
  },
  
  { path: 'dashboard',
   loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule', canActivate: [AuthGuard] 
  },
 
  {path: 'checklist',
   loadChildren: './pages/checklist/checklist.module#ChecklistPageModule', canActivate: [AuthGuard] 
  },
  
   {
    path: 'profile', 
    loadChildren: './pages/profile/profile.module#ProfilePageModule', canActivate: [AuthGuard]
  },

  {
    path: 'club',
    loadChildren: './pages/club/club.module#ClubPageModule', canActivate: [AuthGuard]
  },
  {
    path: 'event',
    loadChildren: './pages/event/event.module#EventPageModule', canActivate: [AuthGuard]
  },
  
  {
    path: 'details-event',
    loadChildren:'./pages/details-event/details-event.module#DetailsEventPageModule', canActivate: [AuthGuard]
  },
  {
    path: 'booking',
    loadChildren: './pages/booking/booking.module#BookingPageModule', canActivate: [AuthGuard]
  },
  {
    path: 'home',
    loadChildren: './pages/home/home.module#HomePageModule', canActivate: [AuthGuard]
  },


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
