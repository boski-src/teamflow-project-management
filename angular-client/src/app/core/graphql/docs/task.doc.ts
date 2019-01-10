import gql from 'graphql-tag';
import { TASK_CREATED, TASK_DELETED, TASK_NOTE_CREATED, TASK_UPDATED } from '../constants';

export const TASK_CREATED_SUBSCRIPTION = gql`
  subscription onTaskCreated($teamId: ID!, $projectId: ID!) {
    ${TASK_CREATED} (teamId: $teamId, projectId: $projectId) {
      id
      name
      description
      author {
        id
        firstName
        lastName
        online
      }
      priority
      state
      due
      updatedAt
      createdAt
    }
  }
`;

export const TASK_NOTE_CREATED_SUBSCRIPTION = gql`
  subscription onTaskNoteCreated($teamId: ID!, $projectId: ID!, $taskId: ID!) {
    ${TASK_NOTE_CREATED} (teamId: $teamId, projectId: $projectId, taskId: $taskId) {
      id
      invoker {
        id
        firstName
        lastName
        email
        online
      }
      body
      date
    }
  }
`;

export const TASK_UPDATED_SUBSCRIPTION = gql`
  subscription onTaskUpdated($teamId: ID!, $projectId: ID!) {
    ${TASK_UPDATED} (teamId: $teamId, projectId: $projectId) {
      id
      name
      description
      author {
        id
        firstName
        lastName
        email
        online
      }
      priority
      state
      due
      updatedAt
      createdAt
    }
  }
`;

export const TASK_DELETED_SUBSCRIPTION = gql`
  subscription onTaskDeleted($teamId: ID!, $projectId: ID!) {
    ${TASK_DELETED} (teamId: $teamId, projectId: $projectId) {
      id
      name
      deletedAt
    }
  }
`;