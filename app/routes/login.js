import ApplicationRoute from 'codecrafters-frontend/lib/application-route';
import { inject as service } from '@ember/service';

export default class LoginRoute extends ApplicationRoute {
  @service authenticator;

  beforeModel(transition) {
    if (transition.to.queryParams.next) {
      this.authenticator.initiateLogin(transition.to.queryParams.next);
    } else {
      this.authenticator.initiateLogin();
    }
  }

  // Show loading screen as we redirect the user
  async model() {
    await new Promise((resolve) => setTimeout(resolve, 10_000));

    return {};
  }
}
