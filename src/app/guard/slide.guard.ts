import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class SlideGuard implements CanActivate {

  constructor(
    private router: Router,
    private storage: Storage,
  ) {  }



 async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean>  {
      const isComplete = await this.storage.get('complete');
      console.log("complet in guard slide ",isComplete)
      if (!isComplete){
        console.log("here");
        this.router.navigate(['/slides']);
      }
      return isComplete;

  }
}
