import { attr, hasMany } from '@ember-data/model';
import Model from '@ember-data/model';

export default class TeamModel extends Model {
  @attr('string') inviteCode;
  @hasMany('team-membership', { async: false }) memberships;
  @attr('string') name;
  @hasMany('team-pilot', { async: false }) pilots;
  @attr('string') slackAppInstallationUrl;
  @hasMany('slack-integration', { async: false }) slackIntegrations;
  @hasMany('team-subscription', { async: false }) subscriptions;

  get activePilot() {
    return this.pilots.findBy('isActive');
  }

  get activeSubscription() {
    return this.subscriptions.findBy('isActive');
  }

  get admins() {
    return this.memberships.filterBy('isAdmin', true).mapBy('user');
  }

  get hasActivePilot() {
    return !!this.activePilot;
  }

  get hasActiveSubscription() {
    return !!this.activeSubscription;
  }

  get hasSlackIntegration() {
    return !!this.slackIntegration;
  }

  get inviteUrl() {
    return `${window.location.origin}/join_team?invite_code=${this.inviteCode}`;
  }

  get members() {
    return this.memberships.mapBy('user');
  }

  get slackIntegration() {
    return this.slackIntegrations.firstObject;
  }
}
