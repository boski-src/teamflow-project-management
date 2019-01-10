import { Catch } from 'express-server-decorators';

import { ProjectRepository, TaskRepository } from '../../../../../base';
import {
  ITaskNote,
  ITaskRepositoryCreateData,
  ITaskSchema
} from '../../../../../common';

import { publish } from '../../../../../graphql/pubsub';
import {
  TASK_CREATED,
  TASK_DELETED,
  TASK_NOTE_CREATED, TASK_NOTE_DELETED,
  TASK_UPDATED
} from '../../../../../graphql/constants';

export class ProjectTaskService {

  private projectRepository : ProjectRepository;
  private taskRepository : TaskRepository;

  constructor () {
    this.projectRepository = new ProjectRepository();
    this.taskRepository = new TaskRepository();
  }

  @Catch('An error occured while creating new task.')
  public async insert (userId, projectId, data : ITaskRepositoryCreateData) : Promise<object> {
    let create : ITaskRepositoryCreateData = {
      _project: projectId,
      name: data.name,
      description: data.description,
      author: userId,
      state: data.state,
      priority: data.priority,
      due: data.due
    };

    let task = await this.taskRepository.create(create);
    await this.projectRepository.updateTasks(projectId, task.id);

    await publish(TASK_CREATED, task);

    return task.formatDocument();
  }

  @Catch('An error occured while creating new task\'s note.')
  public async insertNote (userId, projectId, taskId, body) : Promise<ITaskNote> {
    let task = await this.taskRepository.createNote(taskId, {
      invoker: userId,
      body
    });
    let note = task.notes[task.notes.length - 1];

    await publish(TASK_NOTE_CREATED, {
      _task: task.id,
      _id: note._id,
      invoker: note.invoker,
      body: note.body,
      date: note.date
    });

    return note;
  }

  @Catch('An error occured while receiving task data.')
  public async getOne (taskId) : Promise<ITaskSchema> {
    let select = {
      _project: 1,
      id: 1,
      name: 1,
      description: 1,
      author: 1,
      state: 1,
      priority: 1,
      due: 1,
      updatedAt: 1,
      createdAt: 1
    };
    let refs = [
      {
        path: 'author',
        select: { firstName: 1, lastName: 1, email: 1, online: 1 }
      }
    ];

    return await this.taskRepository.findById(taskId, select, refs);
  }

  @Catch('An error occured while receiving task\'s notes data.')
  public async getNotesBelongTask (taskId) : Promise<ITaskNote[]> {
    let select = { notes: 1 };
    let refs = [
      {
        path: 'notes.invoker',
        select: { firstName: 1, lastName: 1, email: 1, online: 1 }
      }
    ];

    let task = await this.taskRepository.findById(taskId, select, refs);

    return task.notes;
  }

  @Catch('An error occured while downloading list of project\'s tasks.')
  public async getBelongProject (projectId) : Promise<ITaskSchema[]> {
    let select = {
      _project: 1,
      id: 1,
      name: 1,
      description: 1,
      author: 1,
      state: 1,
      priority: 1,
      due: 1,
      updatedAt: 1,
      createdAt: 1
    };
    let refs = [
      {
        path: 'author',
        select: { firstName: 1, lastName: 1, email: 1, online: 1 }
      }
    ];

    return await this.taskRepository.findBelongProject(projectId, select, {}, refs);
  }

  @Catch('An error occured while updating task.')
  public async edit (userId, projectId, taskId, data) : Promise<object> {
    let updated = await this.taskRepository.update(taskId, {
      name: data.name,
      description: data.description,
      state: data.state,
      priority: data.priority,
      due: data.due,
      $push: {
        notes: {
          invoker: userId,
          body: 'Updated task.'
        }
      }
    });

    await publish(TASK_UPDATED, updated);

    return updated.formatDocument(['id', 'name', 'description', 'state', 'priority']);
  }

  @Catch('An error occured while deleting project\'s task.')
  public async remove (taskId, userId) : Promise<object> {
    let deleted = await this.taskRepository.delete(taskId, userId);

    await publish(TASK_DELETED, deleted);

    return deleted.formatDocument(['id', 'name', 'deletedAt']);
  }

  @Catch('An error occured while deleting task\'s note.')
  public async removeNote (projectId, taskId, noteId) : Promise<boolean> {
    let deleted = await this.taskRepository.deleteNote(taskId, noteId);

    await publish(TASK_NOTE_DELETED, { _task: deleted.id, note: noteId });

    return !deleted.notes.find(item => item.id == noteId);
  }

}