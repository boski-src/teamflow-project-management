import { BehaviorSubject, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Chat, Project, Team, TeamRoles } from '../../models';
import { ChatRepositoryService, ProjectRepositoryService, TeamRepositoryService } from '../../repositories';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private workspacesSubject : BehaviorSubject<Team[]> = new BehaviorSubject<Team[]>([]);
  private projectsSubject : BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>([]);
  private chatsSubject : BehaviorSubject<Chat[]> = new BehaviorSubject<Chat[]>([]);

  private acWorkspaceSubject : BehaviorSubject<Team> = new BehaviorSubject<Team>({} as Team);
  private acProjectSubject : BehaviorSubject<Project> = new BehaviorSubject<Project>({} as Project);
  private acChatSubject : BehaviorSubject<Chat> = new BehaviorSubject<Chat>({} as Chat);
  private acRolesSubject : BehaviorSubject<TeamRoles> = new BehaviorSubject<TeamRoles>({} as TeamRoles);

  public workspaces$ : Observable<Team[]> = this.workspacesSubject.asObservable();
  public projects$ : Observable<Project[]> = this.projectsSubject.asObservable();
  public chats$ : Observable<Chat[]> = this.chatsSubject.asObservable();
  public workspace$ : Observable<Team> = this.acWorkspaceSubject.asObservable();
  public project$ : Observable<Project> = this.acProjectSubject.asObservable();
  public chat$ : Observable<Chat> = this.acChatSubject.asObservable();
  public roles$ : Observable<TeamRoles> = this.acRolesSubject.asObservable();

  constructor (
    private teamRepository : TeamRepositoryService,
    private projectRepository : ProjectRepositoryService,
    private chatRepository : ChatRepositoryService,
    private router : Router,
    private toastrService : ToastrService
  ) { }

  public get workspaces () : Team[] {
    return this.workspacesSubject.value;
  }

  public set workspaces (data : Team[]) {
    this.workspacesSubject.next(data);
  }

  public get projects () : Project[] {
    return this.projectsSubject.value;
  }

  public set projects (data : Project[]) {
    this.projectsSubject.next(data);
  }

  public get chats () : Chat[] {
    return this.chatsSubject.value;
  }

  public set chats (data : Chat[]) {
    this.chatsSubject.next(data);
  }

  public get workspace () : Team {
    return this.acWorkspaceSubject.value;
  }

  public set workspace (data : Team) {
    this.acWorkspaceSubject.next(data);
  }

  public get project () : Project {
    return this.acProjectSubject.value;
  }

  public set project (data : Project) {
    this.acProjectSubject.next(data);
  }

  public get chat () : Chat {
    return this.acChatSubject.value;
  }

  public set chat (data : Chat) {
    this.acChatSubject.next(data);
  }

  public get roles () : any {
    return this.acRolesSubject.value;
  }

  public set roles (data : any) {
    this.acRolesSubject.next(data);
  }

  public fetchAllWorkspaces () : void {
    this.teamRepository.getAll()
      .subscribe(data => this.workspaces = data);
  }

  public fetchAllProjects (workspaceId) : void {
    this.projectRepository.getAll(workspaceId)
      .subscribe(data => this.projects = data);
  }

  public fetchAllChats (workspaceId) : void {
    this.chatRepository.getAll(workspaceId)
      .subscribe(data => this.chats = data);
  }

  public fetchWorkspace (workspaceId) : void {
    this.teamRepository.get(workspaceId)
      .subscribe(
        data => {
          this.workspace = data;
          this.fetchWorkspaceRoles(workspaceId);
        },
        (error : any) => {
          if (error.status === 403) {
            this.toastrService.error('You aren\'t member or admin of this team.');
            this.router.navigate(['']);
          } else if (error.status === 404) {
            this.toastrService.error('Workspace not found in any document');
            this.router.navigate(['']);
          }
        }
      );
  }

  public fetchWorkspaceRoles (workspaceId) : void {
    this.teamRepository.getRoles(workspaceId)
      .subscribe(data => this.roles = data);
  }

  public fetchProject (workspaceId, projectId) : void {
    this.projectRepository.get(workspaceId, projectId)
      .subscribe(
        data => this.project = data,
        (error : any) => {
          if (error.status === 404) {
            this.toastrService.error('Project not found in any document.');
            this.router.navigate(['/', workspaceId, 'projects']);
          }
        }
      );
  }

  public fetchChat (workspaceId, chatId) : void {
    this.chatRepository.get(workspaceId, chatId)
      .subscribe(
        data => this.chat = data,
        (error : any) => {
          if (error.status === 404) {
            this.toastrService.error('Chat not found in any document.');
            this.router.navigate(['/', workspaceId, 'chats']);
          }
        }
      );
  }

  public resetWorkspace () : void {
    this.workspace = {} as Team;
    this.roles = {};
  }

  public resetProject () : void {
    this.project = {} as Project;
  }

  public resetChat () : void {
    this.chat = {} as Chat;
  }

  public resetWorkspaces () : void {
    this.workspaces = [] as Team[];
  }

  public resetProjects () : void {
    this.projects = [] as Project[];
  }

  public resetChats () : void {
    this.chats = [] as Chat[];
  }

  public patchWorkspace (workspaceId, data : { name : string, description : string }) : void {
    let workspaceIndex = this.workspaces.findIndex(item => item.id === workspaceId);
    if (this.workspace.id === workspaceId) {
      this.workspace.name = data.name;
      this.workspace.description = data.description;
    }
    this.workspaces[workspaceIndex].name = data.name;
    this.workspaces[workspaceIndex].description = data.description;
  }

  public patchProject (
    projectId,
    data : {
      name : string,
      description : string,
      finished : boolean,
      deadline : Date
    }
  ) : void {
    let projectIndex = this.projects.findIndex(item => item.id === projectId);
    if (this.project.id === projectId) {
      this.project.name = data.name;
      this.project.description = data.description;
      this.project.finished = data.finished;
      this.project.deadline = data.deadline;
    }
    this.projects[projectIndex].name = data.name;
    this.projects[projectIndex].description = data.description;
    this.projects[projectIndex].finished = data.finished;
    this.projects[projectIndex].deadline = data.deadline;
  }

  public patchChat (chatId, data : { name : string, description : string }) : void {
    let chatIndex = this.chats.findIndex(item => item.id === chatId);
    if (this.chat.id === chatId) {
      this.chat.name = data.name;
      this.chat.description = data.description;
    }
    this.chats[chatIndex].name = data.name;
    this.chats[chatIndex].description = data.description;
  }

  public spliceWorkspace (workspaceId) {
    let index = this.workspaces.findIndex(item => item.id === workspaceId);
    this.workspaces.splice(index, 1);
  }

  public spliceProject (projectId) {
    let index = this.projects.findIndex(item => item.id === projectId);
    this.projects.splice(index, 1);
  }

  public spliceChat (chatId) {
    let index = this.chats.findIndex(item => item.id === chatId);
    this.chats.splice(index, 1);
  }

}
