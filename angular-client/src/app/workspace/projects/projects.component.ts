import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { StoreService } from '../../core/services';
import { Project, Team } from '../../core/models';
import { CreateProjectModalComponent, EditProjectModalComponent } from '../../shared/modals';
import { ProjectRepositoryService } from '../../core/repositories';

@Component({
  selector: 'app-workspace-projects',
  templateUrl: './projects.component.html'
})
export class ProjectsComponent {

  public search : string = '';
  public loading : boolean = false;

  constructor (
    private modal : NgbModal,
    private toastrService : ToastrService,
    private storeService : StoreService,
    private projectRepository : ProjectRepositoryService
  ) { }

  public get pages () : string[] {
    return [this.workspace.name, 'Projects'];
  }

  public get workspace () : Team {
    return this.storeService.workspace;
  }

  public get roles () : any {
    return this.storeService.roles;
  }

  public get projects () : Project[] {
    return this.storeService.projects;
  }

  public refreshProjects () : void {
    this.loading = true;
    this.storeService.fetchAllProjects(this.storeService.workspace.id);
    setTimeout(() => this.loading = false, 2000);
  }

  public openEditProjectModal (project : Project) : void {
    const modal = this.modal.open(EditProjectModalComponent, { size: 'lg' });
    modal.componentInstance.project = project;
  }

  public openCreateProjectModal () : void {
    this.modal.open(CreateProjectModalComponent, { size: 'lg' });
  }

  public deleteProject (project : Project) : void {
    this.projectRepository.delete(this.workspace.id, project.id)
      .subscribe(
        () => {
          this.toastrService.success('Project has been removed.');
          this.refreshProjects();
        },
        () => this.toastrService.warning('Error while deleting, project didn\'t removed.')
      );
  }

}
