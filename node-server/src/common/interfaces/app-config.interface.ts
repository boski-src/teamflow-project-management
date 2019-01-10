import { IConnectConfig } from '../../base/libs/mongo';

export interface IAppConfig {
  app? : any;
  db? : { mongo : IConnectConfig };
  env? : any;
}