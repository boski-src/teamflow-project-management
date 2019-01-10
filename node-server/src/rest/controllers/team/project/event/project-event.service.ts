import { Catch } from 'express-server-decorators';

import { EventRepository, ProjectRepository } from '../../../../../base';
import {
  IEventModel, IEventNote,
  IEventRepositoryCreateData,
  IEventSchema
} from '../../../../../common';

import { publish } from '../../../../../graphql/pubsub';
import {
  EVENT_CREATED,
  EVENT_DELETED,
  EVENT_UPDATED,
  EVENT_NOTE_CREATED, EVENT_NOTE_DELETED
} from '../../../../../graphql/constants';

export class ProjectEventService {

  private projectRepository : ProjectRepository;
  private eventRepository : EventRepository;

  constructor () {
    this.projectRepository = new ProjectRepository();
    this.eventRepository = new EventRepository();
  }

  @Catch('An error occured while creating new event.')
  public async insert (userId, projectId, data : IEventRepositoryCreateData) : Promise<object> {
    let create : IEventRepositoryCreateData = {
      _project: projectId,
      name: data.name,
      description: data.description,
      colors: data.colors,
      author: userId,
      start: data.start,
      end: data.end
    };

    let event : IEventModel = await this.eventRepository.create(create);
    await this.projectRepository.updateEvents(projectId, event.id);

    await publish(EVENT_CREATED, event);

    return event.formatDocument();
  }

  @Catch('An error occured while creating new event\'s note.')
  public async insertNote (userId, projectId, eventId, body) : Promise<IEventNote> {
    let event : IEventModel = await this.eventRepository.createNote(eventId, {
      invoker: userId,
      body
    });
    let note = event.notes[event.notes.length - 1];

    await publish(EVENT_NOTE_CREATED, {
      _event: event.id,
      _id: note._id,
      invoker: note.invoker,
      body: note.body,
      date: note.date
    });

    return note;
  }

  @Catch('An error occured while receiving event data.')
  public async getOne (eventId) : Promise<IEventSchema> {
    let select = {
      _project: 1,
      id: 1,
      name: 1,
      description: 1,
      author: 1,
      start: 1,
      colors: 1,
      end: 1,
      updatedAt: 1,
      createdAt: 1
    };
    let refs = [
      {
        path: 'author',
        select: { firstName: 1, lastName: 1, email: 1, online: 1 }
      }
    ];

    return await this.eventRepository.findById(eventId, select, refs);
  }

  @Catch('An error occured while receiving event\'s notes data.')
  public async getNotesBelongEvent (eventId) : Promise<IEventNote[]> {
    let select = { notes: 1 };
    let refs = [
      {
        path: 'notes.invoker',
        select: { firstName: 1, lastName: 1, email: 1, online: 1 }
      }
    ];

    let task = await this.eventRepository.findById(eventId, select, refs);

    return task.notes;
  }

  @Catch('An error occured while receiving list of project\'s events.')
  public async getBelongProject (projectId) : Promise<IEventSchema[]> {
    let select = {
      _project: 1,
      id: 1,
      name: 1,
      description: 1,
      author: 1,
      start: 1,
      end: 1,
      updatedAt: 1,
      createdAt: 1
    };
    let refs = [
      {
        path: 'author',
        select: { firstName: 1, lastName: 1, email: 1, online: 1 }
      }
    ];

    return await this.eventRepository.findBelongProject(projectId, select, {}, refs);
  }

  @Catch('An error occured while updating event.')
  public async edit (userId, projectId, eventId, data) : Promise<object> {
    let updated : IEventModel = await this.eventRepository.update(eventId, {
      name: data.name,
      description: data.description,
      colors: data.colors,
      start: data.start,
      end: data.end,
      $push: {
        notes: {
          invoker: userId,
          body: 'Updated event.'
        }
      }
    });

    await publish(EVENT_UPDATED, updated);

    return updated.formatDocument(['id', 'name', 'description', 'colors', 'start', 'end']);
  }

  @Catch('An error occured while deleting project\'s event.')
  public async remove (eventId, userId) : Promise<object> {
    let deleted : IEventModel = await this.eventRepository.delete(eventId, userId);

    await publish(EVENT_DELETED, deleted);

    return deleted.formatDocument(['id', 'name', 'deletedAt']);
  }

  @Catch('An error occured while deleting event\'s note.')
  public async removeNote (projectId, eventId, noteId) : Promise<boolean> {
    let deleted : IEventModel = await this.eventRepository.deleteNote(eventId, noteId);

    await publish(EVENT_NOTE_DELETED, { _event: eventId, note: noteId });

    return !deleted.notes.find(item => item.id == noteId);
  }

}