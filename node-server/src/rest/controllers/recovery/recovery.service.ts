import { Catch } from 'express-server-decorators';
import { mailerSend, UserRepository } from '../../../base';

export class RecoveryService {

  private userRepository : UserRepository;

  constructor () {
    this.userRepository = new UserRepository();
  }

  @Catch('An error occured while sending recovery link to account email.', 400)
  public async sendEmail (userEmail : string) : Promise<boolean> {
    let user = await this.userRepository.findByEmail(userEmail, { firstName: 1, recovery: 1 });
    let data = { userId: user.id, firstName: user.firstName, token: user.recovery };
    return !!await mailerSend('recovery-account', userEmail, data);
  }

  @Catch('Token is invalid.', 400)
  public async validateToken (userId, token) : Promise<string> {
    let user = await this.userRepository.findByIdAndCheckRecovery(userId, token);
    return user.email;
  }

  @Catch('Token or password is invalid.', 400)
  public async updatePassword (userId, token, newPassword) : Promise<boolean> {
    await this.validateToken(userId, token);
    let updated = await this.userRepository.updatePassword(userId, newPassword);
    return !!updated;
  }

}