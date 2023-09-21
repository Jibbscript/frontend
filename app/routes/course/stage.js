import BaseRoute from 'codecrafters-frontend/lib/base-route';
import { inject as service } from '@ember/service';

export default class CourseStageRoute extends BaseRoute {
  @service router;

  async model(params) {
    const courseRouteModel = this.modelFor('course');

    const courseStage = courseRouteModel.course.stages.find((courseStage) => courseStage.identifierForURL === params.stage_identifier);

    return {
      courseStage: courseStage,
      ...courseRouteModel,
    };
  }

  afterModel(model) {
    if (!model.courseStage) {
      // TODO: Figure out why this doesn't actually render the index route?
      // this.router.transitionTo('course.index');

      this.router.transitionTo('catalog');
    }
  }
}
