import Model, { attr, belongsTo, hasMany } from '@ember-data/model';
import { action } from '@ember/object';
import type CourseStageModel from './course-stage';
import type UserModel from './user';
import type LanguageModel from './language';
import type CourseStageCommentModel from './course-stage-comment';

export default class CommunityCourseStageSolutionModel extends Model {
  @belongsTo('course-stage', { async: false, inverse: 'communitySolutions' }) declare courseStage: CourseStageModel;
  @belongsTo('language', { async: false, inverse: null }) declare language: LanguageModel;
  @belongsTo('user', { async: false, inverse: null }) declare user: UserModel;

  @hasMany('community-course-stage-solution-comment', { async: false, inverse: 'target' }) declare comments: CourseStageCommentModel[];

  // @ts-expect-error empty '' not supported
  @attr('') changedFiles: { diff: string; filename: string }[]; // free-form JSON

  @attr('string') declare explanationMarkdown: string;
  @attr('string') declare commitSha: string;
  @attr('string') declare githubRepositoryName: string;
  @attr('boolean') declare githubRepositoryIsPrivate: boolean;
  @attr('number') declare ratingEstimate: number | null;
  @attr('number') declare ratingMean: number | null;
  @attr('number') declare ratingStandardDeviation: number | null;
  @attr('date') declare submittedAt: Date;
  @attr('boolean') declare isRestrictedToTeam: boolean; // if true, only fellow team members can see this solution

  get hasExplanation() {
    return !!this.explanationMarkdown;
  }

  get isPublishedToGithub() {
    return this.githubRepositoryName;
  }

  get isPublishedToPublicGithubRepository() {
    return this.isPublishedToGithub && !this.githubRepositoryIsPrivate;
  }

  @action
  githubUrlForFile(filename: string) {
    return `https://github.com/${this.githubRepositoryName}/blob/${this.commitSha}/${filename}`;
  }
}
