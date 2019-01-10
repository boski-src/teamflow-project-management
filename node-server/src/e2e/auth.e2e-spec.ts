import 'mocha';
import { expect } from 'chai';

import { account } from './utils/data';
import { createLocalAccount, loginLocalAccount } from './requests';

describe('REST /auth', () => {
  it('[POST] /local/create - Create local account', async () => {
    let res = await createLocalAccount(account);
    let { data } = res.data;
    expect(res).to.have.property('status', 200);
    expect(data.token).to.be.a('string');
    expect(data.user).to.be.a('object');
  });
  it('[POST] /local - Login local account', async () => {
    let response = await loginLocalAccount(account.email, account.password);
    expect(response).to.have.property('status', 200);
    expect(response.data.data).to.be.a('string');
  });
});