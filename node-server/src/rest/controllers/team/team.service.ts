import { Types } from 'mongoose';
import { Catch } from 'express-server-decorators';

import { TeamRepository } from '../../../base';
import { ITeamModel, ITeamRepositoryCreateData, ITeamRepositoryUpdateData, ITeamSchema } from '../../../common';

import { publish } from '../../../graphql/pubsub';
import { TEAM_DELETED, TEAM_UPDATED } from '../../../graphql/constants';

export class TeamService {

  private teamRepository : TeamRepository;

  constructor () {
    this.teamRepository = new TeamRepository();
  }

  @Catch('Team with this name already exits.', 400)
  public async insert (userId, data : ITeamRepositoryCreateData) : Promise<object> {
    let team : ITeamModel = await this.teamRepository.create({
      name: data.name,
      description: data.description,
      admins: [userId],
      leader: userId
    });

    return team.formatDocument();
  }

  @Catch('An error occured while receiving team data.', 400)
  public async getOne (teamId) : Promise<ITeamSchema> {
    let select = {
      name: 1,
      description: 1,
      leader: 1,
      createdAt: 1,
      updatedAt: 1
    };
    let refs = [
      {
        path: 'leader',
        select: { firstName: 1, lastName: 1, email: 1, online: 1 }
      }
    ];

    return await this.teamRepository.findById(teamId, select, refs);
  }

  @Catch('An error occured while receiving team roles.', 400)
  public async getAccess (team : ITeamModel, userId) : Promise<object> {
    return {
      isAdmin: team.isAdmin(userId),
      isMember: team.isMember(userId),
      hasAccess: team.hasAccess(userId),
    };
  }

  @Catch('An error occured while receiving list of your teams.', 400)
  public async getBelongUser (userId, role? : string) : Promise<ITeamSchema[]> {
    let select = {
      name: 1,
      description: 1,
      leader: 1,
      createdAt: 1,
      updatedAt: 1
    };
    let refs = [
      {
        path: 'leader',
        select: { firstName: 1, lastName: 1 }
      }
    ];

    switch (role) {
      case 'admin':
        return await this.teamRepository.findBelongByAdminity(userId, select, {}, refs);
      case 'member':
        return await this.teamRepository.findBelongByMembership(userId, select, {}, refs);
      default:
        return await this.teamRepository.findBelongUser(userId, select, {}, refs);
    }
  }

  @Catch('An error occured while receiving list of your teams.', 400)
  public async getBelongUserPaginate (
    userId,
    skip : number = 0,
    limit : number = 10,
    role? : string
  ) : Promise<ITeamSchema[]> {
    let select = {
      name: 1,
      description: 1,
      leader: 1,
      createdAt: 1,
      updatedAt: 1
    };
    let refs = [
      {
        path: 'leader',
        select: { firstName: 1, lastName: 1, email: 1, online: 1 }
      }
    ];

    switch (role) {
      case 'admin':
        return await this.teamRepository.findBelongByAdminity(userId, select, { skip, limit }, refs);
      case 'member':
        return await this.teamRepository.findBelongByMembership(userId, select, { skip, limit }, refs);
      default:
        return await this.teamRepository.findBelongUser(userId, select, { skip, limit }, refs);
    }
  }

  @Catch('An error occured while receiving admins data.', 400)
  public async getAdmins (teamId) : Promise<object[]> {
    let select = { admins: 1 };
    let refs = [
      {
        path: 'admins',
        select: { firstName: 1, lastName: 1, email: 1, online: 1 }
      }
    ];
    let team = await this.teamRepository.findById(teamId, select, refs);

    return team.admins;
  }

  @Catch('An error occured while receiving admins data.', 400)
  public async getAdminsPaginate (teamId, start = 0, limit = 10) : Promise<object[]> {
    let select = {
      admins: {
        $slice: [start, limit]
      }
    };
    let refs = [
      {
        path: 'admins',
        select: { firstName: 1, lastName: 1, email: 1, online: 1 }
      }
    ];
    let team = await this.teamRepository.findById(teamId, select, refs);

    return team.admins;
  }

  @Catch('An error occured while receiving members data.', 400)
  public async getMembers (teamId) : Promise<object[]> {
    let select = { members: 1 };
    let refs = [
      {
        path: 'members',
        select: { firstName: 1, lastName: 1, email: 1, online: 1 }
      }
    ];
    let team = await this.teamRepository.findById(teamId, select, refs);

    return team.members;
  }

  @Catch('An error occured while receiving members data.', 400)
  public async getMembersPaginate (teamId, start = 0, limit = 10) : Promise<object[]> {
    let select = {
      admins: {
        $slice: [start, limit]
      }
    };
    let refs = [
      {
        path: 'members',
        select: { firstName: 1, lastName: 1, email: 1, online: 1 }
      }
    ];
    let team = await this.teamRepository.findById(teamId, select, refs);

    return team.members;
  }

  @Catch('An error occured while updating team.', 400)
  public async edit (teamId : Types.ObjectId, data : ITeamRepositoryUpdateData) : Promise<object> {
    let updated : ITeamModel = await this.teamRepository.update(teamId, {
      name: data.name,
      description: data.description
    });

    await publish(TEAM_UPDATED, updated);

    return updated.formatDocument(['id', 'name', 'description']);
  }

  @Catch('An error occured while updating team name.', 400)
  public async editName (teamId : Types.ObjectId, newName : string) : Promise<object> {
    let updated : ITeamModel = await this.teamRepository.updateName(teamId, newName);

    await publish(TEAM_UPDATED, updated);

    return updated.formatDocument(['id', 'name']);
  }

  @Catch('An error occured while updating team description.', 400)
  public async editDescription (teamId : Types.ObjectId, newDescription : string) : Promise<object> {
    let updated : ITeamModel = await this.teamRepository.updateName(teamId, newDescription);

    await publish(TEAM_UPDATED, updated);

    return updated.formatDocument(['id', 'description']);
  }

  @Catch('An error occured while updating team admins.', 400)
  public async editAdmins (teamId, userIDs) : Promise<object> {
    let updated : ITeamModel = await this.teamRepository.updateAdmins(teamId, userIDs);

    await publish(TEAM_UPDATED, updated);

    return updated.formatDocument(['id', 'admins']);
  }

  @Catch('An error occured while updating team members.', 400)
  public async editMembers (teamId, userIDs) : Promise<object> {
    let updated : ITeamModel = await this.teamRepository.updateMembers(teamId, userIDs);

    await publish(TEAM_UPDATED, updated);

    return updated.formatDocument(['id', 'members']);
  }

  @Catch('An error occured while deleting team.', 400)
  public async remove (teamId, userId) : Promise<object> {
    let deleted : ITeamModel = await this.teamRepository.delete(teamId, userId);

    await publish(TEAM_DELETED, deleted);

    return deleted.formatDocument(['id', 'name', 'deletedAt']);
  }

}