import { inject as service } from '@ember/service';
import BaseRoute from 'codecrafters-frontend/lib/base-route';

export default class IndexRoute extends BaseRoute {
  @service router;

  beforeModel() {
    this.router.transitionTo('catalog');
  }
}
