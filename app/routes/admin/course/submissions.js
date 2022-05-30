import { inject as service } from '@ember/service';
import ApplicationRoute from 'codecrafters-frontend/lib/application-route';

export default class AdminCourseSubmissionsRoute extends ApplicationRoute {
  @service currentUser;
  @service store;

  async model(params) {
    let courses = await this.store.findAll('course', { include: 'stages.solutions.language,supported-languages' });
    let course = courses.findBy('slug', this.paramsFor('admin.course').course_slug);

    let filters = { course_id: course.id };

    if (params.usernames.length > 0) {
      filters.usernames = params.usernames.split(',');
    }

    if (params.languages.length > 0) {
      filters.language_slugs = params.languages.split(',');
    }

    let submissions = await this.store.query('submission', {
      ...filters,
      ...{ include: 'evaluations,repository.language,repository.user,course-stage' },
    });

    return {
      course: course,
      languages: await this.store.findAll('language'),
      filteredLanguageSlugs: filters.language_slugs || [],
      submissions: submissions,
    };
  }
}
