import ConceptModel from 'codecrafters-frontend/models/concept';
import Controller from '@ember/controller';
import RouterService from '@ember/routing/router-service';
import Store from '@ember-data/store';
import { service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import config from 'codecrafters-frontend/config/environment';
import type UserModel from 'codecrafters-frontend/models/user';
import type AuthenticatorService from 'codecrafters-frontend/services/authenticator';

export default class BasicDetailsController extends Controller {
  @service declare store: Store;
  @service declare router: RouterService;
  @service declare authenticator: AuthenticatorService;
  @tracked wasSavedRecently: boolean = false;
  @tracked deleteConceptModalIsOpen: boolean = false;

  declare model: {
    concept: ConceptModel;
  };

  get currentUser(): UserModel {
    return this.authenticator.currentUser as UserModel;
  }

  @action
  async handleDeleteConceptActionClick() {
    if (this.model.concept.author !== this.currentUser && !this.currentUser.isStaff) {
      return;
    }

    this.deleteConceptModalIsOpen = true;
  }

  @action
  handleValueUpdated() {
    this.updateConceptDetails.perform();
  }

  updateConceptDetails = task({ keepLatest: true }, async (): Promise<void> => {
    try {
      await this.model.concept.save();
    } catch (e) {
      console.error(e);

      return;
    }

    if (
      this.router.currentRouteName === 'concept-admin.basic-details' &&
      this.router.currentRoute.params['concept_slug'] !== this.model.concept.slug
    ) {
      await this.router.replaceWith('concept-admin.basic-details', this.model.concept.slug);
    }

    this.flashSavedMessage.perform();
  });

  flashSavedMessage = task({ keepLatest: true }, async (): Promise<void> => {
    this.wasSavedRecently = true;
    await timeout(config.environment === 'test' ? 0 : 1000);
    this.wasSavedRecently = false;
  });
}
