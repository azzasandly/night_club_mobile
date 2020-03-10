import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { SlideGuard } from './guard/slide.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  { path: 'login',
   loadChildren: './pages/auth/login/login.module#LoginPageModule',canActivate: [SlideGuard]
  },
  
   { path: 'register',
   loadChildren: './pages/auth/register/register.module#RegisterPageModule',canActivate: [SlideGuard]
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
  {
    path: 'qrcode',
    loadChildren: './pages/qrcode/qrcode.module#QrcodePageModule',canActivate: [AuthGuard] 
  },
  {
    path: 'slides',
    loadChildren: () => import('./pages/slides/slides.module').then( m => m.SlidesPageModule)
  },


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
