import { inject as service } from '@ember/service';
import ApplicationRoute from 'codecrafters-frontend/lib/application-route';

export default class TracksRoute extends ApplicationRoute {
  @service router;

  beforeModel() {
    this.router.transitionTo('catalog');
  }
}
