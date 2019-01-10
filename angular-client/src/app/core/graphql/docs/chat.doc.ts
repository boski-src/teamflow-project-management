import gql from 'graphql-tag';
import { CHAT_CREATED, CHAT_DELETED, CHAT_MESSAGE_CREATED, CHAT_UPDATED } from '../constants';

export const CHAT_CREATED_SUBSCRIPTION = gql`
  subscription onProjectCreated($teamId: ID!) {
    ${CHAT_CREATED} (teamId: $teamId) {
      id
      name
      description
      updatedAt
      createdAt
    }
  }
  
`;
export const CHAT_MESSAGE_CREATED_SUBSCRIPTION = gql`
  subscription onChatMessageCreated($teamId: ID!, $chatId: ID!) {
    ${CHAT_MESSAGE_CREATED} (teamId: $teamId, chatId: $chatId) {
      id
      invoker {
        id
        firstName
        lastName
        email
        online
      }
      body
      createdAt
    }
  }
`;

export const CHAT_UPDATED_SUBSCRIPTION = gql`
  subscription onProjectUpdated($teamId: ID!, $chatId: ID!) {
    ${CHAT_UPDATED} (teamId: $teamId, chatId: $chatId) {
      id
      name
      description
      updatedAt
    }
  }
`;

export const CHAT_DELETED_SUBSCRIPTION = gql`
  subscription onChatDeleted($teamId: ID!) {
    ${CHAT_DELETED} (teamId: $teamId) {
      id
      name
      deletedAt
    }
  }
`;