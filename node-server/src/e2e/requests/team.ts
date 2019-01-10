import { client } from '../utils/client';

export function createTeam (token : string, data : { name : string, description : string }) : Promise<any> {
  return client().post('/teams', data);
}

export function fetchTeams (token : string) : Promise<any> {
  return client().get('/teams');
}

export function fetchTeam (token : string, teamId) : Promise<any> {
  return client().get(`/teams/${teamId}`);
}