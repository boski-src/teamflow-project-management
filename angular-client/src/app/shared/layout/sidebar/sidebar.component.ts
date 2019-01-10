import { Component, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDropdown, NgbDropdownConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { meta } from '../../../../environments/meta';

import {
  CreateWorkspaceModalComponent,
  EditChatModalComponent,
  EditProjectModalComponent,
  EditWorkspaceModalComponent
} from '../../modals';
import { Chat, Project, Team } from '../../../core/models';
import { ChatRepositoryService, ProjectRepositoryService, TeamRepositoryService } from '../../../core/repositories';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [NgbDropdownConfig]
})
export class SidebarComponent implements OnInit {

  @ViewChild('workspacesDropdown') public workspacesDropdown : NgbDropdown;

  @Input() public workspaces : Team[] = [];
  @Input() public workspace : Team;
  @Input() public projects : Project[] = [];
  @Input() public project : Project;
  @Input() public chats : Chat[] = [];
  @Input() public chat : Chat;
  @Input() public roles : any;

  constructor (
    private modal : NgbModal,
    private router : Router,
    private toastrService : ToastrService,
    private ngbDropdownConfig : NgbDropdownConfig,
    private renderer : Renderer2,
    private teamRepository : TeamRepositoryService,
    private chatRepository : ChatRepositoryService,
    private projectRepository : ProjectRepositoryService
  ) {
    this.ngbDropdownConfig.autoClose = false;
  }

  public get meta () : any {
    return meta;
  }

  public openCreateWorkspaceModal () : void {
    this.modal.open(CreateWorkspaceModalComponent, { size: 'lg' });
  }

  public openEditWorkspaceModal () : void {
    this.modal.open(EditWorkspaceModalComponent, { size: 'lg' });
  }

  public openEditChatModal () : void {
    this.modal.open(EditChatModalComponent, { size: 'lg' });
  }

  public openEditProjectModal () : void {
    this.modal.open(EditProjectModalComponent, { size: 'lg' });
  }

  public ngOnInit () {
    // this.workspacesDropdown.open();
  }

  public leaveFromWorkspace (confirm : boolean) : void {
    if (confirm) {
      if (this.roles.isAdmin) {
        this.teamRepository.leaveFromAdmin(this.workspace.id)
          .subscribe(() => this.router.navigate(['']));
      }
      if (this.roles.isMember) {
        this.teamRepository.leaveFromMember(this.workspace.id)
          .subscribe(() => this.router.navigate(['']));
      }
    }
  }

  public deleteWorkspace (password : string) : void {
    if (password) {
      this.teamRepository.delete(this.workspace.id, password)
        .subscribe(
          () => {
            this.toastrService.success('Workspace has been removed.');
            this.router.navigate(['']);
          },
          () => this.toastrService.warning('Error while deleting, workspace didn\'t removed.')
        );
    }
  }

  public deleteChat () : void {
    this.chatRepository.delete(this.workspace.id, this.chat.id)
      .subscribe(
        () => {
          this.toastrService.success('Chat has been removed.');
          this.router.navigate(['/', this.workspace.id, 'chats']);
        },
        () => this.toastrService.warning('Error while deleting, chat didn\'t removed.')
      );
  }

  public deleteProject () : void {
    this.projectRepository.delete(this.workspace.id, this.project.id)
      .subscribe(
        () => {
          this.toastrService.success('Project has been removed.');
          this.router.navigate(['/', this.workspace.id, 'projects']);
        },
        () => this.toastrService.warning('Error while deleting, project didn\'t removed.')
      );
  }

  // public closeSidebar () : void {
  //   this.renderer.addClass(document.body, 'sidebar-mini');
  // }

}