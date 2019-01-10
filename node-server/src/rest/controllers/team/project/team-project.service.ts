import { Types } from 'mongoose';
import { Catch } from 'express-server-decorators';

import { ProjectRepository, TeamRepository } from '../../../../base';
import {
  IProjectModel,
  IProjectRepositoryCreateData,
  IProjectRepositoryUpdateData,
  IProjectSchema
} from '../../../../common/interfaces';

import { publish } from '../../../../graphql/pubsub';
import { PROJECT_CREATED, PROJECT_DELETED, PROJECT_UPDATED } from '../../../../graphql/constants';

export class TeamProjectService {

  private teamRepository : TeamRepository;
  private projectRepository : ProjectRepository;

  constructor () {
    this.teamRepository = new TeamRepository();
    this.projectRepository = new ProjectRepository();
  }

  @Catch('An error occured while creating new project.')
  public async insert (userId, teamId, data : IProjectRepositoryCreateData) : Promise<object> {
    let create : IProjectRepositoryCreateData = {
      _team: teamId,
      name: data.name,
      description: data.description,
      deadline: data.deadline,
      manager: userId
    };

    let project : IProjectModel = await this.projectRepository.create(create);
    await this.teamRepository.updateProjects(teamId, project.id);

    await publish(PROJECT_CREATED, project);

    return project.formatDocument();
  }

  @Catch('An error occured while receiving project data.')
  public async getOne (projectId) : Promise<object> {
    let select = {
      _team: 1,
      id: 1,
      name: 1,
      description: 1,
      manager: 1,
      deadline: 1,
      finished: 1,
      createdAt: 1,
      updatedAt: 1
    };
    let refs = [
      {
        path: 'manager',
        select: { firstName: 1, lastName: 1, email: 1, online: 1 }
      }
    ];

    return await this.projectRepository.findById(projectId, select, refs);
  }

  @Catch('An error occured while receiving list of team\'s project.')
  public async getBelongTeam (teamId) : Promise<IProjectSchema[]> {
    let select = {
      _team: 1,
      id: 1,
      name: 1,
      description: 1,
      deadline: 1,
      finished: 1,
      createdAt: 1,
      updatedAt: 1
    };
    return await this.projectRepository.findBelongTeam(teamId, select);
  }

  @Catch('An error occured while receiving list of team\'s project.')
  public async getBelongTeamPaginate (teamId, skip : number = 0, limit : number = 10) : Promise<IProjectSchema[]> {
    let select = {
      _team: 1,
      id: 1,
      name: 1,
      description: 1,
      deadline: 1,
      finished: 1,
      createdAt: 1,
      updatedAt: 1
    };
    return await this.projectRepository.findBelongTeam(teamId, select, { skip, limit });
  }

  @Catch('An error occured while updating project.')
  public async edit (projectId : Types.ObjectId, data : IProjectRepositoryUpdateData) : Promise<object> {
    let updated : IProjectModel = await this.projectRepository.update(projectId, {
      name: data.name,
      description: data.description,
      deadline: data.deadline,
      finished: data.finished
    });

    await publish(PROJECT_UPDATED, updated);

    return updated.formatDocument(['id', 'name', 'description', 'deadline', 'finished']);
  }

  @Catch('An error occured while updating project name.')
  public async editName (projectId : Types.ObjectId, newName : string) : Promise<object> {
    let updated : IProjectModel = await this.projectRepository.updateName(projectId, newName);

    await publish(PROJECT_UPDATED, updated);

    return updated.formatDocument(['id', 'name']);
  }

  @Catch('An error occured while updating project description.')
  public async editDescription (projectId : Types.ObjectId, newDescription : string) : Promise<object> {
    let updated : IProjectModel = await this.projectRepository.updateName(projectId, newDescription);

    await publish(PROJECT_UPDATED, updated);

    return updated.formatDocument(['id', 'description']);
  }

  @Catch('An error occured while updating project deadline.')
  public async editDeadline (projectId : Types.ObjectId, newDeadline : Date) : Promise<object> {
    let updated : IProjectModel = await this.projectRepository.updateDeadline(projectId, newDeadline);

    await publish(PROJECT_UPDATED, updated);

    return updated.formatDocument(['id', 'deadline']);
  }

  @Catch('An error occured while updating project finished.')
  public async editFinished (projectId : Types.ObjectId, newFinished : boolean) : Promise<object> {
    let updated : IProjectModel = await this.projectRepository.updateFinished(projectId, newFinished);

    await publish(PROJECT_UPDATED, updated);

    return updated.formatDocument(['id', 'finished']);
  }

  @Catch('An error occured while deleting team\'s project.')
  public async remove (projectId, userId) : Promise<object> {
    let deleted : IProjectModel = await this.projectRepository.delete(projectId, userId);

    await publish(PROJECT_DELETED, deleted);

    return deleted.formatDocument(['id', 'name', 'deletedAt']);
  }

}