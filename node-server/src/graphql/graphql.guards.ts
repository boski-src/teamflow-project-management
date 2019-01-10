import { teamRepository } from '../base';

export class GraphqlGuards {

  public isAuth (root, args, ctx) : void {
    if (!ctx.account) throw 'Unauthenticated.';
  }

  public async isTeamAdmin (root, args, ctx) : Promise<void> {
    let team;

    try {
      team = await teamRepository.findById(args.teamId);
    }
    catch (e) {
      throw 'Team ID parameter is invalid.';
    }

    if (!team) throw 'Team not found in any document.';
    if (!team.isAdmin(ctx.account.id)) throw 'Unauthorized.';
  }

  public async isTeamMember (root, args, ctx) : Promise<void> {
    let team;

    try {
      team = await teamRepository.findById(args.teamId);
    }
    catch (e) {
      throw 'Team ID parameter is invalid.';
    }

    if (!team) throw 'Team not found in any document.';
    if (!team.isMember(ctx.account.id)) throw 'Unauthorized.';
  }

  public async hasTeamAccess (root, args, ctx) : Promise<void> {
    let team;

    try {
      team = await teamRepository.findById(args.teamId);
    }
    catch (e) {
      throw 'Team ID parameter is invalid.';
    }

    if (!team) throw 'Team not found in any document.';
    if (!team.hasAccess(ctx.account.id)) throw 'Unauthorized.';
  }

}

export const graphqlGuards = new GraphqlGuards();

export const {
  isAuth,
  isTeamMember,
  isTeamAdmin,
  hasTeamAccess
} = graphqlGuards;