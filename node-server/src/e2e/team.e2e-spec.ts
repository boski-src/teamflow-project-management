import 'mocha';
import { expect } from 'chai';

import { account, team } from './utils/data';
import { createTeam, fetchTeam, fetchTeams, loginLocalAccount } from './requests';

describe('REST /team', () => {
  let token : string = '';

  before(async () => token = await loginLocalAccount(account.email, account.password));

  it('[POST] /teams - Create team', async () => {
    const response = await createTeam(token, team);
    let { data } = response.data;
    expect(response).to.have.property('status', 200);
    expect(data).to.be.a('object');
    expect(data.id).to.be.a('string');
    expect(data.name).to.be.a('string');
    expect(data.description).to.be.a('string');
    expect(data.createdAt).to.be.a('string');
    expect(data.updatedAt).to.be.a('string');
  });
  it('[GET] /teams - Teams list', async () => {
    const response = await fetchTeams(token);
    let { data } = response.data;
    expect(response).to.have.property('status', 200);
    expect(data).to.be.a('array');
    expect(data[0].id).to.be.a('string');
    expect(data[0].name).to.be.a('string');
    expect(data[0].description).to.be.a('string');
    expect(data[0].createdAt).to.be.a('string');
    expect(data[0].updatedAt).to.be.a('string');
    return data[0].id;
  });
  it('[GET] /teams/:id - Team Details', async (teamId) => {
    const response = await fetchTeam(token, teamId);
    let { data } = response.data;
    expect(response).to.have.property('status', 200);
    expect(data).to.be.a('object');
    expect(data.id).to.be.a('string');
    expect(data.name).to.be.a('string');
    expect(data.description).to.be.a('string');
    expect(data.leader).to.be.a('object');
    expect(data.createdAt).to.be.a('string');
    expect(data.updatedAt).to.be.a('string');
    return data.id;
  });
});