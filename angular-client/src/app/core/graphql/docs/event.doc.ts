import gql from 'graphql-tag';
import { EVENT_CREATED, EVENT_DELETED, EVENT_NOTE_CREATED, EVENT_UPDATED } from '../constants';

export const EVENT_CREATED_SUBSCRIPTION = gql`
  subscription onEventCreated($teamId: ID!, $projectId: ID!) {
    ${EVENT_CREATED} (teamId: $teamId, projectId: $projectId) {
      id
      name
      description
      author {
        id
        firstName
        email
        lastName
        online
      }
      colors {
        primary
        secondary
      }
      start
      end
      updatedAt
      createdAt
    }
  }
`;

export const EVENT_UPDATED_SUBSCRIPTION = gql`
  subscription onEventUpdated($teamId: ID!, $projectId: ID!) {
    ${EVENT_UPDATED} (teamId: $teamId, projectId: $projectId) {
      id
      name
      description
      author {
        id
        firstName
        lastName
        online
      }
      colors {
        primary
        secondary
      }
      start
      end
      updatedAt
      createdAt
    }
  }
`;

export const EVENT_NOTE_CREATED_SUBSCRIPTION = gql`
  subscription onChatNoteCreated($teamId: ID!, $projectId: ID!, $eventId: ID!) {
    ${EVENT_NOTE_CREATED} (teamId: $teamId, projectId: $projectId, eventId: $eventId) {
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

export const EVENT_DELETED_SUBSCRIPTION = gql`
  subscription onEventDeleted($teamId: ID!, $projectId: ID!) {
    ${EVENT_DELETED} (teamId: $teamId, projectId: $projectId) {
      id
      name
      start
      end
      deletedAt
    }
  }
`;