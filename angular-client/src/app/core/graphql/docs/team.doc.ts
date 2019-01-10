import gql from 'graphql-tag';
import { TEAM_DELETED, TEAM_UPDATED } from '../constants';

export const TEAM_UPDATED_SUBSCRIPTION = gql`
  subscription onTeamUpdated($teamId: ID!) {
    ${TEAM_UPDATED} (teamId: $teamId) {
      id
      name
      description
    }
  }
`;

export const TEAM_USERS_UPDATED_SUBSCRIPTION = gql`
  subscription onTeamUsersUpdated($teamId: ID!) {
    ${TEAM_UPDATED} (teamId: $teamId) {
      id
      admins {
        id
        firstName
        lastName
        email
        online
      }
      members {
        id
        firstName
        lastName
        email
        online
      }
    }
  }
`;

export const TEAM_DELETED_SUBSCRIPTION = gql`
  subscription onTeamDeleted($teamId: ID!) {
    ${TEAM_DELETED} (teamId: $teamId) {
      id
      name
      deletedAt
    }
  }
`;