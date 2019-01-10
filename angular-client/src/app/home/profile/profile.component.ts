import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { environment } from '../../../environments/environment';

import { UserRepositoryService } from '../../core/repositories';
import { User, UserProfile } from '../../core/models';

@Component({
  selector: 'app-home-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit, OnDestroy {

  public user : User = new User({});
  private profileSubscription : Subscription = new Subscription();

  constructor (
    private route : ActivatedRoute,
    private router : Router,
    private toastrService : ToastrService,
    private userRepository : UserRepositoryService
  ) { }

  public get pages () : string[] {
    return ['Profile', this.fullRealName];
  }

  public get params () {
    return this.route.snapshot.params;
  }

  public get profile () : UserProfile {
    return this.user.profile;
  }

  public get fullRealName () : string {
    return `${this.user.firstName} ${this.user.lastName}`;
  }

  public get avatar () : string {
    return `${environment.storageUrl}/avatars/${this.user.id}`;
  }

  private notFound () {
    this.router.navigate(['']);
    this.toastrService.warning('User not found or his profile is unconfigured.');
  }

  public ngOnInit () {
    this.ngOnDestroy();
    this.profileSubscription = this.userRepository.get(this.params.userId)
      .subscribe(
        data => this.user = data,
        () => this.notFound()
      );
  }

  public ngOnDestroy () {
    this.profileSubscription.unsubscribe();
  }

}
