import AuthenticatorService from 'codecrafters-frontend/services/authenticator';
import BaseRoute from 'codecrafters-frontend/lib/base-route';
import PerkModel from 'codecrafters-frontend/models/perk';
import RouterService from '@ember/routing/router-service';
import window from 'ember-window-mock';
import { inject as service } from '@ember/service';

export default class PerksClaimRoute extends BaseRoute {
  @service declare authenticator: AuthenticatorService;
  @service declare router: RouterService;

  async model() {
    const perk = this.modelFor('perk') as PerkModel;

    return await perk.claim({}) as unknown as { claim_url: string };
  }

  async afterModel(urlResponse: { claim_url: string }) {
    if (urlResponse.claim_url && (this.authenticator.currentUser.canAccessPaidContent || this.authenticator.currentUser.isStaff)) {
      window.location.href = urlResponse.claim_url;
    } else {
      this.router.transitionTo('pay');
    }
  }
}
