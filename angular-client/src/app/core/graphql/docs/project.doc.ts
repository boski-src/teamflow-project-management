import gql from 'graphql-tag';
import { PROJECT_CREATED, PROJECT_DELETED, PROJECT_UPDATED } from '../constants';

export const PROJECT_CREATED_SUBSCRIPTION = gql`
  subscription onProjectCreated($teamId: ID!) {
    ${PROJECT_CREATED} (teamId: $teamId) {
      id
      name
      description
      deadline
      finished
      updatedAt
      createdAt
    }
  }
`;

export const PROJECT_UPDATED_SUBSCRIPTION = gql`
  subscription onProjectUpdated($teamId: ID!, $projectId: ID!) {
    ${PROJECT_UPDATED} (teamId: $teamId, projectId: $projectId) {
      id
      name
      description
      deadline
      finished
      updatedAt
    }
  }
`;

export const PROJECT_DELETED_SUBSCRIPTION = gql`
  subscription onProjectDeleted($teamId: ID!) {
    ${PROJECT_DELETED} (teamId: $teamId) {
      id
      name
      deletedAt
    }
  }
`;