import { existsSync, readFileSync } from 'fs';

export class StorageService {

  public async getAvatar (userId) : Promise<Buffer> {
    let path = (name) => `${__dirname}/../../../../storage/avatars/${name}`;
    let fileName = path(`${userId}.png`);

    return existsSync(fileName) ? readFileSync(fileName) : readFileSync(path('default.png'));
  }

}