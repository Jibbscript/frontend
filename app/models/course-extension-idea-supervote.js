import Model from '@ember-data/model';
import { attr, belongsTo } from '@ember-data/model';

export default class CourseExtensionIdeaSupervoteModel extends Model {
  @attr('date') createdAt;

  @belongsTo('course-extension-idea', { async: false }) courseExtensionIdea;
  @belongsTo('user', { async: false }) user;
}
