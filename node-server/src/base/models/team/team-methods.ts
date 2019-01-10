import { pick } from 'lodash';
import { Types } from 'mongoose';
import { ITeamMethods, ITeamModel, ITeamStaticMethods } from '../../../common/interfaces';

export const TeamMethods : ITeamMethods = {
  isMember (userId : Types.ObjectId) : boolean {
    return !!this.members.find(member => member == userId);
  },
  isAdmin (userId : Types.ObjectId) : boolean {
    return !!this.admins.find(admin => admin == userId);
  },
  hasAccess (userId : Types.ObjectId) : boolean {
    return this.isAdmin(userId) || this.isMember(userId);
  },
  formatDocument (props? : string[]) : object {
    let custom = ['id', 'name', 'description', 'leader', 'createdAt', 'updatedAt'];
    return pick(this, props ? props : custom);
  }
};

export const TeamStaticMethods : ITeamStaticMethods = {
  async findByIdAndCheckAdmin (id : Types.ObjectId, userId : Types.ObjectId) : Promise<ITeamModel> {
    try {
      let team = await this.findById(id);
      if (!team.isAdmin(userId)) throw new Error('Unauthorized, only admin accessibility.');
      return team;
    }
    catch (e) {
      throw new Error('Team property is invalid.');
    }
  },
  async findByIdAndCheckAccess (id : Types.ObjectId, userId : Types.ObjectId) : Promise<ITeamModel> {
    try {
      let team = await this.findById(id);
      if (!team.hasAccess(userId)) throw new Error('Unauthorized, no accessibility.');
      return team;
    }
    catch (e) {
      throw new Error('Team property is invalid.');
    }
  }
};