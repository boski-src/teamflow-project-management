import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NgbDropdown, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AccountService } from '../../../core/services';
import { UserAccount } from '../../../core/models';

import { AccountSettingsModalComponent, LoginHistoryModalComponent } from '../../modals';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor (private accountService : AccountService, private modal : NgbModal, private renderer : Renderer2) { }

  public get account () : UserAccount {
    return this.accountService.get();
  }

  public get avatar () : string {
    return this.accountService.avatar;
  }

  private get body () : any {
    return document.getElementsByTagName('body')[0];
  }

  public openAccountModal () : void {
    this.modal.open(AccountSettingsModalComponent, { size: 'lg' });
  }

  public openLoginHistoryModal () : void {
    this.modal.open(LoginHistoryModalComponent, { size: 'lg' });
  }

  public ngOnInit () {
    document.getElementsByClassName('sidebar-brand')[0].addEventListener('click', () => {
      this.renderer.removeClass(document.body, 'sidebar-mini');
    });
  }

  public sidebarCollapse () : void {
    if (this.body.classList.contains('sidebar-mini')) this.openSidebar();
    else this.closeSidebar();
  }

  private openSidebar () : void {
    this.renderer.removeClass(document.body, 'sidebar-mini');
  }

  private closeSidebar () : void {
    this.renderer.addClass(document.body, 'sidebar-mini');
  }

}
